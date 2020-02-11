<template>
    <div class="line-chart">
        <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
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
                series: [],
                chartOptions: {
                    chart: {
                    width: 380,
                    type: 'pie',
                    },
                    labels: [],
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
            }
        },
        created()
        {
            this.$store.dispatch("fecth_12THANG_LCV").then((response) => {
                response.forEach((data) => {
                  
                    this.series.push(data.so_luong)
                    this.chartOptions.labels.push(data.ten_loai_cv)
                })
            })
              console.log(this.series)
        }
    };
</script>