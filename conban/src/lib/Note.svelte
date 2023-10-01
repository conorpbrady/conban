<script lang="ts">
  import EditSpan from './EditSpan.svelte';
  export let message = '';
</script>

<div class="note">
  <EditSpan bind:text={message} />
</div>
