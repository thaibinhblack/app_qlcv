<template>
 <ul class="table-chart-pie">
    <li class="background">TÊN LOẠI CÔNG VIỆC</li>
    <li class="background">SỐ LƯỢNG</li>
  
    <li v-for="(data,index) in data_pie_lcv" :key="index">  {{(index + 1) %2 == 0 ? data.ten_loai_cv : data.so_luong }}</li>
    <li>TỔNG</li>
    <li>{{total_pie_lcv}}</li>
    {{data_pie_lcv}}
</ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(["data_pie_lcv", "total_pie_lcv"])
    }
}
</script>