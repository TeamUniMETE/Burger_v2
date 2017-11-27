
function getTasks(){

    let token = JSON.parse(localStorage.getItem('logindata')).token;

    var upload = JSON.stringify({
        list_id: selected_listId
    });

    let cfg = {
        method: 'POST',
        body: upload
    }

    let url = "http://localhost:3000/tasks/?token=" + token;
    //var url = 'https://burgerapplication.herokuapp.com/tasks/?token=" + token;

    superfetch(url, "json", get_tasks_succ, get_tasks_error, cfg);
}

function get_tasks_succ(data) {

    var taskContainer = document.getElementById(listName);

    for(var i = 0; i < data.length; i++) {


        //TASKCONTAINER
        let task = document.createElement('li');
        task.id = data[i].id;
        task.classList = "li_task neutral";

        let task_container = document.createElement('div');
        let task_toggle = document.createElement('input');
        let task_name = document.createElement('h1');
        let task_date = document.createElement('input');

        let task_select = document.createElement('select');
        task_select.addEventListener('input', function(e) {

            console.log(this.parentNode.parentNode.id);
            //changePriority(this.value, this.parentNode.parentNode.id);
        });

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

        console.log(task_toggle.checked);

        task_date.type = "date";
        task_date.value = data[i].deadline_date;
        task_name.innerHTML = data[i].task_name;

        //APPENDING CHILDS

        //task SELECT

        task_select.appendChild(option_1);
        task_select.appendChild(option_2);
        task_select.appendChild(option_3);

        task_select.value = data[i].priority;//SET THE PRIORITY


        task_container.appendChild(task_name);
        task_container.appendChild(task_toggle);
        task_container.appendChild(task_date);
        task_container.appendChild(task_select);
        task.appendChild(task_container);


        taskContainer.insertBefore(task, taskContainer.childNodes[1]);

        //CLICK FUNCTION FOR LI; CHECKED OF UNCHECKED
        task_toggle.addEventListener('click', function(evt) {

            let item = this.parentNode.parentNode;
            item.classList.toggle('completed');
            let t_id = this.parentNode.parentNode.id;
            changeCompleted(this.checked, t_id);
        });

        if(task_toggle.checked) {
            let item = task_toggle.parentNode.parentNode;
            item.classList.toggle('completed');
        }


    }

    //TASKCONTAINER


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
    }

    let token = JSON.parse(localStorage.getItem('logindata')).token;

    let url = "http://localhost:3000/tasks/priority?token=" + token;
    //var url = 'https://burgerapplication.herokuapp.com/tasks/priority?token=" + token;

    superfetch(url, "json", change_pri_succ, change_pri_error, cfg);
}

function change_pri_succ(data) {
    console.log(data);
}

function change_pri_error(err) {
    console.log(err);
}

function changeCompleted(value, taskId) {

    let upload = JSON.stringify({
        completed: value,
        task_id: taskId
    });

    console.log(upload);

    let cfg = {
        method: "POST",
        body: upload
    }

    let token = JSON.parse(localStorage.getItem('logindata')).token;

    let url = "http://localhost:3000/tasks/completed?token=" + token;
    //var url = 'https://burgerapplication.herokuapp.com/tasks/completed?token=" + token;

    superfetch(url, "json", change_completed_succ, change_completed_error, cfg);
}

function change_completed_succ(data) {
    console.log(data);
};

function change_completed_error(err) {
    console.log(err);
};
