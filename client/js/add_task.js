function addTask(value) {

    if (value == "") {
        alert("There was no value");
    } else {
        createTask(value);
    }
};

function createTask(value) {

    var taskContainer = document.getElementById(listName);

    //TASKCONTAINER
    var task = document.createElement('li');
    task.classList = "li_task neutral";

    var task_container = document.createElement('div');
    var task_toggle = document.createElement('input');
    var task_name = document.createElement('h1');
    var task_date = document.createElement('input');
    var task_select = document.createElement('select');

    var options = {
        priority1: 'low',
        priority2: 'medium',
        priority3: 'high'
    };

    Object.size = function(obj) {
        var size = 0, key;
        for(key in obj) {
            if(obj.hasOwnProperty(key)) size++;
        }
        return size;
    }

    var size = Object.size(options);


    //OPTIONS
    /*
    var option_1 = document.createElement('option');
    option_1.id = value + 'option';
    option_1.innerHTML = "high";
    var option_2 = document.createElement('option');
    option_2.id = value + 'option';
    option_2.innerHTML = "medium";
    var option_3 = document.createElement('option');
    option_3.id = value + 'option';
    option_3.innerHTML = "low";
*/

    //ADDING ATTRIBUTES
    task_toggle.type = "checkbox";
    task_toggle.classList = 'task_buttons';

    task_date.type = "date";
    task_name.innerHTML = value;

    //APPENDING CHILDS

    //task SELECT
    /*
    task_select.appendChild(option_1);
    task_select.appendChild(option_2);
    task_select.appendChild(option_3);
    */

    task_container.appendChild(task_name);
    task_container.appendChild(task_toggle);
    task_container.appendChild(task_date);
    task_container.appendChild(task_select);
    task.appendChild(task_container);


    taskContainer.insertBefore(task, taskContainer.childNodes[1]);


    //CLICK FUNCTION FOR LI; CHECKED OF UNCHECKED
    task_toggle.addEventListener('click', function(evt) {
        let item = task_toggle.parentNode.parentNode;
        item.classList.toggle('completed');
    });
}
