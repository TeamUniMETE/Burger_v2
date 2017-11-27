
//CHECK IF THERE IS ANY VALUE -- FUNCTION

function addTask(value) {
    var taskContainer = document.getElementById(listName);

    while(taskContainer.childNodes[1]) {
        taskContainer.removeChild(taskContainer.childNodes[1]);
    }

    if (value == "") {
        alert("There was no value");
    } else {
        push_task_to_db(value);
    }
};


function push_task_to_db(value) {

    let token = JSON.parse(localStorage.getItem('logindata')).token;
    let today = new Date().toDateString();
    let isCompleted = false;
    let defaultPriority = "low";

    let upload = JSON.stringify({
        task_name: value,
        deadline_date: today,
        priority: defaultPriority,
        completed: isCompleted,
        list_id: selected_listId
    });


    let cfg = {
        method: 'POST',
        body: upload
    }

    let url = "http://localhost:3000/tasks/add?token=" + token;

    superfetch(url, "json", create_task_succ, create_task_error, cfg);

};

function create_task_succ(data) {
    console.log(data);
    getTasks();
};

function create_task_error(err) {
    console.log(err);
};
