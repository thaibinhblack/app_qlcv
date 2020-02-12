<template>
<section class="data-chart-pie row">
    <p class="background col-sm-6">LOẠI CÔNG VIỆC</p>
    <p class="background col-sm-3">SỐ LƯỢNG</p>
    <p class="background col-sm-3">TỈ LỆ</p>
    <ul class="table-chart-pie col-sm-6">
        
        <li v-for="(data,index) in data_pie_lcv" :key="index">  {{ data.ten_loai_cv }}</li>
        <li style="font-weight:bold">TỔNG CỘNG</li>
    </ul>
     <ul class="table-chart-pie data-right col-sm-6">
        <li class="background">SỐ LƯỢNG</li>
        <li v-for="(data,index) in data_pie_lcv" :key="index">  {{ data.so_luong }}  {{'(' +  ((data.so_luong / total_pie_lcv)*100).toFixed(1) +'%)' }}</li>
        <li  style="font-weight:bold">{{total_pie_lcv}}</li>
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
.table-chart-pie {width: 50%}
.table-chart-pie>li {width: 100%;display: inline-block;padding: 10px 5px;border: 1px solid #333;text-align: center}
.table-chart-pie>li:first-child {font-weight: bold}
section.data-chart-pie {height: 300px;overflow: scroll;overflow-x: hidden;}
section.data-chart-pie>.col-md-6 {padding: 0 !important;}
.data-right>li {border-left: none;}
section.data-chart-pie::-webkit-scrollbar {
  width: 5px;
}
/* Track */
section.data-chart-pie::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
/* section.data-chart-pie::-webkit-scrollbar-thumb {
  background: #209cee;
} */
/* Handle on hover */
/* section.data-chart-pie::-webkit-scrollbar-thumb:hover {
  background: #209cee;
} */
/* .background {padding: 7px 15px;background: #209cee; color: #fff;} */

</style>