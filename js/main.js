const convertForm = $("#convertform");
const ratesForm = $("#rates");

"#daterate".valueAsDate = new Date();

ratesForm.on("submit", (e) => {
  e.preventDefault();
  let optionRate = $("#ratesoptions").val();
  let dateRate = $("#daterate").val();

  fetch(`https://api.frankfurter.app/${dateRate}?from=${optionRate}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      $("tbody").html("");
      $("#tablerates").show();
      $(".contenedortabla").show();

      $.each(respuesta.rates, function (moneda) {
        $("tbody").append(
          `<tr><th>.</th><td>${moneda}</td><td>${respuesta.rates[moneda]}</td></tr>`
        );
      });
    })
    .catch((error) => console.error("Fallo!", error));
});

convertForm.on("submit", (e) => {
  e.preventDefault();
  let fromConvert = $("#fromoptions").val();
  let toConvert = $("#tooptions").val();
  let amountConvert = $("#amount").val();

  if (fromConvert === toConvert) {
    $("#convertresult").text("1");
  } else {
    fetch(
      `https://api.frankfurter.app/latest?amount=${amountConvert}&from=${fromConvert}&to=${toConvert}`
    )
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        $("#convertresult").text(
          `${amountConvert} ${fromConvert} = ${respuesta.rates[toConvert]} ${toConvert}`
        );
      })
      .catch((error) => console.error("Fallo!", error));
  }
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
