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
</script>

<div class="menu">
<button on:click={addList}>New List</button>
</div>


<div class="board">
{#each lists as list, i (i)}
  <List {...list} bind:notes={list.notes} bind:name={list.name} />
  <button on:click={() => deleteList(i)}>x</button>
{/each}
</div>
