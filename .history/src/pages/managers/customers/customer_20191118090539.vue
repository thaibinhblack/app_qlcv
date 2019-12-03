<template>
<div id="page-customer">
    <div class="row">
        <div class=" col-md-8 col-lg-7 col-sm-12" style="margin:auto">
            <div class="card" >
                <p class="background">Danh mục khách hàng</p>
                <form-customer/>
            </div>
        </div>
    </div>
    <div class="table-user"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
            <p class="background">Danh sách khách hàng</p>
            <JqxGrid ref="myGrid"
                    :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                    :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true">
            </JqxGrid>
            
        </div>
</div>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
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
                    {text: 'Tên KH', datafield: 'ten_kh', width: 240},
                    {text: 'Địa chỉ KH', datafield: 'dia_chi_kh', width: 240},
                    {text: 'SĐT KH', datafield: 'sdt_kh', width: 240},
                    {text: 'Người đại diện KH', datafield: 'nguoi_dai_dien_kh', width: 240},
                    {text: 'Tình trạng KH', datafield: 'tinh_trang_khach_hang', width: 240},
                   
                ],
            data_user: [],
            positon: {
                top: '33px',
                left: '0px'
            },
        }
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'ten_kh' , type: 'string' },
                { name: 'dia_chi_kh', type: 'string' },
                { name: 'sdt_kh' ,type: 'string'},
                { name: 'nguoi_dai_dien_kh', type: 'string' },
                { name: 'tinh_trang_khach_hang', type: 'number' }
            ],
            url: this.$store.state.config.API_URL + 'customers?api_token='+this.$session.get('token'),
            
            }
    },
}
</script>

<style>

.btn-form {margin: 0 10px;}
.btn-form:first-child {margin-left: 0;}
</style>