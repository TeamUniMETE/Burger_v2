//GLOBAL VARIABLES
var listName;
var selected_listId;
var listContainer = document.getElementById('listContainer');
var sidemenu_public = document.getElementById('public');
var sidemenu_private = document.getElementById('private');
var description_area = document.getElementById('description_area');

var priv;

window.onload = getLists; //runs after logging in

function getLists() {

    var user = JSON.parse(localStorage.getItem('logindata'));
    var token = user.token;
    var user_id = user.id;

    var url = 'http://localhost:3000/lists?user_id=' + user_id + '&token=' + token;

    var cfg = {
        method: "GET"
    };

    superfetch(url, "json", get_all_lists_succ, get_all_lists_error, cfg);

};

//---get_ALL_lists_succ----//

function get_all_lists_succ(data) {


    for(let i = 0; i < data.length; i++){

        //CREATE SIDEMENU LI

        var sidemenu_li = document.createElement('li');
        sidemenu_li.innerHTML = data[i].list_name;
        sidemenu_li.classList = "li_sidemenu";
        sidemenu_li.id = data[i].list_name + "sidemenu";

        //appendingChild if statement
        if(data[i].private){
            sidemenu_private.appendChild(sidemenu_li);
        } else {
            sidemenu_public.appendChild(sidemenu_li);
        }


        //EVENT LISTENER FOR THE DIV --- RETRIEVES THE LIST
        sidemenu_li.addEventListener('click', function(){

            let id = this.id;
            listName = id.replace("sidemenu", "");

            var user = JSON.parse(localStorage.getItem('logindata'));
            var token = user.token;
            var user_id = user.id;

            var url = 'http://localhost:3000/lists/single?user_id=' + user_id + '&token=' + token + '&list_name=' + listName;

            let cfg = {
                method:'GET'
            };

            superfetch(url, "json", get_single_list_succ, get_single_list_error, cfg);


        });

    }

    function get_single_list_succ(data) {

        var res_data = data[0];
        selected_listId = res_data.id;

        if(description_area.hasChildNodes()){
            description_area.removeChild(description_area.childNodes[0]);
        }

        if (listContainer.hasChildNodes()) {
            listContainer.removeChild(listContainer.childNodes[0]);
        }

        var ul = document.createElement('ul');
        ul.id = res_data.list_name;
        ul.classList = "group";

        var textarea = document.createElement('textarea');
        textarea.id = res_data.list_name + 'textbox';
        textarea.value = res_data.description;

        textarea.addEventListener('input', function(){

            let s_id = this.id
            let list_name = s_id.replace("textbox", "");
            let listId = res_data.id;

            let desc = textarea.value;

            let sLI = document.getElementById(list_name + 'sidemenu');

            changeDescription(desc, listId);

        });

        description_area.appendChild(textarea);

        var head = document.createElement('li');
        head.id = res_data.list_name + "head";
        head.classList = "li_head";

        //CREATING TASKBAR/HEADBAR AND ITS BUTTONS AND INPUT-FIELD--------------------------

        var head_name = document.createElement('h1');
        head_name.innerHTML = res_data.list_name;

        var head_container = document.createElement('div');

        var head_input = document.createElement('input');
        head_input.id = res_data.list_name + "input";

        var head_toggle_box = document.createElement('input');
        head_toggle_box.type = "checkbox";
        head_toggle_box.id = res_data.list_name + 'privacy_box'
        head_toggle_box.checked = res_data.private;

        //CLICK FUNCTION FOR CHECKBOX
        head_toggle_box.addEventListener('click', function(evt) {

            let s_id = this.id
            let list_name= s_id.replace("privacy_box", "");

            let listId = res_data.id;

            let sLI = document.getElementById(list_name + 'sidemenu');

            if (this.checked) {

                priv = true;
                sidemenu_public.removeChild(sLI);
                sidemenu_private.appendChild(sLI);

                changePrivacy(priv, list_name, listId);
            } else {
                priv = false;
                sidemenu_private.removeChild(sLI);
                sidemenu_public.appendChild(sLI);

                changePrivacy(priv, list_name, listId);
            }


        });


        //------------------------------

        var head_button = document.createElement('button');
        head_button.innerHTML = 'NEW TASK';
        //CLICK FUNCTION FOR ADDING TASKS
        head_button.addEventListener('click', function() {

            let value = document.getElementById(res_data.list_name + "input").value;
            let listId = res_data.id;

            var taskContainer = document.getElementById(listName);

            addTask(value, listId);
        });

        var head_button_delete = document.createElement('button');
        head_button_delete.innerHTML = 'delete';

        //DELETING LIST
        head_button_delete.addEventListener('click', function(evt){
            let list = this.parentNode.parentNode.parentNode.id;

        });

        head_container.appendChild(head_name);
        head_container.appendChild(head_input);
        head_container.appendChild(head_button);
        head_container.appendChild(head_toggle_box);
        head_container.appendChild(head_button_delete);
        head.appendChild(head_container);


        /*-----Appending li to ul-----*/

        ul.appendChild(head);
        listContainer.appendChild(ul);

        getTasks();

    };

    function get_single_list_error(err) {
        console.log(err);
    };
};

//---get_SINGLE_list_succ----//


function get_all_lists_error(err) {
    console.log(err);
};

//SOME OTHER FUNCTIONS FOR THE CHANGING OF EX PRIVACY ETC.

function changePrivacy(privacy, list_name, listId){


    let user = JSON.parse(localStorage.getItem('logindata'));
    let token = user.token;
    let userId = user.id;

    let url = "http://localhost:3000/lists/priv?privacy=" + privacy + '&token=' + token + '&list_name' + list_name;

    let upload = JSON.stringify({
        user_id: userId,
        list_id: listId

    });

    var cfg = {
        method: "POST",
        body: upload
    }

    superfetch(url, 'json', change_priv_succ, change_priv_error, cfg);

    function change_priv_succ(data) {
        console.log(data);
    }

    function change_priv_error(err) {
        console.log(err);
    }

};

function changeDescription(text, listId) {

    let user = JSON.parse(localStorage.getItem('logindata'));
    let token = user.token;
    let userId = user.id;

    let url = "http://localhost:3000/lists/desc?token=" + token;

    let upload = JSON.stringify({
        user_id: userId,
        list_id: listId,
        description: text
    });

    var cfg = {
        method: "POST",
        body: upload
    }

    superfetch(url, 'json', change_desc_succ, change_desc_error, cfg);

    function change_desc_succ(data) {
        console.log(data);
    }

    function change_desc_error(err) {
        console.log(err);
    }

}
