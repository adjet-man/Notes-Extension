document.addEventListener("DOMContentLoaded", function () {
    const noteInput = document.getElementById("note-input");
    const addNoteButton = document.getElementById("add-note");
    const notesList = document.getElementById("notes-list");
  
    chrome.storage.sync.get("notes", function (data) {
      if (data.notes) {
        data.notes.forEach((note) => {
          appendNoteToList(note);
        });
      }
    });
  
    addNoteButton.addEventListener("click", function () {
      const newNote = noteInput.value.trim();
      if (newNote !== "") {
        chrome.storage.sync.get("notes", function (data) {
          const notes = data.notes || [];
          notes.push(newNote);
  
          chrome.storage.sync.set({ notes: notes }, function () {
            appendNoteToList(newNote);
            noteInput.value = "";
          });
        });
      }
    });
  
    function appendNoteToList(noteText) {
      const listItem = document.createElement("li");
      listItem.textContent = noteText;
      notesList.appendChild(listItem);
    }
  });
  