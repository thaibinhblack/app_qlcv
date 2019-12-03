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
                    ['Maria Anders', 'Sales Representative', 'Berlin', 'Germany'],
                    ['Ana Trujillo', 'Owner', 'Mxico D.F.', 'Mexico'],
                    ['Antonio Moreno', 'Owner', 'Mxico D.F.', 'Mexico'],
                    ['Thomas Hardy', 'Sales Representative', 'London', 'UK'],
                    ['Christina Berglund', 'Order Administrator', 'Lule', 'Sweden'],
                    ['Hanna Moos', 'Sales Representative', 'Mannheim', 'Germany'],
                    ['Frdrique Citeaux', 'Marketing Manager', 'Strasbourg', 'France'],
                    ['Martn Sommer', 'Owner', 'Madrid', 'Spain'],
                    ['Owner', 'Marseille', 'France'],
                    ['Elizabeth Lincoln', 'Accounting Manager', 'Tsawassen', 'Canada'],
                    ['Victoria Ashworth', 'Sales Representative', 'London', 'UK'],
                    ['Patricio Simpson', 'Sales Agent', 'Buenos Aires', 'Argentina'],
                    ['Francisco Chang', 'Marketing Manager', 'Mxico D.F.', 'Mexico'],
                    ['Yang Wang', 'Owner', 'Bern', 'Switzerland'],
                    ['Pedro Afonso', 'Sales Associate', 'Sao Paulo', 'Brazil'],
                    ['Elizabeth Brown', 'Sales Representative', 'London', 'UK'],
                    ['Sven Ottlieb', 'Order Administrator', 'Aachen', 'Germany'],
                    ['Janine Labrune', 'Owner', 'Nantes', 'France'],
                    ['Ann Devon', 'Sales Agent', 'London', 'UK'],
                    ['Roland Mendel', 'Sales Manager', 'Graz', 'Austria']
                ],
                datafields: [
                    { name: 'Username', type: 'string', map: '0' },
                    { name: 'Email', type: 'string', map: '1' },
                    { name: 'Quyền', type: 'string', map: '2' },
                    { name: 'Giới tính', type: 'string', map: '3' },
                    { name: 'SĐT', type: 'string', map: '3' }
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
                    
                })
            }
        },
        created()
        {
            this.api_user()
        }
    }
</script>
