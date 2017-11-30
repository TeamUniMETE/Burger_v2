var regex_nr_char = /^[0-9æøåÆØÅa-zA-Z]+$/;
var regex_nr_char_space = /^[0-9æøåÆØÅa-zA-Z\s]+$/;
var regex_char_space = /^[æøåÆØÅa-zA-Z\s]+$/;

function regexNumChar(value){
    if(regex_nr_char.test(value)){
        return false;
    }else{
        return true;
    }
};

function regexCharSpace(value){
    if(regex_char_space.test(value)){
        return false;
    }else {
        return true;
    }
}
function regexNumCharSpace(value){
    if(regex_nr_char_space.test(value)){
        return false;
    }else {
        return true;

    }
}


//REMOVE

function remove_task(taskId, listId) {

    let token = JSON.parse(localStorage.getItem('logindata')).token;
    //let url = 'http://localhost:3000/tasks/task?taskid=' + taskId + '&listid=' + listId + '&token=' + token;
    let url = 'https://burgerapplication.herokuapp.com/tasks/task?taskid=' + taskId + '&listid=' + listId + '&token=' + token;
    let cfg = {
        method: 'DELETE'
    }

    superfetch(url, 'json', remove_task_succ, remove_task_error, cfg);
}

function remove_task_succ(data){
    console.log(data);
}

function remove_task_error(err){
    console.log(err);
}

function remove_list(listId) {

    let token = JSON.parse(localStorage.getItem('logindata')).token;

    //let url = 'http://localhost:3000/lists/list?listid=' + listId + '&token=' + token;
    let url = 'https://burgerapplication.herokuapp.com/lists/list?listid=' + listId + '&token=' + token;

    var cfg = {
        method: 'DELETE'
    }

    superfetch(url, 'json', remove_list_succ, remove_list_error, cfg);

}

function remove_list_succ(data){
    console.log(data);
}

function remove_list_error(err){
    console.log(err);
}
