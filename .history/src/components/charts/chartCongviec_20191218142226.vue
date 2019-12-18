<template>
    <div>
        <JqxChart ref="myChart" style="width: 100%; height: 500px"
                  :title="'Thống kê công việc'"
                  :description="'(thống kê theo loại công việc)'"
                  :showLegend="true" :enableAnimations="false" :padding="padding"
                  :titlePadding="titlePadding" :source="dataset" :xAxis="xAxis"
                  :valueAxis="valueAxis" :seriesGroups="seriesGroups" :colorScheme="'scheme01'">
        </JqxChart>
    </div>
</template>
<script>
    import JqxChart from "jqwidgets-scripts/jqwidgets-vue/vue_jqxchart.vue";
    export default {
        components: {
            JqxChart,
        },
        data: function () {
            return {
                dataset: [
                    {sl: "7" , ten_loai_cv: "Hỗ trợ"},
                    {sl: "1" , ten_loai_cv: "Đi công tác ngoài"},
                ],
                padding: { left: 5, top: 5, right: 5, bottom: 5 },
                titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
                xAxis: {
                    dataField: 'ten_loai_cv',
                    valuesOnTicks: true,
                    labels: { autoRotate: true }
                },
                valueAxis: {
                    labels: {
                        formatSettings: { decimalPlaces: 0 },
                        autoRotate: true
                    }
                },
                seriesGroups: [
                    {
                        polar: true,
                        endAngle: 270,
                        radius: 120,
                        type: 'line',
                        series: [
                            { dataField: 'sl', displayText: 'Số lượng công việc', opacity: 0.7, radius: 2, lineWidth: 2, symbolType: 'circle' },
                            
                        ]
                    }
                ]
            }
        },
        methods: {
            sliderStartAngle: function (event) {
                let value = event.args.value;
                this.$refs.myChart.seriesGroups[0].startAngle = value;
                this.$refs.myChart.update();
            },
            sliderEndAngle: function (event) {
                let value = 360 - event.args.value;
                this.$refs.myChart.seriesGroups[0].endAngle = value;
                this.$refs.myChart.update();
            },
            sliderRotate: function (event) {
                let value = event.args.value;
                let endAngle = this.$refs.myChart.seriesGroups[0].endAngle;
                if (isNaN(endAngle))
                    endAngle = 360;
                let startAngle = this.$refs.myChart.seriesGroups[0].startAngle;
                if (isNaN(startAngle))
                    startAngle = 0;
                let diff = endAngle - startAngle;
                this.$refs.myChart.seriesGroups[0].startAngle = value;
                this.$refs.myChart.seriesGroups[0].endAngle = value + diff;
                this.$refs.myChart.update();
            },
            sliderRadius: function (event) {
                let value = event.args.value;
                this.$refs.myChart.seriesGroups[0].radius = value;
                this.$refs.myChart.update();
            },
            checkBoxTicksBetween: function (event) {
                this.$refs.myChart.xAxis.valuesOnTicks = !event.args.checked;
                this.$refs.myChart.update();
            },
            checkBoxAutoRotate: function (event) {
                this.$refs.myChart.xAxis.labels.autoRotate = event.args.checked;
                this.$refs.myChart.valueAxis.labels.autoRotate = event.args.checked;
                this.$refs.myChart.update();
            },
            api_loai_cv()
            {
                this.axios.get(this.$store.state.config.API_URL + 'thong-ke?api_token='+this.$cookies.get('token')).then((response) => {
                    this.$refs.myChart.dataset = response.data
                    this.$refs.myChart.update();
                    console.log('api',this.dataset)
                })
            },
            api_thong_ke()
            {

            }
        },
        mounted()
        {
            console.log('mounted',this.$refs.myChart)
        },
        created()
        {
            this.api_loai_cv()
            console.log('created',this.$refs.myChart)
        }
    };
</script>
<style>
</style>