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
</script>
<svelte:head>
  <title>{$boards[$activeBoardId].name}</title>
</svelte:head>
<main>
  <Notification bind:visible={visible} messageType={messageType} messageContent={messageContent} />
  <button on:click={save}>Save</button>
  <button on:click={load}>Load</button>
  <Board />
</main>
