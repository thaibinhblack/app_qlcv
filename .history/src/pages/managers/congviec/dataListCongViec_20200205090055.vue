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
                {text: 'ID_KH', datafield: 'id_khach_hang', hidden: true},
                {text: 'Tên KH', datafield: 'ten_kh', width: 240},
                {text: 'Địa chỉ KH', datafield: 'dia_chi_kh', width: 240},
                {text: 'SĐT KH', datafield: 'sdt_kh', width: 240},
                {text: 'Người đại diện KH', datafield: 'nguoi_dai_dien', width: 240},
                {text: 'Tình trạng KH', datafield: 'tinh_trang_khach_hang', width: 240},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240}
                
            ],
        }
    }
}
</script>