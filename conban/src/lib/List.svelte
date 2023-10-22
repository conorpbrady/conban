<script lang="ts">
  export let id = 0;

  import Note from "./Note.svelte";
  import { boards, activeBoardId } from "./stores.js";

  const handleDrop = (event) => {
    event.preventDefault();
    const listId = event.dataTransfer.getData("listId");
    const noteId = event.dataTransfer.getData("noteId");

    const note = $boards[$activeBoardId].lists[listId].notes[noteId];
    $boards[$activeBoardId].lists[listId].notes.splice(noteId, 1);
    $boards[$activeBoardId].lists[id].notes.push(note);
    $boards = $boards;
  };
  const addNote = () => {
    $boards[$activeBoardId].lists[id].notes.push("New Note");
    $boards = $boards;
  };
  const deleteList = (index) => {
    $boards[$activeBoardId].lists.splice(index, 1);
    $boards = $boards;
  };
  const focus = (element) => {
    if (element.innerText == "New List") {
      window.getSelection().selectAllChildren(element);
    }
  };
</script>

<div class="list" on:drop={handleDrop} ondragover="return false">
  <div class="list-header">
    <span class="note-control">=</span>
    <div
      contenteditable
      bind:innerText={$boards[$activeBoardId].lists[id].name}
      style="width: 75%;"
      class="note-name"
      use:focus
    />
    <span>
      <a href={null} class="add" on:click={addNote}>+</a>
      <a href={null} class="add" on:click={() => deleteList(id)}>x</a>
    </span>
  </div>
  <div class="list-body">
    {#each $boards[$activeBoardId].lists[id].notes as _, index (index)}
      <Note noteId={index} listId={id} />
    {/each}
  </div>
</div>
