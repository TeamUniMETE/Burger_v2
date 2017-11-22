var user = document.getElementById('searchusers');
var button = document.getElementById('searchUsers_btn');


button.onclick = searchUser;

function searchUser() {

    var upload = JSON.stringify({
        loginname: user.value
    });

    var url = 'http://localhost:3000/users/search';

    var cfg = {
        method: "POST",
        body: upload
    }

    superfetch(url, "json", succ, error, cfg);

};

function succ(data) {
    console.log(data);
}

function error(err) {
    console.log(err);
}


/*
}
document.getElementById('searchusers').addEventListener('input', function(evt) {

    var user = this;

    var upload = JSON.stringify({
        loginname: user.value
    });

    console.log(upload);

    var url = 'http://localhost:3000/users/search';

    var cfg = {
        method: "POST",
        body: upload
    }

    superfetch(url, "json", succ, error, cfg);

});

function succ(data) {
    console.log(data);
}

//error ----------------------------------------
function error(err) {
    console.log(err);
}
*/
