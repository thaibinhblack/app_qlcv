<template>
<div class="chart-line">
    <JqxChart style="width: 100%; height: 500px"
        :title="'THỐNG KẾ SỐ LƯỢNG CÔNG VIỆC'"
        :description="'Trong 12 tháng gần đây'"
        :showLegend="true" :enableAnimations="true" :padding="padding"
        :titlePadding="titlePadding" :source="sampleData" :xAxis="xAxis"
        :valueAxis="valueAxis" :seriesGroups="seriesGroups" :colorScheme="'scheme05'">
    </JqxChart>
    {{}}
</div>

</template>
 
<script>
    import JqxChart from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxchart.vue';
import { mapGetters } from 'vuex';
 
    export default {
        components: {
            JqxChart
        },
        computed:{
            ...mapGetters(["series_line_lcv"])
        },
        data: function () {
            return {
                sampleData: [
                  
                ],
                padding: { left: 10, top: 10, right: 15, bottom: 10 },
                titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
                xAxis: {
                    dataField: 'Day',
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
                    {
                        type: 'line',
                        series:[]
                    }
                ]
            }
        },
        created()
        {
            this.$store.dispatch('fecth_12THANG_LCV')
        
        }
    };
</script>