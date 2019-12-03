<template>
    <div class="table-user">
            <JqxGrid :width="'99%'" ref="myGrid"  @rowclick="onRowclick($event)" :source="dataAdapter" :columns="columns" :sortable="true" :filterable="true" :autoshowfiltericon="true" />
            <div class="popup">
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
                data_user: []
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
.popup {position: absolute;}
</style>
