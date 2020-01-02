<template>
    <JqxGrid />
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";

export default {
    components: {
        JqxGrid
    },
    data()
    {
        return {
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'id_trang_thai', datafield: 'id_trang_thai', hidden: true},
                {text: 'Tên Trạng Thái', datafield: 'ten_trang_thai'},
                {text: 'Nội dung', datafield: 'noi_dung_trang_thai'},
                {text: 'Ghi chú', datafield: 'ghi_chu_trang_thai', width: 240},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240},
                {text: 'Ngày cập nhật', datafield: 'updated_at', width: 240}
            ],
        }
    }  
}
</script>