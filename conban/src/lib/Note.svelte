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
  const initInput = (element) => {
    window.getSelection().selectAllChildren(element);
}
</script>

<div class="note"
  listId={listId}
  noteId={noteId}
  draggable={true}
  on:dragstart={handleDragStart}
  >
  <span style="color: gray; font-size: 0.8rem">=</span>
   <div contenteditable style="width: 95%; outline: 0px solid transparent;"
           bind:innerText={$boards[$activeBoardId].lists[listId].notes[noteId]}
           use:initInput />
<a href={null} on:click={deleteNote}>x</a>
</div>

