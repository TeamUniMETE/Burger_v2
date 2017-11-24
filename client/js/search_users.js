
var user_search = document.getElementById('user_search').addEventListener('input', function(){

    var name = this.value;

    var url = 'http://localhost:3000/users/search?user=' + name;

    var cfg = {
        method: 'GET'
    }

    superfetch(url, "json", succ, error, cfg);

});

function succ(data) {

    var ul_usertable = document.getElementById('user_search_table');
    while (ul_usertable.firstChild) {
        ul_usertable.removeChild(ul_usertable.firstChild);
    }

    for(var i = 0; i < data.length; i++){
        let li = document.createElement('li');
        li.innerHTML = data[i].loginname;

        ul_usertable.insertBefore(li, ul_usertable.childNodes[0]);
    }

}

function error(err) {

    var ul_usertable = document.getElementById('user_search_table');

    while (ul_usertable.firstChild) {
        ul_usertable.removeChild(ul_usertable.firstChild);
    }

    let li = document.createElement('li');
    li.innerHTML = err.msg;

    ul_usertable.insertBefore(li, ul_usertable.childNodes[0]);
}
