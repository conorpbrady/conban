<script lang="ts">
  import List from './List.svelte';
  import { boards, activeBoardId } from './stores.js';

  const addList = () =>  {
    const newListObj = {
      "name": "New List",
      "notes": []
    }
    $boards[$activeBoardId].lists.push(newListObj);
    $boards = $boards;
  };

  const dragStart = (event) => {
    const listIndex = data.detail.detail.listIndex;
    const noteIndex = data.detail.detail.noteIndex;

    const noteData = {listIndex, noteIndex}
    event.dataTransfer.setData('text/plain', JSON.stringify(data))
  }
</script>

<div class="status">
  {#if $boards[$activeBoardId].lastSaved != ''}
    <p>Last Saved: {$boards[$activeBoardId].lastSaved}</p>
  {/if}
</div>
<div class="menu">
<button on:click={addList}>New List</button>
</div>

<div class="board">
  <div class="board-header" contenteditable bind:innerText={$boards[$activeBoardId].name} >
  </div>
  <div class="board-body">
  {#each $boards[$activeBoardId].lists as list, index (index) }

<List id={index} />
{/each}
  </div>
</div>
