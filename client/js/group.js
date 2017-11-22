//GLOBAL VARIABLES
var listName;
var listContainer = document.getElementById('listContainer');
var sidemenu_public = document.getElementById('public');
var sidemenu_private = document.getElementById('private');
var priv;


//CHECK IF THERE IS ANY VALUE FUNCTIONS

function addList() {
    listName = document.getElementById('listName').value;

    if(listName == ""){
        alert("There was no value");
    }else{
        createList(listName);
    }
}

function addTask(value) {

    if(value == ""){
        alert("There was no value");
    }else{
        createTask(value);
    }
}


//CREATING FUNCTIONS

function createTask(value) {

    var taskContainer = document.getElementById(listName);

    //TASKCONTAINER
    var task = document.createElement('li');
    var task_container = document.createElement('div');
    var task_toggle = document.createElement('input');
    var task_name = document.createElement('h1');
    var task_date = document.createElement('input');
    var task_select = document.createElement('select');

    //OPTIONS
    var option_1 = document.createElement('option');
    option_1.innerHTML = "high";
    var option_2 = document.createElement('option');
    option_2.innerHTML = "medium";
    var option_3 = document.createElement('option');
    option_3.innerHTML = "low";

    //ADDING ATTRIBUTES
    task_toggle.type = "checkbox";
    task_toggle.classList = 'neutral';

    task_date.type = "date";
    task_name.innerHTML = value;
    task_select.options

    //APPENDING CHILDS

            //task SELECT
    task_select.appendChild(option_1);
    task_select.appendChild(option_2);
    task_select.appendChild(option_3);

    task_container.appendChild(task_name);
    task_container.appendChild(task_toggle);
    task_container.appendChild(task_date);
    task_container.appendChild(task_select);
    task.appendChild(task_container);


    taskContainer.insertBefore(task, taskContainer.childNodes[1]);


    //CLICK FUNCTION FOR LI; CHECKED OF UNCHECKED
    task_toggle.addEventListener('click', function(evt) {
        let item = task_toggle.parentNode.parentNode;
        item.classList.toggle('completed');
    });
}

function createList(listName) {

    priv = true;
    //removing the last list
    if(listContainer.hasChildNodes()){
        listContainer.removeChild(listContainer.childNodes[0]);
    }
    //SIDEMENU

    var sidemenu_li = document.createElement('li');
    sidemenu_li.innerHTML = listName;

    //appendingChild

    sidemenu_private.appendChild(sidemenu_li);

    //-----------------------------
    var ul = document.createElement('ul');
    ul.id = listName;

    var head = document.createElement('li');
    head.innerHTML = listName;
    head.id = listName + "head";

    //CREATING TASKBAR/HEADBAR AND ITS BUTTONS AND INPUT-FIELD--------------------------

    var head_container = document.createElement('div');

    var head_input = document.createElement('input');
    head_input.id = listName + "input";

    var head_toggle_box = document.createElement('input');
    head_toggle_box.type = "checkbox";
    head_toggle_box.checked = true;

    //CLICK FUNCTION FOR CHECKBOX
    head_toggle_box.addEventListener('click', function(evt) {

        if(head_toggle_box.checked){
            priv = true;
            sidemenu_public.removeChild(sidemenu_li);
            sidemenu_private.appendChild(sidemenu_li);
        }else{
            priv = false;
            sidemenu_private.removeChild(sidemenu_li);
            sidemenu_public.appendChild(sidemenu_li);
        }
    });



    //------------------------------

    var head_button = document.createElement('button');
    head_button.innerHTML = 'NEW TASK';
    //CLICK FUNCTION FOR ADDING TASKS
    head_button.addEventListener('click', function(){

        let value = document.getElementById(listName + "input").value;

        addTask(value);
    });

    var head_button_save = document.createElement('button');
    head_button_save.innerHTML = 'save';


    head_container.appendChild(head_input);
    head_container.appendChild(head_button);
    head_container.appendChild(head_toggle_box);
    head_container.appendChild(head_button_save);
    head.appendChild(head_container);



/*-----Appending li to ul-----*/

ul.appendChild(head);
listContainer.appendChild(ul);


/*------sending to db------*/

    head_button_save.addEventListener('click', function(evt){

        console.log('CLICKED SAVE BUTTON');

        var list = this.parentNode.parentNode.parentNode.id;
        var user_info = localStorage.getItem('logindata');
        var logindata = JSON.parse(user_info);

        var upload = JSON.stringify({
            list_name: list,
            private: priv,
            user_id: logindata.id
        });

        var cfg = {
            method: "POST",
            body: upload
        };

        var url = "http://localhost:3000/users/newlist/";

        superfetch(url, "json", succ, error, cfg);

        function succ(data) {

        };
        function error(err) {

        };

    });

}

/*
function createGroup(name, boolean){
    var priv = boolean;

    var groupContainer = document.getElementById('groupContainer');
    var groupNameTxt = document.getElementById('groupNameTxt');
    var privContainer = document.getElementById('private');
    var shareContainer = document.getElementById('shareable');

//-----*-----

    var sLiDiv = document.createElement('div');
    sLiDiv.id = name;

    var sLi = document.createElement('li');
    sLi.innerHTML = name;
    sLi.id = name;

    //----Sidemenu board onclick--retrieves the id of the board


    sLi.addEventListener('click', function(e){

        var token = localStorage()

        let boardId = e.target.id;
        var url = 'http://localhost:3000/users/getboard/?token=' + variabel + "&tull=" + boardId;

        let upload = JSON.stringify({
            board: boardId
        });

        let cfg = {
            method: "POST",
            body: upload
        }

        superfetch(url, "json", succ, error, cfg);

        function succ(data) {

        }
        function error(err) {

        }
    });

    sLi.appendChild(sLiDiv);

    if (priv == true) {
        privContainer.appendChild(sLi);
    } else {
        shareContainer.appendChild(sLi);
    }
//-----*-----
    groupNameTxt.innerHTML = name + " board";

    var ul = document.createElement('ul');
    var groupLi = document.createElement('li');
    var widgetLi = document.createElement('li');

    //buttons and input for widgetLi

    var newTask = document.createElement('li');
    var div = document.createElement('div');

    var input = document.createElement('input');
    input.id = "input";

    var button = document.createElement('button');

    button.innerHTML = "new task";
    button.id = name;

    button.onclick = function() {
        var value = document.getElementById('input').value;
        if(value){
            createTask(value, name);
        }else{
            console.log("There was NO value");
        }
    };

    div.appendChild(input);
    div.appendChild(button);
    newTask.appendChild(div);

    ul.classList.add('group');
    ul.id = name + "task";

    if(priv == false) {
        groupLi.innerHTML = name + " - Shareable";
    } else {
        groupLi.innerHTML = name + " - Private";
    }


    ul.appendChild(groupLi);
    ul.appendChild(newTask);
    groupContainer.appendChild(ul);

}

*/
