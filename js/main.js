const convertForm = $("#convertform");
const ratesForm = $("#rates");

"#daterate".valueAsDate = new Date();

class HistoricalRates {
  constructor(baseCurrency, date) {
    this.baseCurrency = baseCurrency;
    this.date = date;
    this.rates = {};
  }

  async fetchRates() {
    try {
      const response = await fetch(`https://api.frankfurter.app/${this.date}?from=${this.baseCurrency}`);
      const data = await response.json();
      this.rates = data.rates;
    } catch (error) {
      console.error("Failed to fetch historical rates", error);
    }
  }
}

class CurrencyConverter {
  constructor(fromCurrency, toCurrency, amount) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.amount = amount;
    this.result = null;
  }

  async convert() {
    if (this.fromCurrency === this.toCurrency) {
      this.result = `${this.amount} ${this.fromCurrency} = ${this.amount} ${this.toCurrency}`;
    } else {
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${this.amount}&from=${this.fromCurrency}&to=${this.toCurrency}`);
        const data = await response.json();
        this.result = `${this.amount} ${this.fromCurrency} = ${data.rates[this.toCurrency]} ${this.toCurrency}`;
      } catch (error) {
        console.error("Failed to convert currency", error);
      }
    }
  }
}

ratesForm.on("submit", async (e) => {
  e.preventDefault();
  const optionRate = $("#ratesoptions").val();
  const dateRate = $("#daterate").val();

  const historicalRates = new HistoricalRates(optionRate, dateRate);
  await historicalRates.fetchRates();

  $("tbody").html("");
  $("#tablerates").show();
  $(".contenedortabla").show();
  $.each(historicalRates.rates, function (moneda) {
        $("tbody").append(
          `<tr><th>.</th><td>${moneda}</td><td>${historicalRates.rates[moneda]}</td></tr>`
        );
      });
    })


convertForm.on("submit", async (e) => {
  e.preventDefault();
  const fromConvert = $("#fromoptions").val();
  const toConvert = $("#tooptions").val();
  const amountConvert = $("#amount").val();

  const currencyConverter = new CurrencyConverter(fromConvert, toConvert, amountConvert);
  await currencyConverter.convert();

  $("#convertresult").text(
          `${currencyConverter.result}`
        );
});

function isEmptyRates() {
  let optionRate = $("#ratesoptions").val();
  let selectElement = $("[name=currency]");
  let optionValues = [...selectElement[0].options].map((o) => o.value);
  optionValues.shift();


  if (!optionValues.includes(optionRate)) {
    $("#ratesoptions").css("border", "2px solid red");
    return false;
  } else {
    $("#ratesoptions").css("border", "");
    return true;
  }
}

function isEmptyConvert() {
  let fromOptions = $("#fromoptions").val();
  let toOptions = $("#tooptions").val();

  let selectFrom = $("[name=fromcurrency]");
  let selectTo = $("[name=tocurrency]");

  let fromValues = [...selectFrom[0].options].map((o) => o.value);
  fromValues.shift();
  let toValues = [...selectTo[0].options].map((o) => o.value);
  toValues.shift();

  if (!fromValues.includes(fromOptions) || !toValues.includes(toOptions)) {
    $("#fromoptions, #tooptions").css("border", "2px solid red");
    return false;
  } else {
    $("#fromoptions, #tooptions").css("border", "");
    return true;
  }
}
