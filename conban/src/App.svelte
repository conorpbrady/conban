<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import Board from './lib/Board.svelte';
  import { boards, activeBoardId } from './lib/stores.js';
  import Notification from './lib/Notification.svelte';


  let menuExpanded = false;

  const expandMenu = () => {
    menuExpanded = !menuExpanded;
  }


  let messageType = '';
  let messageContent = '';
  let messageVisible = false;

  
  const save = () => {
    try {
      $boards.lastSaved = Date();
      localStorage.setItem('boardData', JSON.stringify($boards));
      messageType = 'success'
      messageContent = 'Saved Successfully'
  } catch {
      messageType = 'warning'
      messageContent = 'Could not save'
  } finally {
      messageVisible = true;
      setTimeout(() => messageVisible = false, 2000);
}
}

  const load = () => {
    try {
    let boardObj = localStorage.getItem('boardData');
    $boards = JSON.parse(boardObj);
    messageType = 'success';
    messageContent = 'Load Succesful';
} catch {
    messageType = 'warning';
    messageContent = 'Could not load';
} finally {
    visible = true;
    setTimeout(() => visible = false, 2000);
}
  }

  const newBoard = () => {
    const initObj = {
      'name': 'New Board',
      'lists': [
        {
          'name': 'List 1',
          'notes': [
            'Note 1',
            'Note 2'
            ]
        }
        ]
      }
    $boards.push(initObj);
    $boards = $boards;
    $activeBoardId = $boards.length - 1;
  }

  const switchBoard = (boardId) => {
    $activeBoardId = boardId;
  }

  const boardItems = $boards.map((item) => item.name);

</script>
<svelte:head>
  <title>{$boards[$activeBoardId].name}</title>
</svelte:head>
<main>
  <nav on:mouseenter={expandMenu} on:mouseleave={expandMenu} class="menu">
    <a href={null}>Menu</a>
    {#if menuExpanded}
      <ul transition:slide class="nav-menu">
        <li>
          <a href={null} on:click={save}>Save</a>
        </li>
        <li>
          <a href={null} on:click={load}>Load</a>
        </li>
        <li>
          Select Board
        </li>
        {#each $boards as board, index (index)}
          <li><a href={null} on:click={() => switchBoard(index)}>{board.name}</a></li>
        {/each}
        <li>---</li>
        <li>
          <a href={null} on:click={newBoard}>New Board</a>
        </li>
      </ul>
    {/if}
  </nav>
  <Notification bind:visible={messageVisible} messageType={messageType} messageContent={messageContent} />
  <Board />
  {#if $boards.lastSaved}
  <span>Last Saved: {$boards.lastSaved}</span>
  {/if}
</main>
