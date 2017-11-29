//GLOBAL VARIABLES
var listName;
var selected_listId;
var listContainer = document.getElementById('listContainer');
var sidemenu_public = document.getElementById('public');
var sidemenu_private = document.getElementById('private');
var description_area = document.getElementById('description_area');
var priv;

window.onload = function(){

    if(JSON.parse(localStorage.getItem('logindata')) == null) {
        window.location.replace('login.html');
    }
    let user = JSON.parse(localStorage.getItem('logindata'));
    var user_name_header_tag = document.getElementById('user_name_header_tag');
    user_name_header_tag.innerHTML = 'Welcome ' + user.fullname;

    getLists();
}



function getLists() {

    let user = JSON.parse(localStorage.getItem('logindata'));
    let token = user.token;
    let user_id = user.id;


    var url = 'http://localhost:3000/lists?user_id=' + user_id + '&token=' + token;
    //var url = 'https://burgerapplication.herokuapp.com/lists?user_id=' + user_id + '&token=' + token;

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
        sidemenu_li.id = data[i].id + "sidemenu";

        //appendingChild if statement
        if(data[i].private){
            sidemenu_private.appendChild(sidemenu_li);
        } else {
            sidemenu_public.appendChild(sidemenu_li);
        }


        //EVENT LISTENER FOR THE DIV --- RETRIEVES THE LIST
        sidemenu_li.addEventListener('click', function(){

            let id = this.id;
            let s_id = id.replace("sidemenu", "");
            listName = this.innerHTML;


            var user = JSON.parse(localStorage.getItem('logindata'));
            var token = user.token;
            var user_id = user.id;

            var url = 'http://localhost:3000/lists/single?user_id=' + user_id + '&token=' + token + '&list_id=' + s_id;
            //var url = 'https://burgerapplication.herokuapp.com/lists/single?user_id=' + user_id + '&token=' + token + '&list_name=' + listName;

            let cfg = {
                method:'GET'
            };

            superfetch(url, "json", get_single_list_succ, get_single_list_error, cfg);


        });

    }

};
//---get_SINGLE_list_succ----//
function get_single_list_succ(data) {


    var res_data = data[0];
    selected_listId = res_data.id;

    if(description_area.hasChildNodes()){
        description_area.removeChild(description_area.childNodes[0]);
    }

    while (listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.childNodes[0]);
    }

    //CREATING A -UNCOMPLETED- UL THAT HOUSES THE TASKS
    var ul_uncompleted = document.createElement('ul');
    ul_uncompleted.id = res_data.list_name + 'uncompleted';
    ul_uncompleted.classList = "group";

    //CREATING A -COMPLETED- UL THAT HOUSES THE TASKS-------------

    var ul_completed = document.createElement('ul');
    ul_completed.id = res_data.list_name + 'completed';
    ul_completed.classList = "group";

    var li_completed = document.createElement('li');
    li_completed.id = res_data.list_name + 'completed_li';

    var completed_container = document.createElement('div');
    li_completed.classList = 'li_completed';

    var li_completed_name = document.createElement('p');
    li_completed_name.id = res_data.list_name + 'name';
    li_completed_name.innerHTML = 'No completed tasks';



    //APPENDING TO COMPLETED

    completed_container.appendChild(li_completed_name);
    li_completed.appendChild(completed_container);
    ul_completed.appendChild(li_completed);

    //----------------------------------------------------------

    var textarea = document.createElement('textarea');
    textarea.id = res_data.list_name + 'textbox';
    textarea.classList = 'textbox';
    textarea.value = res_data.description;

    if(textarea.value == "") {
        textarea.value = 'Add a description...';
    }

    textarea.addEventListener('input', function(){

        let s_id = this.id
        let list_name = s_id.replace("textbox", "");
        let listId = res_data.id;
        let desc = textarea.value;
        let sLI = document.getElementById(list_name + 'sidemenu');

        changeDescription(desc, listId);

    });


    //CREATING A TASKBAR
    var head = document.createElement('li');
    head.id = res_data.list_name + "head";
    head.classList = "list_head";

    //CREATING TASKBAR/HEADBAR AND ITS BUTTONS AND INPUT-FIELD--------------------------

    var head_name = document.createElement('p');
    head_name.innerHTML = res_data.list_name;

    var head_container_text = document.createElement('div');
    head_container_text.classList = 'head_text';

    var head_container = document.createElement('div');
    head_container.classList = 'head_widget';

    var head_input = document.createElement('input');
    head_input.id = res_data.list_name + "input";

    var head_toggle_box = document.createElement('input');
    head_toggle_box.type = "checkbox";
    head_toggle_box.id = res_data.list_name + 'privacy_box'
    head_toggle_box.checked = res_data.private;

    if(head_toggle_box.checked){
        console.log(true);
        ul_uncompleted.classList.add('private_list');
        ul_uncompleted.classList.remove('public_list');
        ul_completed.classList.add('private_list');
        ul_completed.classList.remove('public_list');
    } else {
        console.log(false);
        ul_uncompleted.classList.add('public_list');
        ul_uncompleted.classList.remove('private_list');
        ul_completed.classList.add('public_list');
        ul_completed.classList.remove('private_list');
    }

    //CLICK FUNCTION FOR CHECKBOX
    head_toggle_box.addEventListener('click', function(evt) {
        let parent = this.parentNode.parentNode.parentNode;
        let s_id = this.id
        let list_name= s_id.replace("privacy_box", "");

        let listId = res_data.id;

        let sLI = document.getElementById(listId + 'sidemenu');

        if (this.checked) {

            priv = true;
            sidemenu_public.removeChild(sLI);
            sidemenu_private.appendChild(sLI);
            ul_uncompleted.classList.add('private_list');
            ul_uncompleted.classList.remove('public_list');
            ul_completed.classList.add('private_list');
            ul_completed.classList.remove('public_list');

            changePrivacy(priv, list_name, listId);
        } else {
            priv = false;
            sidemenu_private.removeChild(sLI);
            sidemenu_public.appendChild(sLI);

            changePrivacy(priv, list_name, listId);
            ul_uncompleted.classList.add('public_list');
            ul_uncompleted.classList.remove('private_list');
            ul_completed.classList.add('public_list');
            ul_completed.classList.remove('private_list');
        }


    });


    //------------------------------

    var head_button = document.createElement('button');
    head_button.innerHTML = 'add';
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
        let item = this.parentNode.parentNode;

        //UNCOMPLETED LIST
        var parent_uncompleted_list = item.parentNode;
        var parent_uncompleted_children_count = parent_uncompleted_list.childElementCount;

        for(var i = 1; i < parent_uncompleted_children_count; i++) {

            let u_itemid = parent_uncompleted_list.childNodes[1].id;
            remove_task(u_itemid, selected_listId);
            parent_uncompleted_list.removeChild(parent_uncompleted_list.childNodes[1]);
        }


        //COMPLETED LIST
        var parent_completed_list = item.parentNode.parentNode.childNodes[1];
        var parent_completed_children_count = parent_completed_list.childElementCount;

        for(var j = 1; j < parent_completed_children_count; j++) {

            let c_itemid = parent_completed_list.childNodes[1].id;
            remove_task(c_itemid, selected_listId);
            parent_completed_list.removeChild(parent_completed_list.childNodes[1]);

        }

        remove_list(selected_listId);

        //removing ul and stuff
        while(listContainer.hasChildNodes()){
            listContainer.removeChild(listContainer.childNodes[0]);
        }

        if(document.getElementById(selected_listId + 'sidemenu')) {
            var sidemenu_remove = document.getElementById(selected_listId + 'sidemenu');
            if (sidemenu_remove.parentNode == sidemenu_public) {
                sidemenu_public.removeChild(sidemenu_remove);
            }else if (sidemenu_remove.parentNode == sidemenu_private) {
                sidemenu_private.removeChild(sidemenu_remove);
            }
        }

    });

    head_container_text.appendChild(head_name);
    head_container_text.appendChild(textarea);
    head_container.appendChild(head_input);
    head_container.appendChild(head_button);
    head_container.appendChild(head_toggle_box);
    head_container.appendChild(head_button_delete);

    head.append(head_container_text);
    head.appendChild(head_container);


    /*-----Appending li to ul-----*/

    ul_uncompleted.appendChild(head);
    listContainer.appendChild(ul_uncompleted);
    listContainer.appendChild(ul_completed);

    getTasks();

};

function get_single_list_error(err) {
    console.log(err);
};


function get_all_lists_error(err) {
    console.log(err);
};

//SOME OTHER FUNCTIONS FOR THE CHANGING OF EX PRIVACY ETC.

function changePrivacy(privacy, list_name, listId){


    let user = JSON.parse(localStorage.getItem('logindata'));
    let token = user.token;
    let userId = user.id;

    let url = "http://localhost:3000/lists/priv?privacy=" + privacy + '&token=' + token + '&list_name' + list_name;
    //var url = 'https://burgerapplication.herokuapp.com/lists/priv?privacy=" + privacy + '&token=' + token + '&list_name' + list_name;

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
    //var url = 'https://burgerapplication.herokuapp.com/lists/desc?token=" + token;

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
