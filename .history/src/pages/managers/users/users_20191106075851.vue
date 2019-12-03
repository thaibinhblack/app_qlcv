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
                dataAdapter: [
                    {name: 'Bình', type: '123', calories: '123', totalfat:'123', protein: '123'}
                ],
                columns: [
                    { text: 'Name', datafield: 'name', width: 200 },
                    { text: 'Beverage Type', datafield: 'type', width: 200 },
                    { text: 'Calories', datafield: 'calories', width: 100 },
                    { text: 'Total Fat', datafield: 'totalfat', width: 120 },
                    { text: 'Protein', datafield: 'protein', minwidth: 120 }
                ]
            }
        },

    }
</script>