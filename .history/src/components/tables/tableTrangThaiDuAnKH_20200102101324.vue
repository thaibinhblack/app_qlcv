<template>
    <JqxGrid ref="myGird" :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                        :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true" />
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
    },
    beforeCreate()
    {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_trang_thai', type: 'number'},
                { name: 'ten_trang_thai', type: 'string' },
                { name: 'ten_du_an_kh' ,type: 'string'},
                { name: 'noi_dung_trang_thai' ,type: 'string'},
                { name: 'ghi_chu_trang_thai', type: 'string' },
                { name: 'created_at', type: 'date'},
                { name: 'updated_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'trang-thai-du-an-kh?api_token='+this.$cookies.get('token'),
            }
    }  
}
</script>