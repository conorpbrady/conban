<script lang="ts">
  export const noteId = 0;
  export const listId = 0;
  export let text = '';
  let editable = false

  import { boards, activeBoardId} from './stores.js';

  const updateText = (event) => {
    editable = true;

}
  const toSpan = (event) => {
    event.preventDefault();
    editable = false;
}

  const initInput = (element) => {
    element.focus();
}
  //let text = $boards[$activeBoardId].lists[listId].notes[noteId];
</script>

{#if editable }
  <form on:submit={toSpan}>
    <input type="text" use:initInput on:blur={toSpan} bind:value={text}>
  </form>
{:else}
<span on:click={updateText}>{text}</span>
{/if}
