<script lang="ts">
  export let text = '';
  let editable;
  let textAreaHeight = "1rem";

  const initInput = (element) => {
    element.focus();
}  
</script>
<style>
</style>

  <div contenteditable style="width: 95%; outline: 0px solid transparent;"
           bind:innerText={text}
           use:initInput />
