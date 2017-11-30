
//CHECK IF THERE IS ANY VALUE -- FUNCTION

function addTask(value) {
    var taskContainer_uncompleted = document.getElementById(listName + 'uncompleted');
    var taskContainer_completed = document.getElementById(listName + 'completed');

    while(taskContainer_uncompleted.childNodes[1]) {
        taskContainer_uncompleted.removeChild(taskContainer_uncompleted.childNodes[1]);
    }

    while(taskContainer_completed.childNodes[1]) {
        taskContainer_completed.removeChild(taskContainer_completed.childNodes[1]);
    }

    if (value == "" || regexNumCharSpace(value)) {
        alert("There was no value or special characters");
    } else {
        push_task_to_db(value);
    }
};


function push_task_to_db(value) {

    let user = JSON.parse(localStorage.getItem('logindata'));
    let token = user.token;
    let userId = user.id;
    let isCompleted = false;
    let defaultPriority = "low";


    let upload = JSON.stringify({
        task_name: value,
        priority: defaultPriority,
        completed: isCompleted,
        list_id: selected_listId,
        user_id: userId
    });


    let cfg = {
        method: 'POST',
        body: upload
    }

    //let url = "http://localhost:3000/tasks/add?token=" + token;
    let url = 'https://burgerapplication.herokuapp.com/tasks/add?token=' + token;

    superfetch(url, "json", create_task_succ, create_task_error, cfg);

};

function create_task_succ(data) {
    console.log(data);
    getTasks();
};

function create_task_error(err) {
    console.log(err);
};
