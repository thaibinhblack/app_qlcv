<template>
   <div id="page-user">

       <div class="edit-user card">
            <p class="background">Danh mục thêm user</p>
           <div class="columns" style="margin:0">
               <div class="form-user column is-8 auto" style="margin:auto;padding: 50px 0;">
                    
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
                    <li @click="modal_active = true">Xem</li>
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
            JqxGrid,
            'modal-user': () => import('@/components/modal/modaluser.vue'),
            'form-user': () => import('@/components/forms/formuser.vue')
        },
        data: function () {
            return {
                dataAdapter: new jqx.dataAdapter(this.source),
                columns: [
                    {text: 'Username', datafield: 'USERNAME', width: 240},
                    {text: 'Email', datafield: 'EMAIL', width: 240},
                    {text: 'Quyền', datafield: 'PHONE', width: 240},
                    {text: 'Giới tính', datafield: 'GENDER', width: 240},
                    {text: 'Địa chỉ', datafield: 'ADDRESS', width: 240},
                   
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
                labelPosition: 'on-border'
            }
        },

        beforeCreate: function () {
            this.source = {
                datatype: "json",
                datafields: [
                    { name: 'USERNAME' , type: 'string' },
                    { name: 'EMAIL', type: 'string' },
                    { name: 'PHONE' ,type: 'number'},
                    { name: 'GENDER', type: 'number' },
                    { name: 'ADDRESS', type: 'string' }
                ],
                url: this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token'),
                
             }
        },
        methods: {
            onRowclick: function (event) {
               
                this.popup_active = event.args.rightclick
                this.positon.top = (event.args.rowindex + 1) * 32 + 'px'
                this.positon.left = event.args.originalEvent.clientX - 478 + 'px'
               console.log(event)
            },
            api_user()
            {
                console.log(this.source,this.dataAdapter)
            }
        },
        created()
        {
            this.api_user()
        }
    }
</script>

<style scoped>
.table-user {position: relative;}
.popup {
    display: none;
    position: absolute;
    width: 200px;
    box-shadow: 10px 1px 25px 1px #eee;
    border: 1px solid #e2e2e2;
    z-index: 9999;background: #fff}
.popup ul li {padding: 5px 15px;cursor: pointer;}
.popup ul li:hover {background: #eee}
.popup.active {display: block}
.background {padding: 7px 15px;background: #0051e9; color: #fff;}
.edit-user {margin: 25px 0;}
</style>
