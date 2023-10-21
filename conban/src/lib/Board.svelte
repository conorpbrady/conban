<script lang="ts">
  import List from './List.svelte';
  import { boards, activeBoardId } from './stores.js';
  import { slide } from 'svelte/transition';

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

  let menuExpanded = false;

  const expandMenu = () => {
    menuExpanded = !menuExpanded
  }
</script>

<div class="board">
  <div class="board-header">
    <div class="board-name" contenteditable bind:innerText={$boards[$activeBoardId].name}></div>
    <a href={null} on:click={addList}>New List</a>
     | <a href={null}>Delete Board</a>
  </div>
  <div class="board-body">
  {#each $boards[$activeBoardId].lists as list, index (index) }

<List id={index} />
{/each}
  </div>
</div>
