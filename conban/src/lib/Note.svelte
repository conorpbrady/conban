<script lang="ts">
  import EditSpan from './EditSpan.svelte';
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
</script>

<div class="note"
  listId={listId}
  noteId={noteId}
  draggable={true}
  on:dragstart={handleDragStart}
>
<EditSpan bind:text={$boards[$activeBoardId].lists[listId].notes[noteId]} />
<a href={null} on:click={deleteNote}>x</a>
</div>

