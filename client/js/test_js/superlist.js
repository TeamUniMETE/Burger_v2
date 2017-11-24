// the superList factory =====================================
function superlist() {

    var ul = document.createElement("ul");    
    ul.classList.add("superListStyle");
    ul.id = "myList";
    
    ul.selected = undefined;
    ul.showSelected = true;

    // addElement -------------------------------------
    ul.addElement = function(label, value) {
        var li = document.createElement("li");
        li.val = value;
        li.id = "listItem";
        li.innerHTML = label;
        li.onclick = liClick;
        ul.appendChild(li);
        return li;
    }
    
    // fillFromArray ----------------------------------
    ul.fillFromArray = function(arr) {
        
        for (var i = 0; i < arr.length; i++) {            
            var li = document.createElement("li");
            li.val = i;
            li.innerHTML = arr[i];
            li.onclick = liClick;
            ul.appendChild(li); 
        }       
    }
    
    // removeElement ----------------------------------
    ul.removeElement = function(elm) {
        if (this.selected === elm) {
            this.selected = undefined;
        }
        this.removeChild(elm);     
    }
    
    // removeElementAt --------------------------------
    ul.removeElementAt = function(index) {        
        var elm = ul.children.item(index);
        if (this.selected === elm) {
            this.selected = undefined;
        }
        this.removeChild(elm);     
    }
    
    // removeAll --------------------------------------
    ul.removeAll = function() {        
        this.selected = undefined;
        ul.innerHTML = "";     
    }
    
    // selectElement ----------------------------------
    ul.selectElement = function(elm) {        
        setSelected(elm);       
    }
    
    // selectElementAt --------------------------------
    ul.selectElementAt = function(index) {        
        var elm = this.children.item(index);        
        setSelected(elm);       
    }
    
    // getLength --------------------------------------
    ul.getLength = function() {        
        return this.childElementCount;       
    }
    
    // getElementIndex --------------------------------
    ul.getElementIndex = function(elm) {        
        var childrenArr = Array.from(this.children);        
        return childrenArr.indexOf(elm);              
    } 
    
    // liClick ----------------------------------------
    function liClick(evt) {
        setSelected(evt.currentTarget);                
    }
    
    //setSelected -------------------------------------
    function setSelected(selected) {
        
        ul.selected = selected;
        
        //change appearance
        if (ul.showSelected) {
            clearSelected();
            ul.selected.classList.add("selected");
        }        
        
        //create an event object        
        var event = new Event("change");
        
        //fill in some data (nice to have)
        event.selectedElement = ul.selected;
        event.selectedValue = ul.selected.val;
        
        //send the event
        ul.dispatchEvent(event);        
    }
    
    // clearSelected ----------------------------------
    function clearSelected() {
        
        //retrieve all the li-elements and remove CSS class
        var elm = ul.querySelectorAll(".superListStyle>li");
        for (var i = 0; i < elm.length; i++) {
            elm[i].classList.remove("selected");
        }
    } 

    return ul;      
}
    
// end factory ===============================================