var inpDate = document.getElementById("inpDate");
var btn = document.getElementById("btn");
var outText = document.getElementById("outText");


var mylist = superlist();
document.getElementById("myList").appendChild(mylist);

// Create a "close" button and append it to each list item
var i;
for (i = 0; i < mylist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  mylist[i].appendChild(span);

}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var j;
for (j = 0; j < close.length; j++) {
  close[j].onclick = function() {
    var div = this.parentElement;
    //div.style.display = "none";
    mylist.removeChild(div);
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

var title = myInput.value;

// Create a new list item when clicking on the "Add" button
function addToList() {
  //var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  //var t = document.createTextNode(inputValue);
  //li.appendChild(t);

  var html = `<span class="up" href="#" onclick="MoveItem(this.parentNode, 1)"> ^ </span>
              <span class="down" href="#" onclick="MoveItem(this.parentNode, -1)"> v </span>
              <h3>${myInput.value}</h3>
              <textarea placeholder="Comment..."></textarea>
              <input type="date" id="inpDate" placeholder="Enter a year" >
              <select id="priority" class="prio" onchange="setPriority(this)">
                  <option value="0">No priority</option>
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
              </select>
              <span class="close">x<span>`;

  if (inputValue === '') {
    alert("You must write something!");
  } else {
      document.getElementById("myInput").value = "";

      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      //li.appendChild(span);
      myList.addElement(html)
  }

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
        console.log(div);
      //div.style.display = "none";
      mylist.removeChild(div);
    }
  }
}


function setPriority(priority){
    console.log(priority);
    console.log(priority.value);
    console.log(priority.parentElement);
    if (priority.value == 0){
        priority.parentElement.className = "";
    }
    if (priority.value == 1){
        priority.parentElement.className = " high";
    }
    else if (priority.value == 2){
        priority.parentElement.className = " medium";
    }
    else if (priority.value == 3){
        priority.parentElement.className = " low";
    }
}


function MoveItem(item, direction) {

    if (direction == 1){
        if(item.previousSibling != null){
            var prev = item.previousSibling;
            item.parentNode.insertBefore(item, prev);
        }
    }
    else if(direction == -1){
        if(item.nextSibling != null){
            var next = item.nextSibling.nextSibling;
            item.parentNode.insertBefore(item, next);
        }
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
