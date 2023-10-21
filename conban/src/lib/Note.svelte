<script lang="ts">
  import { boards, activeBoardId } from './stores.js';

  export let listId = 0;
  export let noteId = 0;

  const handleDragStart = (event) => {
    let listId = event.target.getAttribute('listId');
    let noteId = event.target.getAttribute('noteId');
    event.dataTransfer.setData('listId', listId);
    event.dataTransfer.setData('noteId', noteId);
  }

  const deleteNote = () => {
    $boards[$activeBoardId].lists[listId].notes.splice(noteId, 1);
    $boards = $boards;
}
  const focus = (element) => {
    if(element.innerText == "New Note") {
    window.getSelection().selectAllChildren(element);
    }
}
</script>

<div class="note"
  listId={listId}
  noteId={noteId}
  draggable={true}
  on:dragstart={handleDragStart}
  >
  <span class="note-control">=</span>
  <div contenteditable 
       class="note-text"
           bind:innerText={$boards[$activeBoardId].lists[listId].notes[noteId]}
           use:focus />
  <a href={null} on:click={deleteNote} class="note-control">x</a>
</div>

