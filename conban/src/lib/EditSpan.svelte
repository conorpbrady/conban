<script lang="ts">
  export const noteId = 0;
  export const listId = 0;
  export let text = '';
  let editable = false

  import { boards, activeBoardId} from './stores.js';

  const updateText = () => {
    editable = true;
}
  const toSpan = () => {
    editable = false;
}
  //let text = $boards[$activeBoardId].lists[listId].notes[noteId];
</script>

{#if editable }
<input type="text" on:blur={toSpan} bind:value={text}>
{:else}
<span on:click={updateText}>{text}</span>
{/if}
