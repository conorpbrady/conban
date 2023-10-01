<script lang="ts">
  import List from './List.svelte';
  let lists = [
    {
    'name': 'List1',
    'notes': [{'message': 'hello'}]
    }
  ];
  const addList = () =>  {
    lists = [...lists, {'name': 'New List', notes: []}];
  };

  const deleteList = (index) => {
    lists.splice(index, 1);
    lists = lists;
}

    let hoveringOverList;
    const dragStart = (event, listIndex, noteIndex) => {

    const data = {listIndex, noteIndex}
    event.dataTransfer.setData('text/plain', JSON.stringify(data))
}

  const drop = (event, listIndex) => {
    event.preventDefault();
    const json = event.dataTransfer.getData('text/plain');
    const data = JSON.parse(json);

    const [item] = lists[data.listIndex].notes.splice(data.noteIndex, 1);
    lists[data.listIndex].notes.push(item);
    lists = lists;

    hoveringOverList = null;
}


</script>

<div class="menu">
<button on:click={addList}>New List</button>
</div>


<div class="board">
{#each lists as list, i (i)}
  <List {...list}
    bind:notes={list.notes}
    bind:name={list.name}
    on:noteDragStart={dragStart}
    on:dragenter={() => hoveringOverList = i}
    on:dragleave={() => hoveringOverList = null}
    on:drop={(event) => drop(event, i)}
  />
  <button on:click={() => deleteList(i)}>x</button>
{/each}
</div>
