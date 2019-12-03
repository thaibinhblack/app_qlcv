<template>
<div id="page-loai-du-an">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-5" style="margin:auto">
            <div class="add-loai-du-an card">
                <p class="background">Danh mục loại dự án</p>
                <div class="card">
                    <form-loai-du-an :update="update" @clear="update = $event" />
                </div>
            </div>
        </div>
    </div>
     <div class="table-user"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
        <p class="background">Danh sácch loại dự án</p>
        <JqxGrid ref="myGrid"
                :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true">
        </JqxGrid>
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-loai-du-an': () => import('@/components/forms/formLoaiDuAn.vue')
    },
    data()
    {
        return {
            update: false,
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_LOAI_DU_AN', datafield: 'id_loai_du_an', hidden: true},
                {text: 'Tên loại dự án', datafield: 'ten_loai_du_an', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta_loai_du_an', width: 240},
                {text: 'Ghi chú', datafield: 'ghi_chu_loai_du_an', width: 240, filtertype: 'checkedlist'},
                {text: 'Trạng thái', datafield: 'trang_thai_loai_du_an', width: 50},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240}
                
            ],
        }
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_loai_du_an', type: 'number'},
                { name: 'ten_loai_du_an' , type: 'string' },
                { name: 'mo_ta_loai_du_an', type: 'string' },
                { name: 'ghi_chu_loai_du_an' ,type: 'string'},
                { name: 'trang_thai_loai_du_an', type: 'number' },
                { name: 'created_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token'),
            
            }
    },
}
</script>