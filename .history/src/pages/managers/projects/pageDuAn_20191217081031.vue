<template>
<div id="page-loai-du-an">
    <div class="row" v-if="getAction_danhmuc.them == '5.2' || getAction_danhmuc.sua == '5.3'">
        <div class="col-sm-12 col-md-12  col-lg-12" style="margin:auto">
            <div class="add-loai-du-an card">
                <p class="background">Danh mục dự án</p>
                <div class="card">
                    <form-du-an :update="update" @clear="update = $event" :du_an_edit="du_an_edit" @create="create = $event"/>
                </div>
            </div>
        </div>
    </div>
     <div class="table-user"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false" style="margin-top:25px">
        <p class="background">Danh sácch loại dự án</p>
        <JqxGrid ref="myGrid"
                :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true">
        </JqxGrid>
    </div>
</div>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
import { mapGetters } from 'vuex';
export default {
    components: {
        'form-du-an': () => import('@/components/forms/formDuAn.vue'),
        JqxGrid
    },
    data()
    {
        return {
            du_an_edit: {},
            update: false,
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'id_loai_da', datafield: 'id_loai_da', hidden: true},
                {text: 'ID_DU_AN', datafield: 'id_du_an', hidden: true},
                {text: 'Loại dự án', datafield: 'ten_loai_da', width: 240},
                {text: 'Tên dự án', datafield: 'ten_du_an', width: 240},
                {text: 'Quản lí dự án', datafield: 'id_ql', width: 240, cellsrenderer: (index, datafield, value, defaultvalue, column, rowdata) => {
                // let total = parseFloat(rowdata.price) * parseFloat(rowdata.quantity);
                const display_name = this.renderQL(rowdata.id_ql);
                 return '<div style="margin: 4px;" class="jqx-left-align">'+ display_name +'</div>';
                // if(rowdata.trang_thai == 1) {
                //     return '<div style="margin: 4px;" class="jqx-left-align">Đang hoạt động</div>';
                // }
                // else if(rowdata.trang_thai == 2)
                // {
                //     return '<div style="margin: 4px;" class="jqx-left-align">Đang bảo trì</div>';
                // }
                // else
                // {
                //     return '<div style="margin: 4px;" class="jqx-left-align">Ngừng hoạt động</div>';
                // }
                }},
                {text: 'Mô tả', datafield: 'mo_ta_du_an', width: 240},
                {text: 'Ghi chú', datafield: 'ghi_chu_du_an', width: 240, },
                {text: 'Trạng thái', datafield: 'trang_thai_du_an', width: 50, filtertype: 'checkedlist'},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240},
                {text: 'Ngày cập nhật', datafield: 'updated_at', width: 240}
            ],
            create: false,
            users: []
        }
    },
    computed: {
        ...mapGetters(["getAction_danhmuc"])
    },
    watch:
    {
        update(newVal)
        {
            if(newVal == false)
            {
                this.du_an_edit = {}
               this.source.localdata = {
                    datatype: "json",
                    datafields: [
                        { name: 'id_loai_da', type: 'number'},
                        { name: 'id_du_an', type: 'number'},
                        { name: 'ten_loai_da', type: 'string'},
                       
                        { name: 'ten_du_an' , type: 'string' },
                         { name: 'id_ql', type: 'number'},
                        { name: 'mo_ta_du_an', type: 'string' },
                        { name: 'ghi_chu_du_an' ,type: 'string'},
                        { name: 'trang_thai_du_an', type: 'number' },
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                     url: this.$store.state.config.API_URL + 'du-an?api_token='+this.$cookies.get('token'),
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        },
        create(newVal)
        {
            if(newVal == true)
            {
                this.create = false
                this.source.localdata = {
                    datatype: "json",
                    datafields: [
                        { name: 'id_loai_da', type: 'number'},
                        { name: 'id_du_an', type: 'number'},
                         { name: 'ten_loai_da', type: 'string'},
                        { name: 'ten_du_an' , type: 'string' },
                        { name: 'mo_ta_du_an', type: 'string' },
                        { name: 'ghi_chu_du_an' ,type: 'string'},
                        { name: 'trang_thai_du_an', type: 'number' },
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                     url: this.$store.state.config.API_URL + 'du-an?api_token='+this.$cookies.get('token'),
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        }
    },
    methods:
    {

        onRowclick: function (event) {
            
            this.du_an_edit = event.args.row.bounddata
            this.update = true;
        },
        api_users()
        {
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$cookies.get('token')).then((response) => {
                this.users = response.data
            })
        },
        renderQL(id_nd)
        {
            return this.users.filter((value,index,array) => {
                return array[index].id_nd == id_nd
            })[0].display_name
        }
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_loai_da', type: 'number'},
                { name: 'id_du_an', type: 'number'},
                { name: 'ten_loai_da', type: 'string'},
               
                { name: 'ten_du_an' , type: 'string' },
                { name: 'id_ql', type: 'number'},
                { name: 'mo_ta_du_an', type: 'string' },
                { name: 'ghi_chu_du_an' ,type: 'string'},
                { name: 'trang_thai_du_an', type: 'number' },
                { name: 'created_at', type: 'date'},
                { name: 'updated_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'du-an?api_token='+this.$cookies.get('token'),
            }
    },
    create()
    {
        this.api_users()
    }
}
</script>