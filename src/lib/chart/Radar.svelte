<script>
    import { data } from '../../stores/global.js'
    import { Radar } from 'svelte-chartjs';
    import 'chart.js/auto';

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
                    backgroundColor: "red",
                    borderColor: "white",
                    data: values
                }
            ]
        }
    }

    let selected = "type";
    let testData = buildChartData($data, selected)

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
    <Radar data={dataSource} options={{ responsive: true }} />
    <select bind:value={selected}>
        <option value="type">Type</option>
        <option value="continent">Continent</option>
    </select>
</div>

<style lang="scss">
    /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    font-family: var(--tragic-grotesk);
    width: 100%;
    height: 300px;
    background-color: white;
    margin: 15px;
  }
</style>