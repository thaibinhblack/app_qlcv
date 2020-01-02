<template>
    <div>
        <p class="background">Danh sách trạng thái dự án khách hàng</p>
        <JqxGrid ref="myGrid" :width="'100%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                        :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true" />
    </div>
    
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";

export default {
    props: ["update"],
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
    watch:
    {
        update(val)
        {
            // console.log(val)
            if(val == true)
            {
                this.$emit('update',false)
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
                this.source.localdata = {
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
    },
    methods: 
    {
        onRowclick: function (event) {
        this.$emit("trang_thai_edit",event.args.row.bounddata)
        },
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
    },
    created()
    {
        this.$store.dispatch('fetchTrangThaiDuAn');
    }
}
</script>