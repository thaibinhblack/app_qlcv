<template>
    <div class="line-pie">
        <apexchart type="pie" width="100%" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
 
<script>

import { mapGetters } from 'vuex';
 
    export default {
        computed:
        {
            ...mapGetters(["series_pie_lcv", "data_pie_Lcv"])
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
                  
                    this.series.push(parseInt(data.so_luong))
                    this.chartOptions.labels.push(data.ten_loai_cv)
                })
            })
            //   console.log(this.series)
        }
    };
</script>