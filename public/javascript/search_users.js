
//RESULT CONTAINER --
var ul_usertable = document.getElementById('user_search_table');

//SEARCH FOR EXISTING USERS ON THE DATABASE...

//----an event listener that const do a request. More userfriendly.

var user_search = document.getElementById('user_search').addEventListener('input', function(){

    let name = this.value;
    let token = JSON.parse(localStorage.getItem('logindata')).token;

    var url = 'http://localhost:3000/search/?user=' + name + '&token=' + token;
    //var url = 'https://burgerapplication.herokuapp.com/search/?user=' + name + '&token=' + token;

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
        li.innerHTML = data[i].loginname;

        ul_usertable.insertBefore(li, ul_usertable.childNodes[0]);
    }

}

function user_search_error(err) {

    while (ul_usertable.firstChild) {
        ul_usertable.removeChild(ul_usertable.firstChild);
    }

    let li = document.createElement('li');
    li.innerHTML = err.msg;

    ul_usertable.insertBefore(li, ul_usertable.childNodes[0]);
}
