let listOfText = document.querySelector('#text-list')
let newTextInput = document.querySelector('#new-text')
let submitTextButton = document.querySelector('#submit-text')
let numberOfListItems = 0
let maxItemsInList = 10
let maxTextLength = 50

submitTextButton.addEventListener('click', function(){
    if (numberOfListItems >= maxItemsInList){
        alert('Your list is full!')
        return
    }
    
    let text = newTextInput.value
    if (text.length == 0){
        return
    }
    if (text.length > maxTextLength){
        alert('Please limit your submissions to less than 50 characters.')
        return
    }

    let newListItem = document.createElement('li')
    newListItem.innerHTML = text
    listOfText.appendChild(newListItem)
    newTextInput.value = ''
    numberOfListItems++
})

let clearListButton = document.querySelector('#clear-list')

clearListButton.addEventListener('click', function(){
    numberOfListItems = 0
    let allListItems = document.querySelectorAll('li')
    allListItems.forEach(function(listItem){
        listItem.remove()
    })
})

