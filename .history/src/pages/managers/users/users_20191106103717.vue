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
                    {text: 'Username', datafield: 'UUID_BAR_KARAOKE', width: 240},
                    {text: 'Email', datafield: 'ID_PROVINCE', width: 240},
                    {text: 'Quyền', datafield: 'NAME_BAR_KARAOKE', width: 240},
                    {text: 'Giới tính', datafield: 'PHONE_BAR_KARAOKE', width: 240},
                   
                ],
                data_user: []
            }
        },

        beforeCreate: function () {
            this.source = {
                datatype: "jsonp",
                datafields: [
                    { name: 'UUID_BAR_KARAOKE' },
                    { name: 'ID_PROVINCE' },
                    { name: 'NAME_BAR_KARAOKE' },
                    { name: 'PHONE_BAR_KARAOKE' }
                ],
                url: "http://speedkaraoke.herokuapp.com/api/v1/karaoke",
                
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
