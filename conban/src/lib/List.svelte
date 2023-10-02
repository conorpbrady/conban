<script lang="ts">
  export let name = '';
  export let notes = [];
  export let listIndex = 0;

  import Note from './Note.svelte';
  import EditSpan from './EditSpan.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const noteDragStart = (data) => {
    dispatch('noteDragStart', data);
}
  const drop = (event) => {
    console.log(event);
}
  const addNote = () => {
    notes = [...notes, {'message': "I'm a note"}];
}
  const deleteNote = (index) => {
    notes.splice(index, 1);
    notes = notes;
}

</script>

<div class="list"
  on:drop={(e) => drop(e)}
>
<div class="list-header">
  <EditSpan bind:text={name} />
  <button class="add" on:click={addNote}>+</button>
</div>
<div class="list-body">
  {#each notes as note, i (i)}
    <Note {...note} bind:message={note.message}
    listIndex={listIndex}
    noteIndex={i}
    on:noteDragStart={noteDragStart}
    />
    <button on:click={() => deleteNote(i)}>x</button>
  {/each}
</div>
</div>
