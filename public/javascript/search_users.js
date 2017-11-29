var searchedUser;
var selectedTaskLi;
//RESULT CONTAINER --
var ul_usertable = document.getElementById('user_search_table');

//SEARCH FOR EXISTING USERS ON THE DATABASE...

//----an event listener that const do a request. More userfriendly.

var user_search = document.getElementById('user_search').addEventListener('input', function(){

    let name = this.value;

    var url = 'http://localhost:3000/search/?user=' + name;
    //var url = 'https://burgerapplication.herokuapp.com/search/?user=' + name;

    var cfg = {
        method: 'GET'
    }

    superfetch(url, "json", user_search_succ, user_search_error, cfg);

});

function user_search_succ(data) {

    while (ul_usertable.firstChild) {
        ul_usertable.removeChild(ul_usertable.firstChild);
    }
    for(var i = 0; i < data.length; i++){

        let li = document.createElement('li');
        li.classList = 'search_user_li';
        li.id = data[i].id;

        let div = document.createElement('div');
        div.classList = 'search_user_div';
        div.id = data[i].loginname;

        let p = document.createElement('p');
        p.innerHTML = data[i].loginname;

        let btn = document.createElement('button');
        btn.innerHTML = 'search';

        btn.addEventListener('click', function() {

            let user_id = this.parentNode.parentNode.id;
            searchedUser = this.parentNode.id;

            let token = JSON.parse(localStorage.getItem('logindata')).token;

            let url = 'http://localhost:3000/search/view?user_id=' + user_id + '&token=' + token;

            let cfg = {
                method: 'GET'
            };

            superfetch(url, 'json', view_succ, view_error, cfg);
        });
        div.appendChild(p);
        div.appendChild(btn);
        li.appendChild(div);

        ul_usertable.insertBefore(li, ul_usertable.childNodes[0]);
    }

}
function view_succ(data) {

    while (listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.childNodes[0]);
    }

    for(let i = 0; i < data.length; i++) {

        let user_list = document.createElement('ul');
        user_list.id = data[i].id
        user_list.classList = 'view_task_ul';

        //HEAD
        let user_list_head = document.createElement('li');

        let user_list_container = document.createElement('div');

        let user_list_name = document.createElement('p');
        user_list_name.innerHTML = data[i].list_name + ' by ' + searchedUser;

        //APPENDING
        user_list_container.appendChild(user_list_name);
        user_list_head.appendChild(user_list_container);

        user_list.appendChild(user_list_head);
        listContainer.appendChild(user_list);

        //RETRIEVING TASKS IN THE LIST TO THE USER YOU SEARCHED FOR -- NO EDIT --

        let url = 'http:localhost:3000/search/tasks?list_id=' + data[i].id;

        var cfg = {
            method: 'GET'
        };

        superfetch(url, "json", get_users_tasks_succ, get_users_tasks_error, cfg);

        function get_users_tasks_succ(search_data) {

            console.log(search_data);
            for(let j = 0; j < search_data.length; j++) {
                console.log('i have runned ' + j + 1 + ' times');
                let task = document.createElement('li');
                task.classList = 'view_task_li';

                task.addEventListener('click', function(e){
                    this.classList.toggle('selected_task_li');
                })

                //NAMECONTAINER
                let task_name_container = document.createElement('div');
                let task_name = document.createElement('h3');

                //INFOCONTAINER
                let task_info_container = document.createElement('div');
                task_info_container.classList = 'view_task_info_container';
                let task_completed = document.createElement('p');
                let task_priority = document.createElement('p');
                let task_deadline = document.createElement('p');

                let task_priority_code = document.createElement('div');
                if(search_data[j].priority == 'low') {
                    task_priority_code.classList = 'low';
                }else if(search_data[j].priority == 'medium') {
                    task_priority_code.classList = 'medium';
                }else if(search_data[j].priority == 'high'){
                    task_priority_code.classList = 'high';
                }

                //GIVING VALUES
                task_name.innerHTML = search_data[j].task_name;
                task_completed.innerHTML = 'completed: ' + search_data[j].completed;
                task_priority.innerHTML = 'priority: ' + search_data[j].priority;
                task_deadline.innerHTML = 'deadline: ' + search_data[j].deadline_date;

                //APPENDING TO DIV
                task_name_container.appendChild(task_name);
                task_info_container.appendChild(task_completed);
                task_info_container.appendChild(task_priority);
                task_info_container.appendChild(task_deadline);

                //APPENDING TO LI
                task.appendChild(task_name_container);
                task.appendChild(task_info_container);
                task.appendChild(task_priority_code);

                //APPENDING TO UL
                user_list.appendChild(task);
            }
        }

        function get_users_tasks_error(err) {
            console.log(err);
        }
    }
};

function view_error(err) {

    while (listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.childNodes[0]);
    }

    let div = document.createElement('div');

    let message = document.createElement('p');
    message.innerHTML = err.msg;


    //APPENDING
    div.appendChild(message);
    listContainer.appendChild(div);
}


function user_search_error(err) {

    while (ul_usertable.firstChild) {
        ul_usertable.removeChild(ul_usertable.firstChild);
    }

    let li = document.createElement('li');

    let div = document.createElement('div');
    div.classList = 'search_user_div';

    let p = document.createElement('p');
    p.classList = 'search_users_smalltext';
    p.innerHTML = err.msg;

    div.appendChild(p);
    li.appendChild(div);

    ul_usertable.insertBefore(li, ul_usertable.childNodes[0]);
}
