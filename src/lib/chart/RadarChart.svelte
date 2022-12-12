<script>
    import { data } from '../../stores/global.js'
    import { Radar } from 'svelte-chartjs';
    import 'chart.js/auto';

    export let category;
    export let chartTitle;

    function buildChartData(data, category) {
        const labels = [...new Set(data.map(item => item[category]))]
        const values = labels.map(label => {
            const count = data.filter(item => item[category] == label).length;
            return count;
        })

        return {
            labels: labels,
            datasets: [
                {
                    backgroundColor: "white",
                    borderColor: "white",
                    data: values
                }
            ]
        }
    }
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        }
      },
      layout: {
        padding: 20,
      }
    }

    let selected = "type";
    let testData = buildChartData($data, category)

    console.log(selected, testData);

    export let dataSource = testData;

    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      PointElement,
      RadialLinearScale,
      LineElement,
    } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement
  );
    
</script>

<div class='chart-container'>
    <p class='chart-title'>{chartTitle}</p>
    <Radar data={dataSource} {options} />
    <!-- <select bind:value={selected}>
        <option value="type">Type</option>
        <option value="continent">Continent</option>
    </select> -->
</div>

<style lang="scss">
    /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    margin: 0px;
    padding: 0px;
  }

  .chart-title {
    text-align: center;
  }
</style>