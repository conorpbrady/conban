<script lang="ts">
  export let text = '';
  let editable = false

  const updateText = () => {
    editable = true;
}
  const toSpan = () => {
    editable = false;
}

</script>

{#if editable }
<input type="text" bind:value={text} on:blur={toSpan}>
{:else}
<span on:click={updateText}>{text}</span>
{/if}
