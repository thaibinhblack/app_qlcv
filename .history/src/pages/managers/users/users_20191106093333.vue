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
                localdata: [],
                datafields: [
                    { name: 'Username', type: 'string', map: '0' },
                    { name: 'Email', type: 'string', map: '1' },
                    { name: 'Quyền', type: 'string', map: '2' },
                    { name: 'Giới tính', type: 'string', map: '3' },
                    { name: 'SĐT', type: 'string', map: '4' }
                ],
                datatype: 'array'
            };
        },
        methods: {
            onRowclick: function (event) {
               console.log(event)
            },
            api_user()
            {
                this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                   this.source.localdata = response.data.result
                   
                })
            }
        },
        created()
        {
            this.api_user()
        }
    }
</script>
