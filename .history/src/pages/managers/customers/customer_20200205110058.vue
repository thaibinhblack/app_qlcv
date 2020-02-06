<template>
<div id="page-customer">
    <div class="row" v-if="getAction_customers.them == '4.2' || getAction_customers.sua == '4.3' || getAction_customers.xuat == '4.5'">
        <div class=" col-md-12 col-lg-12 col-sm-12" style="margin:auto">
            <div class="card" >
                <p class="background">Danh mục khách hàng</p>
                <form-customer :customer_edit="customer_edit" :update="update" @clear="update = $event" @update_khachhang="update = $event" />
            </div>
        </div>
    </div>
    <div class="table-user"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false" style="margin-top:25px;">
            <p class="background">Danh sách khách hàng</p>
            <JqxGrid ref="myGrid"
                    :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                    :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true" :pageable="true" >
            </JqxGrid>
            
        </div>
</div>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
import { mapGetters } from 'vuex';
export default {
    components:
    {
        'form-customer': () => import('@/components/forms/formCustomer.vue'),
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
                    // {text: 'Tình trạng KH', datafield: 'tinh_trang_kh', width: 240},
                    {text: 'Tình trạng KHc', datafield: 'tinh_trang_kh', width: 150, cellsrenderer: (index, datafield, value, defaultvalue, column, rowdata) => { 
                    // return '<div class="color" style="width:20px;height:20px;background:'+rowdata.color_status+';margin:auto;margin-top:7px;"></div>'
                        if(rowdata.tinh_trang_kh == 1)
                        {
                            return 'Đang hoạt động';
                        }
                        else if(rowdata.tinh_trang_kh == 2)
                        {
                            return 'Đang bão trì'
                        }
                        else if(rowdata.tinh_trang_kh == 3)
                        {
                            return 'Ngừng hoạt động'
                        }
                        else
                        {
                            console.log(rowdata)
                            return rowdata.tinh_trang_kh + 'Chưa có trạng thái'
                        }
                     }},
                    {text: 'Ngày tạo', datafield: 'created_at', width: 120, cellsrenderer: (index, datafield, value, defaultvalue, column, rowdata) => {  
                        return new Date(rowdata.created_at).toLocaleDateString()
                    }}
                   
                ],
            customer_edit: {},
            positon: {
                top: '33px',
                left: '0px'
            },
            update: false
        }
    },
    computed: {
        ...mapGetters(["getAction_customers"])
    },
    watch:
    {
        update(newVal)
        {
            // console.log(newVal)
            if(newVal == false)
            {
                this.customer_edit = {}
                this.source = {
                    datatype: "json",
                    datafields: [
                        { name: 'id_khach_hang', type: 'number'},
                        { name: 'ten_kh' , type: 'string' },
                        { name: 'dia_chi_kh', type: 'string' },
                        { name: 'sdt_kh' ,type: 'string'},
                        { name: 'nguoi_dai_dien', type: 'string' },
                        { name: 'tinh_trang_kh', type: 'number' },
                        { name: 'created_at', type: 'date'}
                    ],
                    url: this.$store.state.config.API_URL+ 'customers?api_token='+this.$cookies.get('token'),
                    
                }
                 this.$refs.myGrid.updatebounddata('cells');
            }
            
        },
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_khach_hang', type: 'number'},
                { name: 'ten_kh' , type: 'string' },
                { name: 'dia_chi_kh', type: 'string' },
                { name: 'sdt_kh' ,type: 'string'},
                { name: 'nguoi_dai_dien', type: 'string' },
                { name: 'tinh_trang_kh', type: 'number' },
                { name: 'created_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL+ 'customers?api_token='+this.$cookies.get('token'),
            
            }
    },
    methods: 
    {
        onRowclick: function (event) {
            this.customer_edit = event.args.row.bounddata
            this.update = true;
        },
    }
}
</script>

<style>

.btn-form {margin: 0 10px;}
.btn-form:first-child {margin-left: 0;}
</style>