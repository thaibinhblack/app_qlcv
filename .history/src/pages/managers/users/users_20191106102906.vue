<template>
    <JqxGrid width="1000px" ref="myGrid"  @rowclick="onRowclick($event)" :source="dataAdapter" :columns="columns" :sortable="true" :filterable="true" :autoshowfiltericon="true" />
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
                    {text: 'Quyền', datafield: 'NAME_RULE', width: 240},
                    {text: 'Giới tính', datafield: 'GENDER', width: 240},
                    {text: 'SĐT', datafield: 'PHONE', width: 240},
                ],
                data_user: []
            }
        },
        watch: {
            data_user(user_new)
            {
                this.source.localdata = user_new
                console.log(this.source)
                this.dataAdapter = new jqx.dataAdapter(this.source)
                console.log(this.dataAdapter)
            }
        },
        beforeCreate: function () {
            this.source = {
                datatype: "jsonp",
                datafields: [
                    { name: 'userId' },
                    { name: 'id' },
                    { name: 'title' },
                    { name: 'completed' }
                ],
                url: "https://jsonplaceholder.typicode.com/todos",
                
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
