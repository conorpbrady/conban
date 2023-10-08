<script lang="ts">
  import Board from './lib/Board.svelte';
  import { boards, activeBoardId } from './lib/stores.js';

  const save = () => {
    localStorage.setItem('boardData', JSON.stringify($boards));
  }


  const load = () => {
    let boardObj = localStorage.getItem('boardData');
    $boards = JSON.parse(boardObj);
  }
</script>

<main>
  <button on:click={save}>Save</button>
  <button on:click={load}>Load</button>
  <Board />
</main>
