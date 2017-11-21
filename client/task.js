var i = 0;

function removeTask(evt) {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;

    parent.removeChild(item);
    i--;
}

function completeTask(evt) {
    let item = this.parentNode.parentNode;
    if(this.innerHTML == "completed") {

        this.innerHTML = "Uncheck";
        item.classList.remove("neutral");
        item.classList.add("completed");
    }else{

        this.innerHTML = "completed";
        item.classList.remove("completed");
        item.classList.add("neutral");
    }

    //completed.insertBefore(item, completed.childNodes[0]);
}

function createTask(value, name) {
    let task = value;

    var ul = document.getElementById(name + "task");

    let li = document.createElement('li');
    li.innerHTML = task;
    li.draggable = true;
    li.classList.add = "listItem";

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = "remove";

    remove.addEventListener('click', removeTask);

    let complete = document.createElement('button');
    complete.classList.add('completed');
    complete.innerHTML = "completed";

    complete.addEventListener('click', completeTask);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    li.appendChild(buttons);

    //Appending childs to the corresponding parent

    ul.insertBefore(li, ul.childNodes[1 + i]);

    i++;
}
