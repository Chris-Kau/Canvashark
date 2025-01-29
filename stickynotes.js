function openStickyNoteModal() {
    document.getElementById("stickyNoteModal").style.display = "block";
}
function closeStickyNoteModal() {
    document.getElementById("stickyNoteModal").style.display = "none";
}
var existingStickyNotes = {}
document.addEventListener("DOMContentLoaded", function (){
    if(!localStorage.getItem("stickyNotes")){
        localStorage.setItem("stickyNotes", []);
    }else{
        let stickyNotes = JSON.parse(localStorage.getItem("stickyNotes"))
        for(var i in stickyNotes){
            createStickyNote(stickyNotes[i][0],stickyNotes[i][1],stickyNotes[i][2],stickyNotes[i][3],stickyNotes[i][4])
        }
    }
});

function createStickyNote(color, X = 0, Y = 0, description = '', id = ''){
    const stickyNote = document.createElement('div');
    stickyNote.id = id || ('stickyNote' + Date.now().toString());
    stickyNote.className = 'stickyNote'

    const stickyNoteHeader = document.createElement('div');
    stickyNoteHeader.id = 'stickyNoteHeader';
    stickyNoteHeader.innerHTML = `=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sticky Note`;
    const closeButton = document.createElement('span');
    closeButton.id = 'closeButton';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        stickyNote.remove();
        delete existingStickyNotes[stickyNote.id]
        localStorage.setItem("stickyNotes", JSON.stringify(existingStickyNotes))
    };

    stickyNoteHeader.appendChild(closeButton);
    stickyNote.appendChild(stickyNoteHeader);
    
    const stickyNoteInput = document.createElement('div');
    stickyNoteInput.id = 'stickyNoteInput';
    const stickyTextArea = document.createElement('textarea');
    stickyTextArea.id = 'stickyTextArea';
    stickyTextArea.innerText = description
    stickyTextArea.onkeyup = function(){
        existingStickyNotes[stickyNote.id] = [color, stickyNote.style.left, stickyNote.style.top, stickyTextArea.value, stickyNote.id];
        localStorage.setItem("stickyNotes", JSON.stringify(existingStickyNotes));
    }

    stickyNoteInput.appendChild(stickyTextArea);
    stickyNote.appendChild(stickyNoteInput);

    stickyNoteHeader.style.backgroundColor = color;
    stickyNote.style.backgroundColor = color;
    
    document.getElementById('stickyNotesContainer').appendChild(stickyNote);
    //Move to sticky note to the default position
    stickyNote.style.left = X;
    stickyNote.style.top = Y;
    existingStickyNotes[stickyNote.id] = [color, stickyNote.style.left, stickyNote.style.top, stickyTextArea.value, stickyNote.id];
    localStorage.setItem("stickyNotes", JSON.stringify(existingStickyNotes));
    //Logic for dragging Sticky note around
    let offsetX, offsetY;
    const move = (e) =>{
        //updating the position of the sticky note based off the mouse position
        stickyNote.style.left = `${e.clientX - offsetX}px`;
        stickyNote.style.top = `${e.clientY - offsetY}px`;

    }
    stickyNoteHeader.addEventListener("mousedown", (e) =>{
        //calculate offset values
        offsetX = e.clientX - stickyNote.offsetLeft;
        offsetY = e.clientY - stickyNote.offsetTop;
        document.addEventListener("mousemove", move)
    });

    document.addEventListener("mouseup", ()=>{
        //stop dragging the sticky note when we let go of left click
        document.removeEventListener("mousemove", move);
        //store position and text contents here!!!
        existingStickyNotes[stickyNote.id] = [color, stickyNote.style.left, stickyNote.style.top, stickyTextArea.value, stickyNote.id]
        localStorage.setItem("stickyNotes", JSON.stringify(existingStickyNotes))
    });
}