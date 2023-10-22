<script lang="ts">
  import List from "./List.svelte";
  import { boards, activeBoardId } from "./stores.js";

  const addList = () => {
    const newListObj = {
      name: "New List",
      notes: [],
    };
    $boards[$activeBoardId].lists.push(newListObj);
    $boards = $boards;
  };
</script>

<div class="board">
  <div class="board-header">
    <div class="board-corner"></div>
    <div
      class="board-name"
      contenteditable
      bind:innerText={$boards[$activeBoardId].name}
    ></div>
    <div class="board-corner">
      <a href={null} on:click={addList}>New List</a>
      | <a href={null}>Delete Board</a>
    </div>
  </div>
  <div class="board-body">
    {#each $boards[$activeBoardId].lists as _, index (index)}
      <List id={index} />
    {/each}
  </div>
</div>
