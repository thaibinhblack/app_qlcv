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
                    {text: 'Username', datafield: 'username_nd', width: 240},
                    {text: 'Email', datafield: 'email_nd', width: 240},
                    {text: 'Giới tính', datafield: 'gt_nd', width: 240},
                    {text: 'SĐT', datafield: 'sdt_nd', width: 240},
                    {text: 'Ngày sinh', datafield: 'ngay_sinh_nd', width: 240},
                   
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
                { name: 'username_nd' , type: 'string' },
                { name: 'email_nd', type: 'string' },
                { name: 'sdt_nd' ,type: 'string'},
                { name: 'gt_nd', type: 'number' },
                { name: 'ngay_sinh_nd', type: 'date' }
            ],
            url: this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token'),
            
            }
    },
}
</script>

<style>

.btn-form {margin: 0 10px;}
.btn-form:first-child {margin-left: 0;}
</style>