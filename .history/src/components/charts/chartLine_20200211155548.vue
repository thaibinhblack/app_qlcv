<template>
    <div class="line-chart">
        <JqxChart style="width: 100%; height: 500px"
            :title="'THỐNG KẾ SỐ LƯỢNG CÔNG VIỆC'"
            :description="'Trong 12 tháng gần đây'"
            :showLegend="true" :enableAnimations="true" :padding="padding"
            :titlePadding="titlePadding" :source="sampleData" :xAxis="xAxis"
            :valueAxis="valueAxis" :seriesGroups="seriesGroups" :colorScheme="'scheme05'">
        </JqxChart>
        {{series_line_lcv}}
        {{data_line_Lcv}}
    </div>
</template>
 
<script>
    import JqxChart from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxchart.vue';
import { mapGetters } from 'vuex';
 
    export default {
        components: {
            JqxChart
        },
        computed:
        {
            ...mapGetters(["series_line_lcv", "data_line_Lcv"])
        },
        data: function () {
            return {
                sampleData: this.data_line_Lcv,
                padding: { left: 10, top: 10, right: 15, bottom: 10 },
                titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
                xAxis: {
                    dataField: 'thang',
                    unitInterval: 1,
                    tickMarks: { visible: true, interval: 1 },
                    gridLinesInterval: { visible: true, interval: 1 },
                    valuesOnTicks: false,
                    padding: { bottom: 10 }
                },
                valueAxis: {
                    unitInterval: 10,
                    minValue: 0,
                    maxValue: 50,
                    title: { text: 'Time in minutes<br><br>' },
                    labels: { horizontalAlignment: 'right' }
                },
                seriesGroups: [
                ]
            }
        },
        created()
        {
            // this.sampleData = [
            //     { Day: 'Monday', Running: 30, Swimming: 10, Cycling: 25, Goal: 40 },
            //     { Day: 'Tuesday', Running: 25, Swimming: 15, Cycling: 10, Goal: 50 },
            //     { Day: 'Wednesday', Running: 30, Swimming: 10, Cycling: 25, Goal: 60 },
            //     { Day: 'Thursday', Running: 40, Swimming: 20, Cycling: 25, Goal: 40 },
            //     { Day: 'Friday', Running: 45, Swimming: 20, Cycling: 25, Goal: 50 },
            //     { Day: 'Saturday', Running: 30, Swimming: 20, Cycling: 30, Goal: 60 },
            //     { Day: 'Sunday', Running: 20, Swimming: 30, Cycling: 10, Goal: 90 }
            // ]
            this.$store.dispatch("fecth_12THANG_LCV")
        
        }
    };
</script>