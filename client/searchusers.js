
document.getElementById('searchusers').addEventListener('input', function(evt) {

    var user = this.value;

    var upload = JSON.stringify({
        usersearch: user
    });

    var url = 'https://burgerapplication.herokuapp.com/users/search/';

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
