<script lang="ts">
  import Board from "./lib/Board.svelte";
  import BoardMenu from "./lib/BoardMenu.svelte";
  import MainMenu from "./lib/MainMenu.svelte";
  import { boards, activeBoardId } from "./lib/stores.js";
  import Notification from "./lib/Notification.svelte";

  let messageType = "";
  let messageContent = "";
  let messageVisible = false;

  const closeDialog = () => {
    document.getElementById("delete-confirmation").close();
  };
  const showDialog = () => {
    document.getElementById("delete-confirmation").showModal();
  };
  const deleteBoard = () => {
    if ($boards.length == 1) {
      messageType = "warning";
      messageContent = "Cannot delete last board";
      closeDialog();
      messageVisible = true;
      setTimeout(() => (messageVisible = false), 2000);
      return;
    }
    try {
      let newBoardId = $activeBoardId - 1;
      if (newBoardId < 0) {
        newBoardId = 0;
      }
      $boards.splice($activeBoardId, 1);
      $boards = $boards;
      $activeBoardId = newBoardId;
      messageType = "success";
      messageContent = "Board deleted";
    } catch {
      messageType = "warning";
      messageContent = "Could not delete board";
    } finally {
      closeDialog();
      messageVisible = true;
      setTimeout(() => {
        messageVisible = false;
      }, 2000);
    }
  };
  const importData = () => {
    let importNode = document.getElementById("importElement");
    importNode.click();

    importNode.addEventListener("change", () => {
      let file = importNode.files[0];
      //TODO: Verify the data is formatted correctly, throw an error if not
      file.text().then((importedData) => {
        try {
          $boards = JSON.parse(importedData);
          messageType = "success";
          messageContent = "Imported Successfully";
        } catch {
          messageType = "warning";
          messageContent = "Import failed";
        } finally {
          messageVisible = true;
          setTimeout(() => (messageVisible = false), 2000);
        }
      });
    });
  };

  const exportData = () => {
    try {
      let dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify($boards));
      let downloadNode = document.createElement("a");

      downloadNode.setAttribute("href", dataStr);
      downloadNode.setAttribute("download", "export.json");
      document.body.append(downloadNode);
      downloadNode.click();
      downloadNode.remove();
      messageType = "success";
      messageContent = "Exported Successfully";
    } catch {
      messageType = "warning";
      messageContent = "Failed to Export";
    } finally {
      messageVisible = true;
      setTimeout(() => (messageVisible = false), 2000);
    }
  };
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
  <MainMenu menuTitle="Menu" {save} {load} {exportData} {importData} />
  <BoardMenu menuTitle="Boards" leftOffset="6" />
  <Notification bind:visible={messageVisible} {messageType} {messageContent} />
  <Board {showDialog} />
  {#if $boards.lastSaved}
    <span>Last Saved: {$boards.lastSaved}</span>
  {/if}
  <input
    type="file"
    id="importElement"
    accept="text/json"
    style="display:none"
  />
  <dialog id="delete-confirmation">
    <span>Are you sure you want to delete {$boards[$activeBoardId].name}?</span
    ><br /><br />
    <button on:click={deleteBoard}>Yes</button>
    <button on:click={closeDialog}>No</button>
  </dialog>
</main>
