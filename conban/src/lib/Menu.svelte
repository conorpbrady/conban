<script lang="ts">
  import { slide } from "svelte/transition";
  import { boards, activeBoardId } from "./lib/stores.js";

  let menuExpanded = false;

  const expandMenu = () => {
    menuExpanded = !menuExpanded;
  };

  const newBoard = () => {
    const initObj = {
      name: "New Board",
      lists: [
        {
          name: "List 1",
          notes: ["Note 1", "Note 2"],
        },
      ],
    };
    $boards.push(initObj);
    $boards = $boards;
    $activeBoardId = $boards.length - 1;
  };

  const switchBoard = (boardId) => {
    $activeBoardId = boardId;
  };
</script>

<nav on:mouseenter={expandMenu} on:mouseleave={expandMenu} class="menu">
  <a href={null}>Menu</a>
  {#if menuExpanded}
    <ul transition:slide class="nav-menu">
      <li>
        <a href={null} on:click={save}>Save</a>
      </li>
      <li style="border-bottom: 1px solid gray;">
        <a href={null} on:click={load}>Load</a>
      </li>
      {#each $boards as board, index (index)}
        <li>
          <a href={null} on:click={() => switchBoard(index)}>{board.name}</a>
        </li>
      {/each}
      <li style="border-top: 1px solid gray;">
        <a href={null} on:click={newBoard}>New Board</a>
      </li>
    </ul>
  {/if}
</nav>
