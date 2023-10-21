<script type="ts">
  export let messageType = "";
  export let messageContent = "";
  export let visible = false;

  import { fade } from "svelte/transition";
</script>

<div class={messageType} style="margin: 1em; height: 1em;">
  {#if visible}
    <p transition:fade class={messageType}>
      {messageContent}
    </p>
  {/if}
</div>
