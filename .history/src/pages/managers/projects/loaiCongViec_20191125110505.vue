<template>
<div id="page-loai-cv">
    <div class="row">
        <div class="col-sm-12 col-md-7 col-lg-6" style="margin:auto">
            <div class="card">
                <p class="background">Danh mục loại công việc</p>
                <loai-cv  :update="update"/>
            </div>
        </div>
    </div>
   <div class="table-loai-cv"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false" style="margin-top:15px">
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
    components:{
        'loai-cv': () => import('@/components/forms/formLoaiCongViec.vue'),
        JqxGrid
    },
    data()
    {
        return {
            update: false,
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_LOAI_CV', datafield: 'id_loai_cv', hidden: true},
                {text: 'Tên loại công việc', datafield: 'ten_loai_cv', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta', width: 240},
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
                        { name: 'id_loai_cv', type: 'number'},
                        { name: 'ten_loai_cv' , type: 'string' },
                        { name: 'mo_ta', type: 'string' },
                        { name: 'trang_thai' ,type: 'number'},
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                     url: this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$session.get('token'),
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
    beforeCreate()
    {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_loai_cv', type: 'number'},
                { name: 'ten_loai_cv' , type: 'string' },
                { name: 'mo_ta', type: 'string' },
                { name: 'trang_thai' ,type: 'number'},
                { name: 'created_at', type: 'date'},
                { name: 'updated_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$session.get('token'),
            }
    }
}
</script>