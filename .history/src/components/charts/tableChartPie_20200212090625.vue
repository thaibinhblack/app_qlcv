<template>
<section class="data-chart-pie row">
    <ul class="table-chart-pie col-sm-6">
        <li class="background">TÊN LOẠI CÔNG VIỆC</li>
        <li v-for="(data,index) in data_pie_lcv" :key="index">  {{ data.ten_loai_cv }}</li>
    </ul>
     <ul class="table-chart-pie data-right col-sm-6">
        <li class="background">SỐ LƯỢNG</li>
        <li v-for="(data,index) in data_pie_lcv" :key="index">  {{ data.so_luong }}</li>
    </ul>
</section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(["data_pie_lcv", "total_pie_lcv"])
    }
}
</script>

<style scoped>
section.data-chart-pie {height: 250px;overflow: hidden;;}
section.data-chart-pie>ul {padding: 0 !important;}
.data-right>li {border-left: none;}
</style>