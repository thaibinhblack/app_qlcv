<template>
    <JqxGrid :theme="'material'" :width="width" :source="dataAdapter"
             :columns="columns" :columnsresize="true"
             :pageable="true">
    </JqxGrid>
</template>
<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";

export default {
    components: {
        JqxGrid
    },
    data()
    {
        return {
        width: '99%',
        dataAdapter: new jqx.dataAdapter(this.source),
        columns: [
            { text: 'Name', datafield: 'name', width: 200 },
            { text: 'Beverage Type', datafield: 'type', width: 200 },
            { text: 'Calories', datafield: 'calories', width: 110 },
            { text: 'Total Fat', datafield: 'totalfat', width: 120 },
            { text: 'Protein', datafield: 'protein', minwidth: 120 }
        ]
    }
    }
}
</script>