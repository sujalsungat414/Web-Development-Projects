(function () {
  // Grabbing DOM elements once for efficiency
  const form = document.getElementById("note-form");
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");
  const notesList = document.getElementById("notes-list");

  // Load existing notes from localStorage or initialize empty array
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Function to render notes on the page dynamically
  function renderNotes() {
    notesList.innerHTML = ""; // Clear current notes display
    if (notes.length === 0) {
      // Display friendly message if no notes exist
      notesList.innerHTML =
        '<p style="color:#666; font-style:italic;">No notes yet. Add one above!</p>';
      return;
    }
    // Loop through notes and create HTML elements
    notes.forEach((note, index) => {
      const noteEl = document.createElement("article");
      noteEl.className = "note";

      const titleEl = document.createElement("h2");
      titleEl.className = "note-title";
      titleEl.textContent = note.title || "(No title)"; // Show title or fallback text

      const contentEl = document.createElement("p");
      contentEl.className = "note-content";
      contentEl.textContent = note.content;

      // Create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.setAttribute(
        "aria-label",
        "Delete note " + (note.title || "untitled")
      );
      deleteBtn.textContent = "×";

      // Add click event to delete this note
      deleteBtn.onclick = function () {
        deleteNote(index);
      };

      // Append delete button, title, and content to note container
      noteEl.appendChild(deleteBtn);
      noteEl.appendChild(titleEl);
      noteEl.appendChild(contentEl);
      notesList.appendChild(noteEl);
    });
  }

  // Save notes array to localStorage for persistence
  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Add a new note to the notes array, save, and re-render
  function addNote(title, content) {
    notes.unshift({ title, content }); // Add to beginning for newest first
    saveNotes();
    renderNotes();
  }

  // Delete note at given index, save changes, then re-render
  function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }

  // Event handler for form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default HTML form submit behavior
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // Simple validation to ensure content is not empty
    if (content.length === 0) {
      alert("Please enter some content for the note.");
      return;
    }

    // Add new note and reset form
    addNote(title, content);
    form.reset();
    titleInput.focus(); // Put cursor back to title field for convenience
  });

  // Initially render any saved notes
  renderNotes();
})();
