<template>
<div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-4" v-for="(tk,index) in thongke_loai_duan" :key="index">
            <div class="card">
                <h3>{{tk.ten_loai_da}}</h3>
                <p align="right"><small>{{tk.sl}}</small></p>
            </div>
        </div>

        <div class="col-sm-12 col-md-8">
            <chart-pie/>
        </div>
        <div class="col-sm-12 col-md-4">
            <ul class="table-chart-pie">
                <li>TÊN LOẠI CÔNG VIỆC</li>
                <li>SỐ LƯỢNG</li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components:
    {
        'chart-pie': () => import('@/components/charts/chartPie.vue')
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

<style scoped>
.card {padding: 25px; margin: 10px 0;background: #209cee;color: #fff;}
.card h3 {font-size: 18px;}
.table-chart-pie {width: 100%}
.table-chart-pie>li {width: 50%;display: inline-block;}
</style>