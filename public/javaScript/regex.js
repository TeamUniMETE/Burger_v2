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
