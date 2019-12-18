<template>
<div class="container">
    <div class="row">
        
       <div style="margin:auto;margin-top:25px;" class="col-sm-12 col-md-10 col-lg-9">
             <b-tabs
                vertical
                :expanded="false">
            <b-tab-item label="Thông tin cá nhân" icon="account">
                <form-info />
            </b-tab-item>

            <b-tab-item label="Thay đổi mật khẩu" icon="account-key">
                <form-password />
            </b-tab-item>

            <b-tab-item label="Thống kê công việc" icon="chart">
                 <JqxChart ref="myChart" style="width: 850px; height: 500px"
                  :title="'Website audience acquision by source'"
                  :description="'Month over month comparison'"
                  :showLegend="true" :enableAnimations="false" :padding="padding"
                  :titlePadding="titlePadding" :source="data" :xAxis="xAxis"
                  :valueAxis="valueAxis" :seriesGroups="seriesGroups" :colorScheme="'scheme05'">
        </JqxChart>
            </b-tab-item>
        </b-tabs>
       </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import JqxChart from "jqwidgets-scripts/jqwidgets-vue/vue_jqxchart.vue";
export default {
    components: {
        'form-info': () => import('@/components/forms/formInfo.vue'),
        'form-password': () => import('@/components/forms/formPassword.vue'),
        JqxChart
    },
    data()
    {
        return {
            data: [
                {
                    type: 'Organic Search',
                    month1: 1725090,
                    month2: 3136190
                },
                {
                    type: 'Paid Search',
                    month1: 925090,
                    month2: 2136190
                },
                {
                    type: 'Direct',
                    month1: 425090,
                    month2: 936190
                },
                {
                    type: 'Referral',
                    month1: 1250900,
                    month2: 2536190
                },
                {
                    type: 'Twitter',
                    month1: 350900,
                    month2: 681900
                },
                {
                    type: 'Facebook',
                    month1: 381900,
                    month2: 831500
                }
            ],
            padding: { left: 5, top: 5, right: 5, bottom: 5 },
            titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
            xAxis: {
                dataField: 'type',
                displayText: 'Traffic source',
                valuesOnTicks: true,
                labels: { autoRotate: false }
            },
            valueAxis: {
                unitInterval: 1000000,
                labels: {
                    formatSettings: { decimalPlaces: 0 },
                    formatFunction: (value, itemIndex, serieIndex, groupIndex) => {
                        return Math.round(value / 1000) + ' K';
                    }
                }
            },
            seriesGroups: [
                {
                    spider: true,
                    startAngle: 0,
                    endAngle: 360,
                    radius: 120,
                    type: 'spline',
                    series: [
                        { dataField: 'month1', displayText: 'January 2014', opacity: 0.7, radius: 2, lineWidth: 2, symbolType: 'circle' },
                        { dataField: 'month2', displayText: 'February 2014', opacity: 0.7, radius: 2, lineWidth: 2, symbolType: 'square' }
                    ]
                }
            ],
            colorsSchemesList: ['scheme01', 'scheme02', 'scheme03', 'scheme04', 'scheme05', 'scheme06', 'scheme07', 'scheme08'],
            seriesList: ['splinearea', 'spline', 'column', 'scatter', 'stackedcolumn', 'stackedsplinearea', 'stackedspline']
        }
    },
    computed:{
        ...mapGetters(["getUser"])
    }
}
</script>

