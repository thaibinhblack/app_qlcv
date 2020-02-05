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
                {text: 'Ngày hoàn thành', datafield: 'ngay_hoan_thanh', width: 240},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240}
                
            ],
        }
    },
     beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_cv_da', type: 'number'},
                { name: 'ten_cv' , type: 'string' },
                { name: 'noi_dung_cv', type: 'string' },
                { name: 'ngay_tiep_nhan' ,type: 'string'},
                { name: 'ngay_giao_viec', type: 'string' },
                { name: 'ngay_hoan_thanh', type: 'number' },
                { name: 'created_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL+ 'customers?api_token='+this.$cookies.get('token'),
            
            }
    },
}
</script>