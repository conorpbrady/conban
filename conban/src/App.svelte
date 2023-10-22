<script lang="ts">
  import Board from "./lib/Board.svelte";
  import BoardMenu from "./lib/BoardMenu.svelte";
  import MainMenu from "./lib/MainMenu.svelte";
  import { boards, activeBoardId } from "./lib/stores.js";
  import Notification from "./lib/Notification.svelte";

  let messageType = "";
  let messageContent = "";
  let messageVisible = false;

  const save = () => {
    try {
      $boards.lastSaved = Date();
      localStorage.setItem("boardData", JSON.stringify($boards));
      messageType = "success";
      messageContent = "Saved Successfully";
    } catch {
      messageType = "warning";
      messageContent = "Could not save";
    } finally {
      messageVisible = true;
      setTimeout(() => (messageVisible = false), 2000);
    }
  };

  const load = () => {
    try {
      let boardObj = localStorage.getItem("boardData");
      $boards = JSON.parse(boardObj);
      messageType = "success";
      messageContent = "Load Succesful";
    } catch {
      messageType = "warning";
      messageContent = "Could not load";
    } finally {
      messageVisible = true;
      setTimeout(() => (messageVisible = false), 2000);
    }
  };
</script>

<svelte:head>
  <title>{$boards[$activeBoardId].name}</title>
</svelte:head>
<main>
  <!-- TODO: Refactor this. having to pass a leftOffset smells -->
  <MainMenu menuTitle="Menu" {save} {load} />
  <BoardMenu menuTitle="Boards" leftOffset="6" />
  <Notification bind:visible={messageVisible} {messageType} {messageContent} />
  <Board />
  {#if $boards.lastSaved}
    <span>Last Saved: {$boards.lastSaved}</span>
  {/if}
</main>
