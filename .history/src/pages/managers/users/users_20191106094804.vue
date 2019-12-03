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
                ]
            }
        },
        beforeCreate: function () {
            this.source = {
                localdata: [
                    [123,123,123,123,123]
                ],
                datafields: [
                    { name: 'USERNAME', type: 'string', map: '0' },
                    { name: 'EMAIL', type: 'string', map: '1' },
                    { name: 'NAME_RULE', type: 'string', map: '2' },
                    { name: 'GENDER', type: 'string', map: '3' },
                    { name: 'PHONE', type: 'string', map: '4' }
                ],
                datatype: 'json'
            };
        },
        methods: {
            onRowclick: function (event) {
               console.log(event)
            },
            api_user()
            {
                this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                   this.source.localdata = JSON.stringify(response.data.result)
                   console.log(response.data.result,this.source)  
                   console.log(response.data.result.map(JSON.parse()))
                })
            }
        },
        created()
        {
            this.api_user()
        }
    }
</script>
