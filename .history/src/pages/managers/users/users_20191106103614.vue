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
                    {text: 'Username', datafield: 'userId', width: 240},
                    {text: 'Email', datafield: 'id', width: 240},
                    {text: 'Quyền', datafield: 'title', width: 240},
                    {text: 'Giới tính', datafield: 'completed', width: 240},
                   
                ],
                data_user: []
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
                url: "http://jsonplaceholder.typicode.com/todos",
                
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
