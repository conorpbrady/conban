<script lang="ts">
  export let text = '';
  let editable;
  let textAreaHeight = "1rem";

  const updateText = () => {
    editable = true;
}
  const toArea = () => {
    editable = false;
}

  const calcHeight = () => {
    let numberOfLines = (text.match(/\n/g)||[]).length
    textAreaHeight=`${numberOfLines + 2}rem`;
}
  const initInput = (element) => {
    calcHeight();
    element.focus();
}  
</script>
<style>
  textarea {
    height: var(--text-height);
  }
</style>

{#if editable }
  <textarea style="--text-height: {textAreaHeight}"
            on:input={calcHeight} on:blur={toArea} bind:value={text}
           use:initInput />
{:else}
  <div class="note-text" on:click={updateText}>{text}</div>
{/if}
