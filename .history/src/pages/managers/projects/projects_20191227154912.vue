<template>
<div id="page-projects">
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12" style="margin:auto" v-if="getAction_projects.them == '3.2' || getAction_projects.sua == '3.3'">
            <div class="add-du-an card" >
                 <p class="background">Danh mục dự án khách hàng  <b-button @click="toggle_form_du_an_kh()" class="btn-minus-plus" :icon-left="active_form_dakh == false ? 'minus': 'plus' "></b-button> </p>
                <form-du-an v-if="active_form_dakh == false" :du_an="du_an" :update="update" @clear="update = $event" :du_an_kh_edit="du_an_kh_edit" @create_project="reset = $event" />
            </div>
        </div>
    </div>
    <div class="table-user"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false" style="margin-top:15px">
        <p class="background">Danh sácch dự án khách hàng  <b-button @click="active_table_dakh = !active_table_dakh" class="btn-minus-plus" :icon-left="active_table_dakh == false ? 'minus': 'plus' "></b-button> </p>
        <JqxGrid ref="myGrid"
                v-if="active_table_dakh == false"
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
        'form-du-an': () => import('@/components/forms/formDuAnKH.vue'),
        JqxGrid
    },
    data()
    {
        return {
           
            du_an: [],
            du_an_kh_edit: {},
            update: false,
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_DU_AN', datafield: 'id_du_an', hidden: true},
                {text: 'ID_DU_AN_KH', datafield: 'id_du_an_kh', hidden: true},
                {text: 'ID_KHACH_HANG', datafield: 'id_khach_hang', hidden: true},
                {text: 'Dự án', datafield: 'ten_du_an', width: 240},
                {text: 'Tên dự án khách hàng', datafield: 'ten_du_an_kh', width: 240, cellsrenderer: (index, datafield, value, defaultvalue, column, rowdata) => {
                            // let total = parseFloat(rowdata.price) * parseFloat(rowdata.quantity);
                            return '<div style="margin: 4px;" class="jqx-left-align"> <a href="/project?id_du_an_kh=' +  rowdata.id_du_an_kh + '" target="_blank">'+rowdata.ten_du_an_kh+'</a></div>';
                            }},
                {text: 'Khách hàng', datafield: 'ten_kh', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta_du_an', width: 240},
                {text: 'Ghi chú', datafield: 'ghi_chu_du_an', width: 240, },
                {text: 'Trạng thái', datafield: 'trang_thai_du_an', width: 50, filtertype: 'checkedlist'},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240},
                {text: 'Ngày cập nhật', datafield: 'updated_at', width: 240}
            ],
            reset: false,
            active_form_dakh: false,
            active_table_dakh: false
        }
    },
    computed: {
        ...mapGetters(["getAction_projects"])
    },
    watch:
    {
        reset(newVal)
        {
            console.log(newVal)
            if(newVal == true)
            {
                this.reset = false      
                this.source.localdata = {
                    datatype: "json",
                    datafields: [
                        { name: 'id_du_an', type: 'number'},
                        { name: 'id_du_an_kh' , type: 'number' },
                        { name: 'id_khach_hang' , type: 'number' },
                        { name: 'ten_du_an', type: 'string' },
                        { name: 'ten_du_an_kh' ,type: 'string'},
                        { name: 'ten_kh' ,type: 'string'},
                        { name: 'mo_ta_du_an', type: 'string' },
                        { name: 'ghi_chu_du_an', type: 'string' },
                        { name: 'trang_thai_du_an' ,type: 'number'},
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                    url: this.$store.state.config.API_URL + 'du-an-kh?api_token='+this.$cookies.get('token'),
                    
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        },
        update(newVal)
        {
            if(newVal == false)
            {
                // this.reset = false      
                this.source.localdata = {
                    datatype: "json",
                    datafields: [
                        { name: 'id_du_an', type: 'number'},
                        { name: 'id_du_an_kh' , type: 'number' },
                        { name: 'id_khach_hang' , type: 'number' },
                        { name: 'ten_du_an', type: 'string' },
                        { name: 'ten_du_an_kh' ,type: 'string'},
                        { name: 'ten_kh' ,type: 'string'},
                        { name: 'mo_ta_du_an', type: 'string' },
                        { name: 'ghi_chu_du_an', type: 'string' },
                        { name: 'trang_thai_du_an' ,type: 'number'},
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                    url: this.$store.state.config.API_URL + 'du-an-kh?api_token='+this.$cookies.get('token'),
                    
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        }
    },
    methods: {
        api_du_an()
        {
            this.axios.get(this.$store.state.config.API_URL + 'du-an?api_token='+this.$cookies.get('token')).then((response) => {
                this.du_an  = response.data
            })
        },
         onRowclick: function (event) {
            
            this.du_an_kh_edit = event.args.row.bounddata
            this.update = true;
        },
        format_ten_du_an(row, column, value)
        {
            return 123123
            console.log('test', row, column, value)
        },
        toggle_form_du_an_kh()
        {
            this.active_form_dakh = !this.active_form_dakh
        }
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_du_an_kh', type: 'number'},
                { name: 'id_du_an' , type: 'number' },
                { name: 'id_khach_hang' , type: 'number' },
                { name: 'ten_du_an', type: 'string' },
                { name: 'ten_du_an_kh' ,type: 'string'},
                { name: 'ten_kh' ,type: 'string'},
                { name: 'mo_ta_du_an', type: 'string' },
                { name: 'ghi_chu_du_an', type: 'string' },
                { name: 'trang_thai_du_an' ,type: 'number'},
                { name: 'created_at', type: 'date'},
                { name: 'updated_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'du-an-kh?api_token='+this.$cookies.get('token'),
            }
    },
    created()
    {
        console.log('created')
        this.api_du_an()
    }
}
</script>

<style scoped>
.btn-minus-plus {float: right;background: transparent;color:#fff;border: none;height: 20px;margin-bottom: 4px;;}

</style>