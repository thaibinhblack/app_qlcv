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
            <chart-line/>
        </div>
        <div class="col-sm-12 col-md-4">

        </div>
    </div>
</div>
</template>

<script>
export default {
    components:
    {
        'chart-line': () => import('@/components/charts/chartLine.vue')
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
</style>