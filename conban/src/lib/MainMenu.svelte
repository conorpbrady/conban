<script lang="ts">
  import { slide } from "svelte/transition";
  export let save;
  export let load;
  export let menuTitle = "";
  export let exportData;
  export let importData;

  let menuExpanded = false;

  const triggerMenu = () => {
    menuExpanded = !menuExpanded;
  };
</script>

<nav on:mouseenter={triggerMenu} on:mouseleave={triggerMenu} class="menu">
  <a href={null}>{menuTitle}</a>
  {#if menuExpanded}
    <ul transition:slide class="nav-menu">
      <li>
        <a href={null} on:click={save}>Save</a>
      </li>
      <li>
        <a href={null} on:click={load}>Load</a>
      </li>
      <li>
        <a href={null} on:click={exportData}>Export</a>
      </li>
      <li>
        <a href={null} on:click={importData}>Import</a>
      </li>
    </ul>
  {/if}
</nav>
