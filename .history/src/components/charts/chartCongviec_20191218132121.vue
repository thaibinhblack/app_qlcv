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
                    // { ten_loai_cv: 'London', sl: 120, SalesRevenueJan: 123 },
                    // { ten_loai_cv: 'Madrid', sl: 190, SalesRevenueJan: 114 },
                    // { ten_loai_cv: 'Munich', sl: 201, SalesRevenueJan: 112 },
                    // { ten_loai_cv: 'Amsterdam', sl: 110, SalesRevenueJan: 98 },
                    // { ten_loai_cv: 'Paris', sl: 105, SalesRevenueJan: 93 },
                    // { ten_loai_cv: 'Prague', sl: 54, SalesRevenueJan: 100 }
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
                    this.dataset = response.data
                    this.seriesGroups =  [
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
                })
            },
            api_thong_ke()
            {

            }
        },
        created()
        {
            this.api_loai_cv()
        }
    };
</script>
<style>
</style>