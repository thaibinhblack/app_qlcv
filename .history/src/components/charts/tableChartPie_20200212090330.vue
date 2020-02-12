<template>
<section class="data-chart-pie">
     <ul class="table-chart-pie">
        <li class="background">TÊN LOẠI CÔNG VIỆC</li>
        <li v-for="(data,index) in data_pie_lcv" :key="index">  {{ data.ten_loai_cv }}</li>
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