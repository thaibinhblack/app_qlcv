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
export default {
    components: {
        'form-group': () => import('@/components/forms/formgroup.vue')
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
                {text: 'Tình trạng', datafield: 'tinh_trang_nhom', width: 50},
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
    created()
    {
        this.api_trung_tams()
    }
}
</script>