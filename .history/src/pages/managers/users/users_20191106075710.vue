<template>
    <JqxGrid ref="myGrid" @pagechanged="onPageChanged()"
             :theme="'material'" :width="width" :source="dataAdapter"
             :columns="columns" :columnsresize="true"
             :pageable="true">
    </JqxGrid>
</template>
<script>
    // Import the components that will be used
    import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
    export default {
        components: {
            // Adding imported widgets here
            JqxGrid
        },
        data: function () {
            // Define properties which will use in the widget
            return {
                width: '99%',
                dataAdapter: new jqx.dataAdapter(this.source),
                columns: [
                    { text: 'Name', datafield: 'name', width: 200 },
                    { text: 'Beverage Type', datafield: 'type', width: 200 },
                    { text: 'Calories', datafield: 'calories', width: 100 },
                    { text: 'Total Fat', datafield: 'totalfat', width: 120 },
                    { text: 'Protein', datafield: 'protein', minwidth: 120 }
                ]
            }
        },
        beforeCreate: function () {
            // Add here any data where you want to transform before components be rendered
            this.source = {
                datatype: 'json',
                datafields: [
                    { name: 'name', type: 'string' },
                    { name: 'type', type: 'string' },
                    { name: 'calories', type: 'int' },
                    { name: 'totalfat', type: 'string' },
                    { name: 'protein', type: 'string' }
                ],
                id: 'id',
                url: '/sampledata/beverages.txt'
            };
        },
        methods: {
            // Add here all used callbacks and/or events
            onPageChanged: function () {
                // Do something...
                let info = this.$refs.myGrid.getpaginginformation();
                console.log(info);
            }
        }
    }
</script>