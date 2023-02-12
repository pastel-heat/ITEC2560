let homeownerNameInput = document.querySelector('#homeowner-name')
let homeownerHouseNumberInput = document.querySelector('#homeowner-house-number')
let homeownerStreetNameInput = document.querySelector('#homeowner-street-name')
let cityInput = document.querySelector('#city')
let zipCodeInput = document.querySelector('#zipcode')
let treeTypeSelect = document.querySelector('#tree-type')

let submitButton = document.querySelector('#submit-order')

let orderSummaryParagraph = document.querySelector('#order-summary')

submitButton.addEventListener('click', function() {
    let name = homeownerNameInput.value 
    let houseNumber = homeownerHouseNumberInput.value
    let streetName = homeownerStreetNameInput.value
    let city = cityInput.value
    let zipCode = zipCodeInput.value
    let treeType = treeTypeSelect.value

    removeErrors()

    let errors = []
    
    if (name == ''){
        errors.push('Please input a name.')
        homeownerNameInput.classList.add('error')
    }

    if (!(houseNumber > 0)){
        errors.push('Please input a house number.')
        homeownerHouseNumberInput.classList.add('error')
    }

    if (streetName == ''){
        errors.push('Please input a street name.')
        homeownerStreetNameInput.classList.add('error')
    }

    if (city == ''){
        errors.push('Please input a city.')
        cityInput.classList.add('error')
    }

    if (!(zipCode >= 55001 && zipCode <= 56763)){
        errors.push('Please enter a valid zip code.')
        zipCodeInput.classList.add('error')
    }

    if (treeType == ''){
        errors.push('Please select a tree type.')
        treeTypeSelect.classList.add('error')
    }

    if (errors.length > 0){
        alert(errors.join('\n'))
        return
    }

    orderSummaryParagraph.innerHTML = (
        `${name}` + "<br>" + `${houseNumber} ${streetName}` + "<br>" + `${city}, MN ${zipCode}` + "<br><br>" + `1 ${treeType} Tree`
    )
})

function removeErrors(){
    errors = document.querySelectorAll('.error')
    errors.forEach(function(input){
        input.classList.remove('error')
    });
}