<template>
      <JqxGrid ref="myGrid"
            :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
            :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true" :pageable="true" >
    </JqxGrid>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
export default {
    components:
    {
        JqxGrid
    },
    data()
    {
        return {
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_CV_DA', datafield: 'id_cv_da', hidden: true},
                {text: 'Tên công việc', datafield: 'ten_cv', width: 240},
                {text: 'Nội dung', datafield: 'noi_dung_cv', width: 240},
                {text: 'Ngày tiếp nhận', datafield: 'ngay_tiep_nhan', width: 240},
                {text: 'Ngày giao việc', datafield: 'ngay_giao_viec', width: 240},
                {text: 'Tình trạng KH', datafield: 'tinh_trang_khach_hang', width: 240},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240}
                
            ],
        }
    }
}
</script>