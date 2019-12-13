<template>
   <div id="page-user">

       <div class="row">
           <div class="col-sm-12 col-md-12" style="margin:auto" v-if="getAction_user.them == '2.2' || getAction_user.sua == '2.3' || getAction_user.xoa == '2.4'">
                <div class="edit-user card">
                    <p class="background">Danh mục thêm user</p>
                    <div class="columns" style="margin:0">
                        <div class="form-user column auto"  >
                                <form-user :trung_tams="trung_tams" 
                                :user_edit="user_edit" 
                                :update="update" 
                                :groups="groups" @createUser="create_user = $event"
                                @clear="update = $event"
                                @updateGroups="groups = $event" />
                        </div>
                    </div>
                </div>
           </div>
       </div>
        <div class="table-user"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
            <p class="background">Danh sách user</p>
            <JqxGrid ref="myGrid"
                    :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                    :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true">
            </JqxGrid>
            <div class="popup" :style="positon" :class="{active: popup_active}">
                <ul>
                    <li @click="update = true">Xem</li>
                    <li>Sửa</li>
                    <li>Xóa</li>
                </ul>
            </div>
        </div>
   </div>
</template>
 
<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
import { mapGetters } from 'vuex';
 
    export default {
        components: {
            JqxGrid,
            'modal-user': () => import('@/components/modals/modaluser.vue'),
            'form-user': () => import('@/components/forms/formuser.vue'),
            
        },
        data: function () {
            return {
                dataAdapter: new jqx.dataAdapter(this.source),
                columns: [
                    {text: 'ID_ND', datafield: 'id_nd', hidden: true},
                    {text: 'Username', datafield: 'username_nd', width: 240},
                    {text: 'Họ & Tên', datafield: 'display_name', width: 240},
                    {text: 'Email', datafield: 'email_nd', width: 240},
                    {text: 'Giới tính', datafield: 'gt_nd', width: 50, filtertype: 'checkedlist'},
                    {text: 'SĐT', datafield: 'sdt_nd', width: 240},
                    {text: 'Ngày sinh', datafield: 'ngay_sinh_nd', width: 240},
                    {text: 'Ngày tạo', datafield: 'CREATED_AT', width: 240}
                   
                ],
                data_user: [],
                positon: {
                    top: '33px',
                    left: '0px'
                },
                popup_active: false,
                modal_active: false,
                user: {
                    PASSWORD: Math.random().toString(36).slice(-8),
                    GENDER: "0"
                },
                labelPosition: 'on-border',
                user_edit: {},
                update: false,
                groups: [],
                group_add: false,
                create_user: false,
                trung_tams: []
            }
        },
        computed:{
            ...mapGetters(["getAction_user"])
        },
        watch:
        {
            group_add(newVal)
            {
                if(newVal == true)
                {
                    this.api_groups()
                    this.group_add = false
                }
            },
            create_user(newVal)
            {
                if(newVal == true)
                {
                    this.create_user = false
                    this.update = false
                    this.source.localdata = {
                        datatype: "json",
                        datafields: [
                            { name: 'id_nd', type: 'number'},
                            { name: 'username_nd' , type: 'string' },
                            { name: 'display_name', type: 'string'},
                            { name: 'email_nd', type: 'string' },
                            { name: 'sdt_nd' ,type: 'string'},
                            { name: 'gt_nd', type: 'number' , width: 50},
                            { name: 'ngay_sinh_nd', type: 'date' }
                        ],
                        url: this.$store.state.config.API_URL + 'user?api_token='+this.$cookies.get('token'),
                        
                    }
                    // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                    this.$refs.myGrid.updatebounddata('cells');
                }
            },
            update(newVal)
            {
                if(newVal == true)
                {
                    this.popup_active = false
                }
            }
        }
        ,
        beforeCreate: function () {
            this.source = {
                datatype: "json",
                datafields: [
                     { name: 'id_nd', type: 'number'},
                    { name: 'username_nd' , type: 'string' },
                    { name: 'display_name', type: 'string'},
                    { name: 'email_nd', type: 'string' },
                    { name: 'sdt_nd' ,type: 'string'},
                    { name: 'gt_nd', type: 'number' },
                    { name: 'ngay_sinh_nd', type: 'date' },
                    { name: 'CREATED_AT', type: 'date'}
                ],
                url: this.$store.state.config.API_URL + 'user?api_token='+this.$cookies.get('token'),
                
             }
        },
        methods: {
            api_trung_tams()
            {
                this.axios.get(this.$store.state.config.API_URL + 'trung-tam?api_token='+this.$cookies.get("token")).then((response) => {
                    this.trung_tams = response.data
                })
            },
            onRowclick: function (event) {
                this.user_edit = event.args.row.bounddata
                this.update = true;
            },
            api_user()
            {
                console.log(this.source,this.dataAdapter)
            },
            api_groups()
            {
                this.axios.get(this.$store.state.config.API_URL + 'group_user').then((response) => {
                    this.groups = response.data
                })
            }
        },
        created()
        {
            this.api_trung_tams()
            this.api_user()
            this.api_groups()
        }
    }
</script>

<style scoped>
.table-user {position: relative;}

</style>
