<template>
    <div class="table-user">
            <JqxGrid :width="'99%'" ref="myGrid"  @rowclick="onRowclick($event)" :source="dataAdapter" :columns="columns" :sortable="true" :filterable="true" :autoshowfiltericon="true" />
            <div class="popup" :style="positon" :class="{active: popup_active}">
                <ul>
                    <li>Xem</li>
                    <li>Sửa</li>
                    <li>Xóa</li>
                </ul>
            </div>
    </div>
</template>
 
<script>
    import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
 
    export default {
        components: {
            JqxGrid
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
                popup_active: false
            }
        },

        beforeCreate: function () {
            this.source = {
                datatype: "json",
                datafields: [
                    { name: 'USERNAME' },
                    { name: 'EMAIL' },
                    { name: 'PHONE' },
                    { name: 'GENDER' },
                    { name: 'ADDRESS' }
                ],
                url: this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token'),
                
             }
        },
        methods: {
            onRowclick: function (event) {
                this.popup_active = event.args.rightclick
                this.positon.top = (event.args.rowindex + 1) * 32 + 'px'
               console.log(event.args.row.owner)
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
</style>
