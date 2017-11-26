
//CHECK IF THERE IS ANY VALUE FUNCTIONS

function addList() {

    listName = document.getElementById('listName').value;
    console.log(listName);

    if (listName == "") {
        alert("There was no value");
    } else {
        createList(listName);
    }
};


//CREATING FUNCTIONS

function createList(listName){
    priv = true;

    var userId = JSON.parse(localStorage.getItem('logindata')).id
    var token = JSON.parse(localStorage.getItem('logindata')).token
    var description = "";

    var upload = JSON.stringify({
        list_name: listName,
        private: priv,
        user_id: userId,
        desc: description
    });

    console.log(upload);

    var cfg = {
        method: "POST",
        body: upload
    };

    var url = "http://localhost:3000/lists/?token=" + token;

    superfetch(url, "json", create_list_succ, create_list_error, cfg);

}

function create_list_succ(data) {
    console.log(data);
    getLists();
};

function create_list_error(err) {
    console.log(err);
};

/*

function createList(listName) {

    priv = true;
    //removing the last list
    if (listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.childNodes[0]);
    }
    //SIDEMENU

    var sidemenu_li = document.createElement('li');
    sidemenu_li.innerHTML = listName;
    sidemenu_li.classList = "li_sidemenu";
    sidemenu_li.id = listName + "sidemenu";

    //appendingChild
    sidemenu_private.appendChild(sidemenu_li);

    //EVENT LISTENER FOR THE DIV --- RETRIEVES THE LIST
    sidemenu_li.addEventListener('click', function(){
        let list_Name = this.id;
        listName = list_Name.replace("sidemenu", "");

        let user_all_info = localStorage.getItem('logindata');
        let user = JSON.parse(user_all_info);
        let tok = user.token;
        let userId = user.id;


        var url = 'http://localhost:3000/lists/getlist?listname=' + list_Name + '&tok=' + tok + '&id=' + userId;

        let cfg = {
            method:'GET'
        };

        superfetch(url, "json", get_list_succ, get_list_error, cfg);

        function get_list_succ(data) {
            console.log(data);
        }

        function get_list_error(err) {
            console.log(err);
        }

    });

    //-----------------------------
    var ul = document.createElement('ul');
    ul.id = listName;
    ul.classList = "group";

    var head = document.createElement('li');
    head.id = listName + "head";
    head.classList = "li_head";

    //CREATING TASKBAR/HEADBAR AND ITS BUTTONS AND INPUT-FIELD--------------------------

    var head_name = document.createElement('h1');
    head_name.innerHTML = listName;

    var head_container = document.createElement('div');

    var head_input = document.createElement('input');
    head_input.id = listName + "input";

    var head_toggle_box = document.createElement('input');
    head_toggle_box.type = "checkbox";
    head_toggle_box.checked = true;

    //CLICK FUNCTION FOR CHECKBOX
    head_toggle_box.addEventListener('click', function(evt) {

        if (head_toggle_box.checked) {
            priv = true;
            sidemenu_public.removeChild(sidemenu_li);
            sidemenu_private.appendChild(sidemenu_li);

            changePrivacy(priv);
        } else {
            priv = false;
            sidemenu_private.removeChild(sidemenu_li);
            sidemenu_public.appendChild(sidemenu_li);

            changePrivacy(priv);
        }

        function changePrivacy(privacy){

            console.log(listName);

            var url = "http://localhost:3000/lists/priv?privacy=" + privacy + '&token' + token + '&list_name';

        }
    });


    //------------------------------

    var head_button = document.createElement('button');
    head_button.innerHTML = 'NEW TASK';
    //CLICK FUNCTION FOR ADDING TASKS
    head_button.addEventListener('click', function(e) {

        let value = document.getElementById(listName + "input").value;

        addTask(value);
    });

    var head_button_delete = document.createElement('button');
    head_button_delete.innerHTML = 'delete';

    head_button_delete.addEventListener('click', function(e) {
        console.log(this.id);
    });



    head_container.appendChild(head_name);
    head_container.appendChild(head_input);
    head_container.appendChild(head_button);
    head_container.appendChild(head_toggle_box);
    head_container.appendChild(head_button_delete);
    head.appendChild(head_container);


    -----Appending li to ul-----

    ul.appendChild(head);
    listContainer.appendChild(ul);


    ------sending to db------

        var userId = JSON.parse(localStorage.getItem('logindata')).id
        var token = JSON.parse(localStorage.getItem('logindata')).token

        var upload = JSON.stringify({
            list_name: listName,
            private: priv,
            user_id: userId
        });

        console.log(upload);

        var cfg = {
            method: "POST",
            body: upload
        };

        var url = "http://localhost:3000/lists/?token=" + token;

        superfetch(url, "json", create_list_succ, create_list_error, cfg);

        function create_list_succ(data) {
            console.log(data);
        };

        function create_list_error(err) {
            console.log(err);
        };

}

*/
