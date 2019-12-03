<template>
<div id="page-ds-phong-ban">
    <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-7" style="margin:auto">
            <div class="card">
                <p class="background">Danh mục phòng ban</p>
                <form-group  :trung_tams="trung_tams" />
            </div>
        </div>
    </div>
    <div class="table-phong-ban">
        <p class="background">Danh sách phòng ban</p>
        <JqxGrid ref="myGrid"
                :width="'99%'" :source="dataAdapter" :columns="columns" 
                :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true">
        </JqxGrid>
    </div>
</div>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";

export default {
    components: {
        'form-group': () => import('@/components/forms/formgroup.vue'),
        JqxGrid
    },
    data()
    {
        return {
            trung_tams: [],
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'Tên phòng ban', datafield: 'ten_nhom', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta_nhom', width: 240},
                {text: 'Ghi chú', datafield: 'ghi_chu_nhom', width: 240},
                {text: 'Tình trạng', datafield: 'tinh_trang_nhom', width: 240},
                {text: 'Ngày tạo', datafield: 'CREATED_AT', width: 240},
                
            ],
        }
    },
    methods: {
        api_trung_tams()
        {
            this.axios.get(this.$store.state.config.API_URL + 'trung-tam?api_token='+this.$session.get("token")).then((response) => {
                this.trung_tams = response.data
            })
        },
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'ten_nhom' , type: 'string' },
                { name: 'mo_ta_nhom', type: 'string' },
                { name: 'ghi_chu_nhom' ,type: 'string'},
                { name: 'tinh_trang_nhom', type: 'number' },
                { name: 'created_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'group_user?api_token='+this.$session.get('token'),
            
            }
    },
    created()
    {
        this.api_trung_tams()
    }
}
</script>