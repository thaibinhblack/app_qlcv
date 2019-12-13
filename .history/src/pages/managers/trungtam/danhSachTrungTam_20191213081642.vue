<template>
<div id="page-ds-trung-tam">
    <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-7" style="margin:auto">
            <div class="card">
                <p class="background">Danh mục trung tâm</p>
                <form-trung-tam />
            </div>
        </div>
    </div>
    <div class="row">
        <JqxGrid ref="myGrid"
                :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true"/>
    </div>
</div>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";

export default {
    components: {
        'form-trung-tam': () => import('@/components/forms/formTrungTam.vue'),
        JqxGrid
    },
    data()
    {
        return {
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_TT', datafield: 'id_tt', hidden: true},
                {text: 'Tên trung tâm', datafield: 'ten_tt', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta_tt', width: 300},
                {text: 'Ghi chú', datafield: 'ghi_chu_tt', width: 300},
                {text: 'Trạng thái', datafield: 'trang_thai_tt', width: 100,filtertype: 'checkedlist'},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240},
            ],
        }
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_tt', type: 'number'},
                { name: 'ten_tt', type: 'string' },
                { name: 'mo_ta_tt' ,type: 'string'},
                { name: 'ghi_chu_tt' ,type: 'string'},
                { name: 'mo_ta_du_an', type: 'string' },
                { name: 'trang_thai_tt', type: 'number' },
                { name: 'created_at', type: 'date'},
                { name: 'updated_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'trung-tam?api_token='+this.$cookies.get('token'),
            }
    },
}
</script>