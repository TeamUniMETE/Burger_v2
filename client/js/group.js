var groupName;
var priv;


function addGroup() {
    var txt;
    groupName = prompt("Group name", "");
    if(groupName == null || groupName == ""){
        alert("no name. Try again - No Group made");
    }else{
        if (confirm("private board? OK = JA : AVBRYT = NEI") == true) {
            priv = true;
            createGroup(groupName, priv)
        } else {
            priv = false;
            createGroup(groupName, priv)
        }

    }
}


function createGroup(name, boolean){
    var priv = boolean;

    var groupContainer = document.getElementById('groupContainer');
    var groupNameTxt = document.getElementById('groupNameTxt');
    var privContainer = document.getElementById('private');
    var shareContainer = document.getElementById('shareable');

//-----*-----

    var sLiDiv = document.createElement('div');
    sLiDiv.id = name;

    var sLi = document.createElement('li');
    sLi.innerHTML = name;
    sLi.id = name;

    //Sidemenu board onclick--retrieves the id of the board
    sLi.addEventListener('click', function(e){

        let boardId = e.target.id;
        var url = 'http://localhost:3000/users/getboard';

        let upload = JSON.stringify({
            board_id: boardId
        });

        let cfg = {
            method: "POST",
            body: upload
        }

        superfetch(url, "json", succ, error, cfg);
    });

    sLi.appendChild(sLiDiv);

    if (priv == true) {
        privContainer.appendChild(sLi);
    } else {
        shareContainer.appendChild(sLi);
    }
//-----*-----
    groupNameTxt.innerHTML = name + " board";

    var ul = document.createElement('ul');
    var groupLi = document.createElement('li');
    var widgetLi = document.createElement('li');

    //buttons and input for widgetLi

    var newTask = document.createElement('li');
    var div = document.createElement('div');

    var input = document.createElement('input');
    input.id = "input";

    var button = document.createElement('button');

    button.innerHTML = "new task";
    button.id = name;

    button.onclick = function() {
        var value = document.getElementById('input').value;
        if(value){
            createTask(value, name);
        }else{
            console.log("There was NO value");
        }
    };

    div.appendChild(input);
    div.appendChild(button);
    newTask.appendChild(div);

    ul.classList.add('group');
    ul.id = name + "task";

    if(priv == false) {
        groupLi.innerHTML = name + " - Shareable";
    } else {
        groupLi.innerHTML = name + " - Private";
    }


    ul.appendChild(groupLi);
    ul.appendChild(newTask);
    groupContainer.appendChild(ul);

}
