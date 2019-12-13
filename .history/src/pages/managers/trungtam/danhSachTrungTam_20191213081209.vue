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
        <JqxGrid />
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-trung-tam': () => import('@/components/forms/formTrungTam.vue')
    },
    data()
    {
        return {
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_TT', datafield: 'id_tt', hidden: true},
                {text: 'ID_NHOM', datafield: 'ten_tt', hidden: true},
                {text: 'Tên trung tâm', datafield: 'ten_tt', width: 240, filtertype: 'checkedlist'},
                {text: 'Mô tả', datafield: 'mo_ta_tt', width: 240},
                {text: 'Ghi chú', datafield: 'ghi_chu_tt', width: 240},
                {text: 'Trạng thái', datafield: 'trang_thai_tt', width: 100},
                {text: 'Trạng thái', datafield: 'trang_thai_nhom', width: 240, filtertype: 'checkedlist'},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240},
            ],
        }
    }
}
</script>