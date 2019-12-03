<template>
<div id="page-loai-du-an">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-5" style="margin:auto">
            <div class="add-loai-du-an card">
                <p class="background">Danh mục loại dự án</p>
                <div class="card">
                    <form-loai-du-an :update="update" @clear="update = $event" :da_edit="da_edit" />
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
export default {
    components: {
        'form-loai-du-an': () => import('@/components/forms/formLoaiDuAn.vue'),
        JqxGrid
    },
    data()
    {
        return {
            da_edit: {},
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
        }
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
                     url: this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$session.get('token'),
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        }
    },
    methods:
    {
        onRowclick: function (event) {
            
            this.da_edit = event.args.row.bounddata
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
            url: this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$session.get('token'),
            }
    },
}
</script>