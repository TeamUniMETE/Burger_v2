
document.getElementById('searchusers').addEventListener('input', function(evt) {

    var upload = JSON.stringify({
        usersearch: this.value
    });

    console.log(upload);

    var url = 'https://burgerapplication.herokuapp.com/users/search/';

    var cfg = {
        method: "POST",
        body: upload
    };

    superfetch(url, "json", succ, error, cfg);

});

function succ(data) {
    console.log(data);
}

//error ----------------------------------------
function error(err) {
    console.log(err);
}
