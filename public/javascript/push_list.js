
//CHECK IF THERE IS ANY VALUE -- FUNCTION

function addList() {

    listName = document.getElementById('listName').value;
    var check = document.getElementById(listName + 'sidemenu');

    if (listName == "" || check || regexNumCharSpace(listName)) {
        alert("There was no value OR the board already exists OR special characters");
    } else {

        while(sidemenu_public.childNodes[2]){
            sidemenu_public.removeChild(sidemenu_public.childNodes[2]);
        }

        while(sidemenu_private.childNodes[2]){
            sidemenu_private.removeChild(sidemenu_private.childNodes[2]);
        }
        push_list_to_db(listName);
    }
};


function push_list_to_db(listName){
    priv = true;

    let userId = JSON.parse(localStorage.getItem('logindata')).id
    let token = JSON.parse(localStorage.getItem('logindata')).token
    let description = "";

    let upload = JSON.stringify({
        list_name: listName,
        private: priv,
        user_id: userId,
        desc: description
    });

    console.log(upload);

    let cfg = {
        method: "POST",
        body: upload
    };

    //let url = "http://localhost:3000/lists/?token=" + token;
    let url = 'https://burgerapplication.herokuapp.com/lists/?token=' + token;

    superfetch(url, "json", create_list_succ, create_list_error, cfg);

}

function create_list_succ(data) {
    console.log(data);
    getLists();
};

function create_list_error(err) {
    console.log(err);
};
