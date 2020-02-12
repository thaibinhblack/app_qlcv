<template>
 <ul class="table-chart-pie">
    <li>TÊN LOẠI CÔNG VIỆC</li>
    <li>SỐ LƯỢNG</li>
    {{data_pie_Lcv}}
    <li v-for="(data,index) in data_pie_Lcv" :key="index"> {{index%2 == 0 ? data.ten_loai_cv : data.so_luong}}</li>
</ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(["data_pie_Lcv"])
    }
}
</script>