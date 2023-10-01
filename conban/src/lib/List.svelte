<script lang="ts">
  export let name = '';
  export let notes = [];
  export let listIndex = 0;

  import Note from './Note.svelte';
  import EditSpan from './EditSpan.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const noteDragStart = () => {
    dispatch('noteDragStart');
}
  const addNote = () => {
    notes = [...notes, {'message': "I'm a note"}];
}
  const deleteNote = (index) => {
    notes.splice(index, 1);
    notes = notes;
}

</script>

<div class="list">
<div class="list-header">
  <EditSpan bind:text={name} />
  <button class="add" on:click={addNote}>+</button>
</div>
<div class="list-body">
  {#each notes as note, i (i)}
    <Note {...note} bind:message={note.message}
    draggable={true}
    on:dragstart={(event) => noteDragStart(event, listIndex, i) }/>
    <button on:click={() => deleteNote(i)}>x</button>
  {/each}
</div>
</div>
