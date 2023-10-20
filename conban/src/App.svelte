<script lang="ts">
  import { fade } from 'svelte/transition';
  import Board from './lib/Board.svelte';
  import { boards, activeBoardId } from './lib/stores.js';
  import Notification from './lib/Notification.svelte';

  let messageType = '';
  let messageContent = '';
  let visible = false;

  const save = () => {
    try {
      $boards[$activeBoardId].lastSaved = Date();
      localStorage.setItem('boardData', JSON.stringify($boards));
      messageType = 'success'
      messageContent = 'Saved Successfully'
  } catch {
      messageType = 'warning'
      messageContent = 'Could not save'
  } finally {
      visible = true;
      setTimeout(() => visible = false, 2000);
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
  <Notification bind:visible={visible} messageType={messageType} messageContent={messageContent} />
  <button on:click={save}>Save</button>
  <button on:click={load}>Load</button>
  <br>
  <br>
  <select bind:value={$activeBoardId}>
    {#each $boards as item, index (index)}
      <option value={index}>{item.name}</option>
    {/each}
  </select>
  <br>
  <br>
  <a href={null} on:click={newBoard}>New Board</a>
  <Board />
</main>
