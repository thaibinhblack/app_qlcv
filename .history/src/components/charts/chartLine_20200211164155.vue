<template>
    <div class="line-chart">
        <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
 
<script>
import ApexCharts from 'apexcharts'

 import JqxChart from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxchart.vue';
import { mapGetters } from 'vuex';
 
    export default {
        components: {
            "apexchart": ApexCharts
        },
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
            }
        },
        created()
        {
            this.sampleData = [
                { Day: 'Monday', Running: 30, Swimming: 10, Cycling: 25, Goal: 40 },
                { Day: 'Tuesday', Running: 25, Swimming: 15, Cycling: 10, Goal: 50 },
                { Day: 'Wednesday', Running: 30, Swimming: 10, Cycling: 25, Goal: 60 },
                { Day: 'Thursday', Running: 40, Swimming: 20, Cycling: 25, Goal: 40 },
                { Day: 'Friday', Running: 45, Swimming: 20, Cycling: 25, Goal: 50 },
                { Day: 'Saturday', Running: 30, Swimming: 20, Cycling: 30, Goal: 60 },
                { Day: 'Sunday', Running: 20, Swimming: 30, Cycling: 10, Goal: 90 }
            ]
            // var year = new Date().getFullYear();
            // var  month = new Date().getMonth() + 1;
            // var i = 1;
            // while (i != 12)
            // {
            //     var ltcspm = 0;
            //     var check = false;
            //     this.data_line_Lcv.forEach((line) => {
                    
            //         if(line.thang == month+'/'+year)
            //         {
            //             if(line.ten_loai_cv == "Lập trình chỉnh sửa phần mềm")
            //             {
            //                 ltcspm = line.so_luong
            //             }
            //             sampleData.push({thang: line.thang, "Lập trình chỉnh sửa phần mềm": line.so_luong})
            //             check = true;
            //         }
                    
            //     })
            //     if(check == false)
            //     {
            //         sampleData.push({thang: month+'/'+year, "Lập trình chỉnh sửa phần mềm": ltcspm})
            //     }
            //     month = month - 1;
            //     if(month == 0)
            //     {
            //         year = year -1;
            //         month = 12
            //     }
                
            //     i = i+1;
            // }
            // this
            // this.sampleData = sampleData
            this.$store.dispatch("fecth_12THANG_LCV")
        
        }
    };
</script>