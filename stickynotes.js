function openStickyNoteModal() {
    document.getElementById("stickyNoteModal").style.display = "block";
}
function closeStickyNoteModal() {
    document.getElementById("stickyNoteModal").style.display = "none";
}

function createStickyNote(color){
    const stickyNote = document.createElement('div');
    stickyNote.id = 'stickyNote';

    const stickyNoteHeader = document.createElement('div');
    stickyNoteHeader.id = 'stickyNoteHeader';
    stickyNoteHeader.innerHTML = `=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sticky Note`;
    const closeButton = document.createElement('span');
    closeButton.id = 'closeButton';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        stickyNote.remove();
    };

    stickyNoteHeader.appendChild(closeButton);
    stickyNote.appendChild(stickyNoteHeader);
    
    const stickyNoteInput = document.createElement('div');
    stickyNoteInput.id = 'stickyNoteInput';
    const stickyTextArea = document.createElement('textarea');
    stickyTextArea.id = 'stickyTextArea';
    stickyNoteInput.appendChild(stickyTextArea);
    stickyNote.appendChild(stickyNoteInput);

    stickyNoteHeader.style.backgroundColor = color;
    stickyNote.style.backgroundColor = color;
    
    document.getElementById('stickyNotesContainer').appendChild(stickyNote);
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
        console.log(stickyNote.style.left)
        console.log(stickyNote.style.top)
    });
}