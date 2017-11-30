var notification_list = document.getElementById('notification_list');
var dropbtn = document.getElementById('dropbtn');

function getNotifications() {

    let user = JSON.parse(localStorage.getItem('logindata'));
    let date = new Date();
    let today = getToday(date);


    //var url = 'http:localhost:3000/tasks/notifications?user_id=' + user_id + '&today='+ today +'&token=' + token;
    let url = 'https://burgerapplication.herokuapp.com/tasks/n/?user_id=' + user.id + '&today='+ today +'&token=' + user.token;

    let cfg = {
        method: 'GET'
    };

    superfetch(url, 'json', get_notifications_succ, get_notifications_error, cfg);

};

function getToday(d) {
    let day = d.getDate();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = year + '-' + month + '-' + day;

    return date;
};


function get_notifications_succ(data) {

    while(notification_list.hasChildNodes()){
        notification_list.removeChild(notification_list.childNodes[0]);
    }

    for(let i = 0; i < data.length; i++) {

        let notification_a = document.createElement('a');
        notification_a.innerHTML = data[i].task_name;
        notification_a.id = data[i].list_id + 'notification';

        notification_list.appendChild(notification_a);

        notification_a.addEventListener('click', function(e){

            let id = this.id;
            let s_id = id.replace("notification", "");

            let user = JSON.parse(localStorage.getItem('logindata'));
            let token = user.token;
            let user_id = user.id;

            //let url = 'http://localhost:3000/lists/single?user_id=' + user_id + '&token=' + token + '&list_id=' + s_id;
            let url = 'https://burgerapplication.herokuapp.com/lists/single/?user_id=' + user_id + '&token=' + token + '&list_id=' + s_id;

            let cfg = {
                method:'GET'
            };

            superfetch(url, "json", get_single_list_succ, get_single_list_error, cfg);
        });

    }
    dropbtn.classList.add('haveTask');

};

function get_notifications_error(err) {
    while(notification_list.hasChildNodes()){
        notification_list.removeChild(notification_list.childNodes[0]);
    }

    let notification_a = document.createElement('a');
    notification_a.innerHTML = err.msg;

    notification_list.appendChild(notification_a);
    dropbtn.classList.remove('haveTask');
};
