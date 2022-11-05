<script>
  import Card from './lib/components/Card.svelte'
  import { Canvas } from '@threlte/core'
  import Scene from './lib/components/Scene.svelte'
  import SceneGlobe from './lib/components/SceneGlobe.svelte'
  import { activePage, data } from './stores/global.js'
  import dataSource from './data/data.json'


 // Filters the data from a JSON of criteria
  function filterData(filterObj) {
    const currentData = dataSource
    if (filterObj.length == 0) {
      $data = dataSource
    } else {
        const filtered = currentData.filter(item => {
          return filterObj.every(filter => {
            return filter.value.includes(item[filter.id])
          })
        })
        $data = filtered;
    }
  }

  function getUniqueValues(field) {
    const unique = [...new Set($data.map(item => item[field]))].sort();
    return unique;
  }

  function getCount(id, value) {
    const currentData = $data;
    const filterObj = [{
      "id": id,
      "value": [value]
    }]

    const filtered = currentData.filter(item => {
          return filterObj.every(filter => {
            return filter.value.includes(item[filter.id])
          })
        })
      
    return filtered.length;
  }

  let filterCategory = "origin";

  /* 
  TODO make a filter object store so it persists across pages
  Add data visualizations that persist as well
  Years, type, feature type
  Change origin to country?
  What is the makeup of categories by country?
  E.g. names from Great Britain are mostly famous women, 
  while names from India are mostly goddesses
  */

  const testCriteria = [
    {
      id: "origin",
      value: ["Greek"]
    },
  ]

  filterData(testCriteria);
</script>

<main>
  <div class='header'>
    <h1>NAMING VENUS</h1>

    <div class='button-group'>
      <button on:click={() => $activePage = "Globe"}>GLOBE</button>
      <button on:click={() => $activePage = "Cards"}>CARDS</button>
    </div>
  </div>
  

  <div class="canvas-wrapper {$activePage=='Globe' ? 'globe' : 'hide'}">
    <Canvas>
      <Scene />
    </Canvas>
  </div>

  <!-- <div class='globe-gl-wrapper'>
      <SceneGlobe />
  </div> -->

  
 
  <div class='card-page {$activePage=='Cards' ? 'cards' : 'hide'}'>
    <div class='button-group'>
      <p class='card-count'>Showing {$data.length} {$data.length == 1 ? "feature" : "features"}<br></p>
      <div class='filter-count'>
        {#each getUniqueValues(filterCategory) as value}
          <p class='filter-value'>{value} ({getCount(filterCategory, value)})</p>
        {/each}
      </div>
      
    </div>
    <div class="card-wrapper">
      {#each $data as feature}
        <Card data={feature} />
      {/each}
    </div>
  </div>
  


</main>

<style>

.header {
  padding: 12px 0px 0px 0px;
  position: sticky;
  top: 0px;
  background-color: #030303;
  z-index: 100;
}

.canvas-wrapper {
  height: 700px;
}

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr) );
  column-gap: 24px;
  row-gap: 24px;
}

.card-count {
  padding: 10px 0px;
}

.filter-count {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 0px 10px 0px;
}

.filter-value {
  margin: 3px 15px 3px 0px;
  font-size: 12px;
}

.hide {
  position: absolute;
	position: absolute !important;
	width: 1px !important;
	height: 1px !important;
	padding: 0 !important;
	margin: -1px !important;
	overflow: hidden !important;
	clip: rect(0,0,0,0) !important;
	white-space: nowrap !important;
	border: 0 !important;
}
</style>
