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

// search form
const seachForm = document.querySelector('[data-searchForm]');

const emptySearchForm = '';


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
        this.arrayOfTodosToFilter = document.cookie.split(';');
        ulTag.innerHTML = '';
        this.filterItems(this.arrayOfTodosToFilter);
    }

    // filter toDo item

    filterItems(searchTerm) {
        // arrayofToDos is the array  that has been received and is being filtered



        if (seachForm.value !== '') {


            // if the search form is not empty, that means that a search is being carried out


            document.cookie.split(';').forEach(itemPair => {

                if (itemPair.includes(searchTerm)) this.updateDisplay(itemPair);
            });

        } else {
            document.cookie.split(';').forEach(item => {

                this.updateDisplay(item);
            })
        }



    }



    // restore item
    restoreItem() {}

    // delete an existing item
    deleteItem() {}

    // mark as complete
    completeItem() {}

    // update display
    updateDisplay(todos) {
        // if the parameter passed to this method is an empty string, return
        if (todos == '') return;

        // clear the form
        toDoForm.value = '';


        // split the todos which have been received as key pair values
        // into  a key and a pair and display the key
        this.todoItems = todos.split('=');

        // this.todoItem refers to each item being displayed
        this.todoItemName = this.todoItems[0];

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


        // append li element
        ulTag.appendChild(createLiElement);







    }

}

// create an instance of a to do class
const todo = new ToDO();

// hide / display creating a new todoItem
// make the hide or show search form a constant since it would be called by the cancel button too
const hideOrShowSearchForm = function() {
    if (newTodoDropdown.style.display == 'grid') {
        newTodoDropdown.style.display = 'none';
        seachForm.style.display = 'block';
    } else {
        newTodoDropdown.style.display = 'grid';
        seachForm.style.display = 'none';
        seachForm.value = '';
    }
};

addButton.addEventListener('click', () => hideOrShowSearchForm());

// add todoItem
saveButton.addEventListener('click', () => todo.addItem());
cancelButton.addEventListener('click', () => {

    hideOrShowSearchForm();

    // clear the input form (confer todo.updateDisplay());


    todo.updateDisplay(emptySearchForm);
});

// search for a todo item
// pass the value of the search bar to the filterItems method to find matching
// instances in the list of todos( in the cookies);
seachForm.addEventListener('keyup', () => {
    // first clear the content of the ul incase it is already displaying something
    // this way, we can append li elements based on search results
    ulTag.innerHTML = '';

    if (seachForm.value == emptySearchForm)
    // clear the content of the ul tag so that li elements can be attached/appended
        ulTag.innerHTML = '';
    todo.filterItems(seachForm.value);
});


// call the todo.updateDisplay function when the document loads to display list of
// todos by default
document.onload = todo.filterItems(emptySearchForm);