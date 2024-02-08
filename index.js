import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
 //my realtime database //
const appSettings = { 
    databaseURL: "https://realtime-database-84b83-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
// initializing and creation of shopping list data storer//

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
  
//fetching elements for implementation or assigning them//

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

//adding event listeners and creating a function to execute the event listener//

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
   clearInputFieldEl ()
})

onValue(shoppingListInDB, function(snapshot) {    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        shoppingListEl.innerHTML = ""
        
        //for loop to check if there are items in the buscket to print the key or value in the realtime database if it is empty it should return the else statement//

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        } 
    } else {
        shoppingListEl.innerHTML = "No items in list... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
//function to clear the input area after clicking add to cart//

function clearInputFieldEl() {
    inputFieldEl.value = ""
}
// function to create or add items to a list whenever the add to cart button is clicked//

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    // the new list / items are consoled here//
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    //function to remove the key and value from the database by it's exact location//
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}