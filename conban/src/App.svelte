<script lang="ts">
  import Board from "./lib/Board.svelte";
  import BoardMenu from "./lib/BoardMenu.svelte";
  import MainMenu from "./lib/MainMenu.svelte";
  import { boards, activeBoardId } from "./lib/stores.js";
  import Notification from "./lib/Notification.svelte";

  let messageType = "";
  let messageContent = "";
  let messageVisible = false;

  const importData = () => {
    let importNode = document.getElementById("importElement");
    importNode.click();

    importNode.addEventListener("change", () => {
      let file = importNode.files[0];
      //TODO: Verify the data is formatted correctly, throw an error if not
      file.text().then((importedData) => {
        $boards = JSON.parse(importedData);
      });
    });
  };

  const exportData = () => {
    let dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify($boards));
    let downloadNode = document.createElement("a");

    console.log(dataStr);
    console.log(dataStr.length);
    downloadNode.setAttribute("href", dataStr);
    downloadNode.setAttribute("download", "export.json");
    document.body.append(downloadNode);
    downloadNode.click();
    downloadNode.remove();
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

[warn] --jsx-bracket-same-line is deprecated. [warn] Ignored unknown option
--loglevel=error. Did you mean --log-level? [warn] Ignored unknown option
--stdin.
<svelte:head>
  <title>{$boards[$activeBoardId].name}</title>
</svelte:head>
<main>
  <!-- TODO: Refactor this. having to pass a leftOffset smells -->
  <MainMenu menuTitle="Menu" {save} {load} {exportData} {importData} />
  <BoardMenu menuTitle="Boards" leftOffset="6" />
  <Notification bind:visible={messageVisible} {messageType} {messageContent} />
  <Board />
  {#if $boards.lastSaved}
    <span>Last Saved: {$boards.lastSaved}</span>
  {/if}
  <input
    type="file"
    id="importElement"
    accept="text/json"
    style="display:none"
  />
</main>
