<template>
<div id="page-projects">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-mg-5" style="margin:auto">
            <div class="add-du-an card">
                 <p class="background">Danh mục dự án</p>
                <form-du-an :du_an="du_an" :update="update" @clear="update = $event" />
            </div>
        </div>
    </div>
    <div class="table-user"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false" style="margin-top:15px">
        <p class="background">Danh sácch dự án</p>
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
    components: {
        'form-du-an': () => import('@/components/forms/formDuAn.vue'),
        JqxGrid
    },
    data()
    {
        return {
           
            du_an: [],
            du_an_edit: {},
            update: false,
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_LOAI_DU_AN', datafield: 'id_loai_du_an', hidden: true},
                {text: 'ID_DU_AN', datafield: 'id_du_an', hidden: true},
                {text: 'Loại dự án', datafield: 'ten_loai_du_an', width: 240},
                {text: 'Tên dự án', datafield: 'ten_du_an', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta_du_an', width: 240},
                {text: 'Ghi chú', datafield: 'ghi_chu_du_an', width: 240, },
                {text: 'Trạng thái', datafield: 'trang_thai_du_an', width: 50, filtertype: 'checkedlist'},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240},
                {text: 'Ngày cập nhật', datafield: 'updated_at', width: 240}
            ],
        }
    },
    methods: {
        api_du_an()
        {
            this.axios.get(this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$session.get('token')).then((response) => {
                this.du_an = response.data
            })
        },
         onRowclick: function (event) {
            
            this.du_an_edit = event.args.row.bounddata
            this.update = true;
        },
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_loai_du_an', type: 'number'},
                { name: 'id_du_an' , type: 'number' },
                { name: 'ten_loai_du_an', type: 'string' },
                { name: 'ten_du_an' ,type: 'string'},
                { name: 'mo_ta_du_an', type: 'string' },
                { name: 'ghi_chu_du_an', type: 'string' },
                { name: 'trang_thai_du_an' ,type: 'number'},
                { name: 'created_at', type: 'date'},
                { name: 'updated_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'du-an?api_token='+this.$session.get('token'),
            }
    },
    created()
    {
        console.log('created')
        this.api_du_an()
    }
}
</script>