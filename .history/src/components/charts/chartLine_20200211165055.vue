<template>
    <div class="line-chart">
        <apexchart width="500" type="pie" :options="options" :series="series"></apexchart>
    </div>
</template>
 
<script>

import { mapGetters } from 'vuex';
 
    export default {
        computed:
        {
            ...mapGetters(["series_line_lcv", "data_line_Lcv"])
        },
        data: function () {
            return {
                series: [44, 55, 13, 43, 22],
                chartOptions: {
                    chart: {
                    width: 380,
                    type: 'pie',
                    },
                    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                    responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                        width: 200
                        },
                        legend: {
                        position: 'bottom'
                        }
                    }
                    }]
                },
        },
        created()
        {
            
        }
    };
</script>