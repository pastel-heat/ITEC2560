let homeownerNameInput = document.querySelector('#homeowner-name')
let homeownerHouseNumberInput = document.querySelector('#homeowner-house-number')
let homeownerStreetNameInput = document.querySelector('#homeowner-street-name')
let treeTypeSelect = document.querySelector('#tree-type')

// TODO create a variable for city input element
// TODO create a variable for zip code input element

let submitButton = document.querySelector('#submit-order')

let orderSummaryParagraph = document.querySelector('#order-summary')

submitButton.addEventListener('click', function() {

    let name = homeownerNameInput.value 
    let houseNumber = homeownerHouseNumberInput.value
    let streetName = homeownerStreetNameInput.value
    let treeType = treeTypeSelect.value

    // TODO get the value from the input#city
    // TODO get the value from the input#zipcode

    // TODO Validate that all six input and select elements have been completed
    //  - check they all have a value

    // TODO Validate the zipcode is in the range 55001 and 56763. 
    // to check that the zip code is in Minnesota.
    // Make sure your script doesn't accept non-numeric input for the zip code. 

    // Optional extra: add the class .error to any inputs with an error (and only inputs with an error)
    // to give the user visual feedback for which inputs need to be fixed or completed. 
    // There's a style for input.error and select.error defined in the styles (in the head)
    // which will be applied if you give the class .error to any elements on the page. 
    // Make sure you remove this class when the form is completed correctly.

    let errors = []
    
    // If a form element has not been completed, or if the data is not valid, 
    // add an error message to the errors array. (Hint: use push to add to the end of the array)
    // Add one error message for each problem with the form. 

    
    // TODO - If there are any errors after checking all of the input elements, 
    // display an alert with all of the error messages. (Hint: use join)
    // and then return from this function to prevent further processing 


    // TODO - If there are no errors, use a template string to display an order 
    // summary in the order summary paragraph.

    
})

