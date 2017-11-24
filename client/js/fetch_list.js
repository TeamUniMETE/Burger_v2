var priv;

function succ(data) {

    //removing the last list
    if (listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.childNodes[0]);
    }
    //-----------------------------
    var ul = document.createElement('ul');
    ul.id = data.listName;
    ul.classList = "group";

    var head = document.createElement('li');
    head.innerHTML = listName;
    head.id = listName + "head";
    head.classList = "li_head";

    //CREATING TASKBAR/HEADBAR AND ITS BUTTONS AND INPUT-FIELD--------------------------

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
        } else {
            priv = false;
            sidemenu_private.removeChild(sidemenu_li);
            sidemenu_public.appendChild(sidemenu_li);
        }
    });



    //------------------------------

    var head_button = document.createElement('button');
    head_button.innerHTML = 'NEW TASK';
    //CLICK FUNCTION FOR ADDING TASKS
    head_button.addEventListener('click', function() {

        let value = document.getElementById(listName + "input").value;

        addTask(value);
    });

    var head_button_save = document.createElement('button');
    head_button_save.innerHTML = 'save';


    head_container.appendChild(head_input);
    head_container.appendChild(head_button);
    head_container.appendChild(head_toggle_box);
    head_container.appendChild(head_button_save);
    head.appendChild(head_container);



    /*-----Appending li to ul-----*/

    ul.appendChild(head);
    listContainer.appendChild(ul);


    /*------sending to db------*/
