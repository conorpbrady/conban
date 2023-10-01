<script lang="ts">
  export let name = '';
  export let notes = [];
  import Note from './Note.svelte';
  import EditSpan from './EditSpan.svelte'

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
    <Note {...note} bind:message={note.message} />
    <button on:click={() => deleteNote(i)}>x</button>
  {/each}
</div>
</div>
