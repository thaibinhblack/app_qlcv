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
            
        },
        methods: {
            onRowclick: function (event) {
               console.log(event)
            },
            api_user()
            {
                this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                   for (let index = 0; index < response.data.result.length; index++) {
                       var object = []
                        object.push(response.data.result[index].USERNAME, response.data.result[index].EMAIL,
                            response.data.result[index].NAME_RULE, response.data.result[index].GENDER,response.data.result[index].PHONE
                        )
                        this.dataAdapter.loadedData.push(object)
                        console.log(this.source)
                   }
                    console.log(this.dataAdapter.loadedData)
                })
            }
        },
        created()
        {
            // this.api_user()
        }
    }
</script>
