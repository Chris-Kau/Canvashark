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
      dragElement(stickyNote, stickyNoteHeader)
}
function dragElement(elmnt, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}