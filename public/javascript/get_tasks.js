
function getTasks(){

    let token = JSON.parse(localStorage.getItem('logindata')).token;

    let cfg = {
        method: 'GET'
    };

    //let url = "http://localhost:3000/tasks/?list_id="+ selected_listId + '&token=' + token;
    let url = 'https://burgerapplication.herokuapp.com/tasks/?list_id='+ selected_listId + '&token=' + token;

    superfetch(url, "json", get_tasks_succ, get_tasks_error, cfg);
}

function get_tasks_succ(data) {

    var taskContainer_uncompleted = document.getElementById(listName + 'uncompleted');
    var taskContainer_completed = document.getElementById(listName + 'completed');

    for(var i = 0; i < data.length; i++) {


        //TASKCONTAINER
        let task = document.createElement('li');
        task.id = data[i].id;
        task.classList = "li_task";

        let task_container_text = document.createElement('div');
        task_container_text.classList = 'task_text'

        let task_container_widget = document.createElement('div');
        task_container_widget.classList = 'task_widget'

        let task_container_colorcode = document.createElement('div');

        let task_select = document.createElement('select');

        let task_toggle = document.createElement('input');
        let task_name = document.createElement('p');
        let task_date = document.createElement('input');
        let task_delete = document.createElement('button');
        task_delete.innerHTML = 'delete';

        task_delete.addEventListener('click', function(e) {

            remove_task(task.id, selected_listId);

            task.parentNode.removeChild(task);
        });

        task_select.addEventListener('input', function(e) {
            let parent = this.parentNode.parentNode.id
            changePriority(this.value, parent);
            if(task_select.value == "high") {
                task_container_colorcode.classList.remove('medium', 'low');
                task_container_colorcode.classList.add('high');
            }else if(task_select.value == "medium") {
                task_container_colorcode.classList.remove('high','low');
                task_container_colorcode.classList.add('medium');
            }else if(task_select.value == "low") {
                task_container_colorcode.classList.remove('medium', "high");
                task_container_colorcode.classList.add('low');
            }
        });

        task_date.addEventListener('input', function(e) {
            let parent = this.parentNode.parentNode.id
            let date = new Date(this.value);
            let today = getToday(date);

            changeDeadline(today, parent);

        })

        //OPTIONS FOR THE SELECT LIST
        var option_1 = document.createElement('option');
        option_1.id = 'high';
        option_1.innerHTML = "high";

        var option_2 = document.createElement('option');
        option_2.id = "medium";
        option_2.innerHTML = "medium";

        var option_3 = document.createElement('option');
        option_3.id = "low";
        option_3.innerHTML = "low";

        //ADDING ATTRIBUTES
        task_toggle.type = "checkbox";
        task_toggle.classList = 'task_buttons';
        task_toggle.checked = data[i].completed;

        task_date.type = "date";
        task_date.value = data[i].deadline_date;
        task_name.innerHTML = data[i].task_name;

        //APPENDING CHILDS

        //task SELECT

        task_select.appendChild(option_1);
        task_select.appendChild(option_2);
        task_select.appendChild(option_3);

        task_select.value = data[i].priority;//SET THE PRIORITY

        //COLOR_LIST_STATEMENTS

        if(task_select.value == "high") {
            task_container_colorcode.classList.remove('medium', 'low');
            task_container_colorcode.classList.add('high');
        }else if(task_select.value == "medium") {
            task_container_colorcode.classList.remove('high','low');
            task_container_colorcode.classList.add('medium');
        }else if(task_select.value == "low") {
            task_container_colorcode.classList.remove('medium', "high");
            task_container_colorcode.classList.add('low');
        }


        task_container_text.appendChild(task_toggle);
        task_container_text.appendChild(task_name);
        task_container_widget.appendChild(task_date);
        task_container_widget.appendChild(task_select);
        task_container_widget.appendChild(task_delete);
        task.appendChild(task_container_text);
        task.appendChild(task_container_widget);
        task.appendChild(task_container_colorcode);

        var item = task_toggle.parentNode.parentNode;

        if(task_toggle.checked){
            taskContainer_completed.insertBefore(task, taskContainer_completed.childNodes[1]);

            //GIVING THE CLASS IT SHOULD HAVE
            item.classList = 'completed tasks';
        } else {
            if(task_select.value == "high") {
                taskContainer_uncompleted.insertBefore(task, taskContainer_uncompleted.childNodes[1]);
            } else {
                taskContainer_uncompleted.insertBefore(task, taskContainer_uncompleted.childNodes[i + 1]);
            }
            //CHANGING THE CLASS
            item.classList = 'uncompleted tasks';

        }

        //CLICK FUNCTION FOR LI; CHECKED OF UNCHECKED
        task_toggle.addEventListener('click', function(evt) {

            let item = this.parentNode.parentNode;
            var parent = item.parentNode;

            if(this.checked) {

                taskContainer_uncompleted.removeChild(item);
                taskContainer_completed.insertBefore(item, taskContainer_completed.childNodes[1]);
                item.classList.remove('uncompleted');
                item.classList.add('completed');
            }else{
                taskContainer_completed.removeChild(item);
                taskContainer_uncompleted.insertBefore(item, taskContainer_uncompleted.childNodes[1]);
                item.classList.remove('completed');
                item.classList.add('uncompleted');
            }


            let task_id = this.parentNode.parentNode.id;
            changeCompleted(this.checked, task_id);
            changeCompletedText();

        });



    }
    changeCompletedText();

    function changeCompletedText(){

        var textItem = document.getElementById(listName + 'name');
        if(taskContainer_completed.childElementCount == 1) {
            textItem.innerHTML = 'No completed tasks...';
        } else {
            textItem.innerHTML = taskContainer_completed.childElementCount - 1 + ' Completed tasks';
        }
    }

};


function get_tasks_error(err) {
    console.log(err);
};

function changePriority(value, taskId) {

    let upload = JSON.stringify({
        priority: value,
        task_id: taskId
    });

    console.log(upload);

    let cfg = {
        method: "POST",
        body: upload
    };

    let token = JSON.parse(localStorage.getItem('logindata')).token;

    //let url = "http://localhost:3000/tasks/priority?token=" + token;
    let url = 'https://burgerapplication.herokuapp.com/tasks/priority?token=' + token;

    superfetch(url, "json", change_pri_succ, change_pri_error, cfg);
};

function change_pri_succ(data) {
    console.log(data);
};

function change_pri_error(err) {
    console.log(err);
};

//CHANGE COMPLETED------------
function changeCompleted(value, taskId) {

    let upload = JSON.stringify({
        completed: value,
        task_id: taskId
    });


    let cfg = {
        method: "POST",
        body: upload
    }

    let token = JSON.parse(localStorage.getItem('logindata')).token;

    //let url = "http://localhost:3000/tasks/completed?token=" + token;
    let url = 'https://burgerapplication.herokuapp.com/tasks/completed?token=' + token;
    superfetch(url, "json", change_completed_succ, change_completed_error, cfg);
}

function change_completed_succ(data) {
    console.log(data);
    getNotifications()
};

function change_completed_error(err) {
    console.log(err);
};

//------------------------------

function changeDeadline(date, taskId){

    let upload = JSON.stringify({
        deadline_date: date,
        task_id: taskId
    });

    let cfg = {
        method: "POST",
        body: upload
    };

    let token = JSON.parse(localStorage.getItem('logindata')).token;

    //let url = "http://localhost:3000/tasks/deadline?token=" + token;
    let url = 'https://burgerapplication.herokuapp.com/tasks/deadline?token=' + token;

    superfetch(url, "json", change_deadline_succ, change_deadline_error, cfg);
}

function change_deadline_succ(data) {
    console.log(data);
    getNotifications();
}
function change_deadline_error(err) {
    console.log(err);
}
