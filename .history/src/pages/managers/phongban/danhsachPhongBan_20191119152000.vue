<template>
<div id="page-ds-phong-ban">
    <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-7" style="margin:auto">
            <div class="card">
                <p class="background">Danh mục phòng ban</p>
                <form-group  :trung_tams="trung_tams" @create_pb="create_phong_ban = $event" :phong_ban_edit="phong_ban_edit"  :updatePhongBan="updatePhongBan"/>
            </div>
        </div>
    </div>


    <div class="table-phong-ban" style="margin-top: 50px" oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
        <p class="background">Danh sách phòng ban</p>
        <JqxGrid ref="myGrid"
                :width="'99%'" :source="dataAdapter" :columns="columns" 
                :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true" @rowclick="onRowclick($event)">
        </JqxGrid>
        <div class="popup" :style="positon" :class="{active: popup_active}">
            <ul>
                <li @click="updatePhongBan = true">Xem</li>
                <li>Sửa</li>
                <li>Xóa</li>
            </ul>
        </div>
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
                {text: 'ID_TT', datafield: 'idtt', hidden: true},
                {text: 'Tên trung tâm', datafield: 'ten_tt', width: 240},
                {text: 'Tên phòng ban', datafield: 'ten_nhom', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta_nhom', width: 240},
                {text: 'Ghi chú', datafield: 'ghi_chu_nhom', width: 240},
                {text: 'Tình trạng', datafield: 'tinh_trang_nhom', width: 240},
                {text: 'Ngày tạo', datafield: 'CREATED_AT', width: 240},
               
            ],
            popup_active: false,
            create_phong_ban: false,
            positon: {
                top: '33px',
                left: '0px'
            },
            phong_ban_edit: {},
            groups: [],
            updatePhongBan: false
        }
    },
    watch:
    {
        updatePhongBan(newVal)
        {
            if(newVal == true)
            {
                this.popup_active = false
            }
        }
        create_phong_ban(newVal)
        {
            if(newVal == true)
            {
                this.create_phong_ban = false
                this.source.localdata = {
                    datatype: "json",
                    datafields: [
                   
                    { name: 'ten_tt', type: 'string'},
                    { name: 'ten_nhom' , type: 'string' },
                    { name: 'mo_ta_nhom', type: 'string' },
                    { name: 'ghi_chu_nhom' ,type: 'string'},
                    { name: 'tinh_trang_nhom', type: 'number' },
                    { name: 'created_at', type: 'date'},
                    { name: 'id_tt', type: 'number'}
                    ],
                    url: this.$store.state.config.API_URL + 'group_user?api_token='+this.$session.get('token'),
                    
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        }
    },
    methods: {
        api_trung_tams()
        {
            this.axios.get(this.$store.state.config.API_URL + 'trung-tam?api_token='+this.$session.get("token")).then((response) => {
                this.trung_tams = response.data
            })
        },
        onRowclick: function (event) {
            
            this.popup_active = event.args.rightclick
            this.positon.top = (event.args.rowindex + 1) * 32 + 'px'
            this.positon.left = event.args.originalEvent.clientX - 478 + 'px'
            this.phong_ban_edit = event.args.row.bounddata
            
        },
        api_phong_ban()
        {
            this.axios.get(this.$store.state.config.API_URL + 'group_user?api_token='+this.$session.get('token')).then((response) => {
                this.groups = response.data
            })
        },
    },
    beforeCreate: function () {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_tt', type: 'number'},
                { name: 'ten_tt', type: 'string'},
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

<style scoped>
.table-phong-ban {position: relative;}
</style>