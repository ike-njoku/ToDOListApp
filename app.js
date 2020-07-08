// define constants

// declear constants
const addButton = document.querySelector('[data-addItem]');
// submit new todo button
const saveButton = document.querySelector('[data-saveButton]');
// newToDoForm
const toDoForm = document.querySelector('[data-toDoForm]');

// ul list
const ulTag = document.querySelector('[data-list]');

// cancel button
const cancelButton = document.querySelector('[data-cancel]');






// hide  .newTodoDropdown  by default
const newTodoDropdown = document.querySelector('[data-newTodoDropdown]');
newTodoDropdown.style.display = 'none';

// create a todo class with all the methods
class ToDO {
    // constructor
    // each item has an id, name and value of true
    // or false for if it is completed or not
    constructor(itemName, itemCompletionStatus) {
        // extract the name/title of the list item
        this.itemName = itemName;
        this.itemCompletionStatus = itemCompletionStatus;
    }




    // ceate new item
    addItem() {
        // check if the input field is empty. if it is, return

        if (toDoForm.value.length == 0) {
            window.alert('please add a to do item');
            return;
        }

        // createcookie
        // let the name/title of the todo item be the key of the cookie and then the value would be true
        // or false if or not the item has beendone

        this.itemName = toDoForm.value;
        this.completionStatus = 'false';
        document.cookie = this.itemName + '=' + this.completionStatus;

        // call the filterItems method to generate the list of todo items to display
        // send all the todo items that have been stored
        this.filterItems(document.cookie.split(';'));
    }

    // filter toDo items
    filterItems(arrayofToDos) {
        // arrayofToDos is the array  that has been received and is being filtered
        // UpdateDisplay method to be displayed on the screen



        arrayofToDos.forEach(keyvalues => {
            // emmit the keyvalue pairs that will be used by update display
            this.updateDisplay(keyvalues);
        });



    }

    // search for Item
    searchItem() {}


    // restore item
    restoreItem() {}

    // delete an existing item
    deleteItem() {}

    // mark as complete
    completeItem() {}

    // update display
    updateDisplay(todos) {

        // clear the form
        toDoForm.value = '';

        // split the todos which have been received as key pair values
        // into  a key and a pair and display the key
        this.todoItems = todos.split('=');

        // this.todoItem refers to each item being displayed
        this.todoItemName = this.todoItems[0];
        console.log(this.todoItemName);

        // construct the display tobe rendered

        // append each todoName to the screen (for this part, refer to styles.css for styling)
        // create the li ement
        let createLiElement = document.createElement('li');
        // create the div element
        let createDivElement = document.createElement('div');
        // attach the todo item name to the div
        createDivElement.innerHTML = this.todoItemName;

        // append the div element to the li element
        createLiElement.appendChild(createDivElement);

        // attach the li element to the ul tag
        ulTag.appendChild(createLiElement);


    }




}

// create an instance of a to do class
const todo = new ToDO();

// hide / display creating a new todoItem
addButton.addEventListener('click', () => {
    if (newTodoDropdown.style.display == 'block') newTodoDropdown.style.display = 'none';
    else newTodoDropdown.style.display = 'block';
});

// add todoItem
saveButton.addEventListener('click', () => todo.addItem());
cancelButton.addEventListener('click', () => {
    newTodoDropdown.style.display = 'none';
    toDoForm.value = '';
});







// <li class="toDoItem">

//     <div>${this.cookieName}</div>
//     <span> ...
//     </span>
// </li>