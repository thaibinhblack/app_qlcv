<template>
<div id="page-loai-du-an">
    <div class="row" v-if="getAction_danhmuc.them == '5.2' || getAction_danhmuc.sua == '5.3'">
        <div class="col-sm-12 col-md-12 col-lg-12" style="margin:auto">
            <div class="add-loai-du-an card">
                <p class="background">Danh mục loại dự án</p>
                <div class="card">
                    <form-loai-du-an :update="update" @create="create = $event" @clear="update = $event" :loai_du_an_edit="loai_du_an_edit" />
                </div>
            </div>
        </div>
    </div>
     <div class="table-user"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false" style="margin-top:15px">
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
        'form-loai-du-an': () => import('@/components/forms/formLoaiDuAn.vue'),
        JqxGrid
    },
    data()
    {
        return {
            loai_du_an_edit: {},
            update: false,
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_loai_da', datafield: 'id_loai_da', hidden: true},
                {text: 'Tên loại dự án', datafield: 'ten_loai_da', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta', width: 240},
                {text: 'Ghi chú', datafield: 'ghi_chu', width: 240, },
                {text: 'Trạng thái', datafield: 'trang_thai', width: 50, filtertype: 'checkedlist'},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240},
                {text: 'Ngày cập nhật', datafield: 'updated_at', width: 240}
            ],
            create: false
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
               this.source.localdata = {
                    datatype: "json",
                    datafields: [
                        { name: 'id_loai_da', type: 'number'},
                        { name: 'ten_loai_da' , type: 'string' },
                        { name: 'mo_ta', type: 'string' },
                        { name: 'ghi_chu' ,type: 'string'},
                        { name: 'trang_thai', type: 'number' },
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                     url: this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$cookies.get('token'),
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
                        { name: 'ten_loai_da' , type: 'string' },
                        { name: 'mo_ta', type: 'string' },
                        { name: 'ghi_chu' ,type: 'string'},
                        { name: 'trang_thai', type: 'number' },
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                     url: this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$cookies.get('token'),
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        }
    },
    methods:
    {
        onRowclick: function (event) {
            
            this.loai_du_an_edit = event.args.row.bounddata
            this.update = true;
        },
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_loai_da', type: 'number'},
                { name: 'ten_loai_da' , type: 'string' },
                { name: 'mo_ta', type: 'string' },
                { name: 'ghi_chu' ,type: 'string'},
                { name: 'trang_thai', type: 'number' },
                { name: 'created_at', type: 'date'},
                { name: 'updated_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$cookies.get('token'),
            }
    },
}
</script>