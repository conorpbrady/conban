<script lang="ts">
  import { slide } from "svelte/transition";
  import { boards, activeBoardId } from "./stores.js";
  export let menuTitle = "";
  export let leftOffset = "0";
  let menuExpanded = false;

  const triggerMenu = () => {
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

<nav
  style="margin-left: {leftOffset}em;"
  on:mouseenter={triggerMenu}
  on:mouseleave={triggerMenu}
  class="menu"
>
  <a href={null}>{menuTitle}</a>
  {#if menuExpanded}
    <ul transition:slide class="nav-menu">
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
