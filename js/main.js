const ratesForm = document.querySelector("#rates");
const convertForm = document.querySelector('#convertform');

document.querySelector("#daterate").valueAsDate = new Date();

ratesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let optionRate = document.querySelector("#ratesoptions").value;
  let dateRate = document.querySelector('#daterate').value;


  fetch(`https://api.frankfurter.app/${dateRate}?from=${optionRate}`)
.then(respuesta=>respuesta.json())
.then(respuesta=>{
    $('tbody').html('');
    $('#tablerates').show();
    $('.contenedortabla').show();

    Object.keys(respuesta.rates).forEach(moneda=>{
        $('tbody').append(`<tr><th>.</th><td>${moneda}</td><td>${respuesta.rates[moneda]}</td></tr>`)
    
    })
})
.catch(error=>console.error('Fallo!',error));

});

convertForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let fromConvert = document.querySelector('#fromoptions').value;
    let toConvert = document.querySelector('#tooptions').value;
    let amountConvert = document.querySelector('#amount').value;

    if(fromConvert===toConvert){
        $('#convertresult').text('1');
    }
    else{
        fetch(`https://api.frankfurter.app/latest?amount=${amountConvert}&from=${fromConvert}&to=${toConvert}`)
        .then(respuesta=>respuesta.json())
        .then(respuesta=>{
            $('#convertresult').text(`${amountConvert} ${fromConvert} = ${respuesta.rates[toConvert]} ${toConvert}`)
        })
        .catch(error=>console.error('Fallo!',error));
    }

})


//https://www.frankfurter.app/docs/


/*https://api.exchangeratesapi.io/v1/2013-12-24
    ? access_key = API_KEY
    & base = GBP
    & symbols = USD,CAD,EUR*/

//fetch(`http://api.exchangeratesapi.io/v1/2013-12-24?access_key=${accessKey}&base=${baseRate}`)
//"base_currency_access_restricted"!!!!
