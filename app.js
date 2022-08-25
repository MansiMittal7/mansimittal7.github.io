console.log("welcome to app.js");
showNotes();
// addind an event listener
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(e)
{
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    // notes get updated on clicking add it
    // updating local storage....notes ko jason.stringify kia
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // jab write up save ho jae uske baad text box apne aap firse blank ho jae
    console.log(notesObj);
    // notes is stored in the form of array
    showNotes();
    // calling this show notes to simultaneously add notes one after the other
})

// defining showNotes
// function to show write ups from local storage
function showNotes(){
     
let notes = localStorage.getItem("notes");
if(notes == null){
    notesObj = [];
}
else{
    notesObj = JSON.parse(notes);
}

// agar notes null hai toh blanck varna notesObj ko parse kar k save in the form of string
let html = "";
notesObj.forEach(function(element,index){
    html +=  `
    <div class="noteCard my-3 mx-3 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text"> ${element.text}</p>
                  <button id="" onclick="deleteNote(this.id)" class="btn btn-primary">Delete this</button>
                </div>
             </div> `;
   


});

let notesElm = document.getElementById('notes');

// agar notes empty nhi hai toh add it in html
// if blank thn display nothing to show

if(notesObj.length != 0){
    notesElm.innerHTML = html;
}
else{
    notesElm.innerHTML = `Start writing because...You can always edit a bad page. You can’t edit a blank page `
}


}

// on clicking the delete button the write must get deleted

function deleteNote(index){
    // give the index of array as input that needs to be deleted
    console.log('I am deleting',index);
    let notes = localStorage.getItem("notes");
if(notes == null){
    notesObj = [];
}
else{
    notesObj = JSON.parse(notes);
}
notesObj.splice(index, 1);
// removes that index from local strorage
localStorage.setItem("notes", JSON.stringify(notesObj));
showNotes();
// need to update local storage to delete the write-up
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    // input jab denge toh ye command execute hoga
    let inputVal = search.value.toLowerCase;
    console.log('Input event fired!',inputVal);
    let noteCards = document.getElementsByClassName('notecards');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementByTagName("p")[0].innerText;
        // console.log(cardTxt)
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }


    })


})