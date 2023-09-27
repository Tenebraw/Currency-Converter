const URL=' http://127.0.0.1:5500/main.html';

function todayDate(){
  const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
return currentDate;
}

describe('Comprobaciones Generales.', () => {
  beforeEach(() => {
    cy.visit(URL)
  })
  it('Comprobar que la tabla resultados este oculta.',()=>{
    cy.get('#tablerates').should('not.be.visible');
  })

  it('Al comenzar ninguna opcion en Base Currency deberia estar seleccionada.',()=>{
    cy.get('#ratesoptions')
    .should('have.value', 'Open this select menu')
  })
  
  it('Al comenzar la opcion Date deberia ser la fecha actual.',()=>{
    cy.get('#daterate')
    .should('have.value', todayDate())
  }) 

  it('Al comenzar ninguna opcion en From-Convert deberia estar seleccionada.',()=>{
    cy.get('#fromoptions')
    .should('have.value', 'Open this select menu')
  })
  it('Al comenzar ninguna opcion en To-Convert deberia estar seleccionada.',()=>{
    cy.get('#tooptions')
    .should('have.value', 'Open this select menu')
  })
});

describe('Comprobacion formulario Base Currency.',()=>{
  beforeEach(() => {
    cy.visit(URL)
  })

  it('Selecciona una opcion en Base Currency y comprobar su valor.',()=>{
    cy.get('#ratesoptions').select('AUD (Australian dollar)')
    .should('have.value', 'AUD')
  })

  it('Comprobar value de todas las opciones.',()=>{
    cy.get('#ratesoptions').find('option').then(options => {
      const actual = [...options].map(o => o.value)
      actual.shift();
      expect(actual).to.deep.eq(['AUD', 'BGN', 'BRL', 'CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','USD','ZAR'])
    })
  })

  it('Enviar un formulario Rates',()=>{
    cy.get('#ratesoptions').select('AUD (Australian dollar)')
    cy.get('#rates').submit() 
  })

})

describe('Comprobacion formulario Convert.',()=>{
  beforeEach(() => {
    cy.visit(URL)
  })
it('Comprobar value de todas las opciones.',()=>{
  cy.get('#fromoptions').find('option').then(options => {
    const actual = [...options].map(o => o.value)
    actual.shift();
    expect(actual).to.deep.eq(['AUD', 'BGN', 'BRL', 'CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','USD','ZAR'])
  })

  cy.get('#tooptions').find('option').then(options => {
    const actual = [...options].map(o => o.value)
    actual.shift();
    expect(actual).to.deep.eq(['AUD', 'BGN', 'BRL', 'CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','USD','ZAR'])
  })

})

it('Enviar un formulario Convert',()=>{
  cy.get('#fromoptions').select('CAD (Canadian dollar)')
  cy.get('#tooptions').select('JPY (Japanese yen)')
  cy.get('#amount').type('3')
  cy.get('#convertform').submit() 
})
})

describe('Hacer una peticion HTTP. Enviar formularios.',()=>{
  beforeEach(() => {
    cy.visit(URL)
  })

  it('Chequear request API',()=>{
    cy.request('https://api.frankfurter.app/')
  }) 

  it('Enviar ambos formularios al mismo tiempo.',()=>{
    cy.get('#ratesoptions').select('AUD (Australian dollar)')
    cy.get('#fromoptions').select('CAD (Canadian dollar)')
    cy.get('#tooptions').select('JPY (Japanese yen)')
    cy.get('#amount').type('3')
    cy.get('#rates').submit() 
    cy.get('#convertform').submit() 
  })
})
