<script lang="ts">
  import EditSpan from './EditSpan.svelte';
  import { createEventDispatcher } from 'svelte';

  export let message = '';
  export let listIndex = 0;
  export let noteIndex = 0;

  const dispatch = createEventDispatcher();

  const noteDragStart = (event, listIndex, noteIndex) => {
    let data = {
      'event': event,
      'listIndex': listIndex,
      'noteIndex': noteIndex
}
    dispatch('noteDragStart', data);
  }
</script>

<div class="note"
  draggable={true}
  on:dragstart={(event) => noteDragStart(event, listIndex, noteIndex)}
>
<EditSpan bind:text={message} />
</div>
