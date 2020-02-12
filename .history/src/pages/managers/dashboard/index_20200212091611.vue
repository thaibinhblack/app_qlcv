<template>
<div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-4" v-for="(tk,index) in thongke_loai_duan" :key="index">
            <div class="card">
                <h3>{{tk.ten_loai_da}}</h3>
                <p align="right"><small>{{tk.sl}}</small></p>
            </div>
        </div>
        <div class="col-sm-12 lbael-chart-lcv">
            <label for="lbael-chart-lcv">THỐNG KÊ SỐ LƯỢNG LOẠI CÔNG VIỆC TRONG THÁNG</label>
        </div>
        <div class="col-sm-12 col-md-6">
            <chart-pie/>
        </div>
        <div class="col-sm-12 col-md-6">
           <table-pie />
        </div>
    </div>
</div>
</template>

<script>
export default {
    components:
    {
        'chart-pie': () => import('@/components/charts/chartPie.vue'),
        'table-pie': () => import("@/components/charts/tableChartPie.vue")
    },
    data()
    {
        return {
            thongke_loai_duan: []
        }
    },
    methods: {
        api_thong_ke()
        {
            this.axios.get(this.$store.state.config.API_URL + 'thong-ke-loai-du-an').then((repsonse) => {
                this.thongke_loai_duan = repsonse.data
            })
        }
    },
    created()
    {
        this.api_thong_ke()
    }
}
</script>

<style>
.card {padding: 25px; margin: 10px 0;background: #209cee;color: #fff;}
.card h3 {font-size: 18px;}
.table-chart-pie {width: 50%}
.table-chart-pie>li {width: 100%;display: inline-block;padding: 10px 5px;border: 1px solid #333;text-align: center}
.table-chart-pie>li:first-child {font-weight: bold}
.lbael-chart-lcv {font-size: 18px;margin-top: 25;}
/* .table-chart-pie>li:nth-child(even){border-left: none;} */
</style>