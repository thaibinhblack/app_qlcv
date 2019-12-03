<template>
    <JqxTreeGrid :width="width" :pageable="pageable"
                 :columns="columns" :source="dataAdapter">
    </JqxTreeGrid>
</template>

<script>
import JqxTreeGrid from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxtreegrid.vue';

export default {
    components: {
        JqxTreeGrid
    },
    data: function () {
    return {
        width: 800,
        pageable: true,
        dataAdapter: new jqx.dataAdapter(this.source),
        columns: [
            { text: 'FirstName', dataField: 'FirstName', minWidth: 100, width: 200 },
            { text: 'LastName', dataField: 'LastName', width: 200 },
            { text: 'Department Name', dataField: 'DepartmentName', width: 150 },
            { text: 'Title', dataField: 'Title', width: 300 },
            { text: 'Birth Date', dataField: 'BirthDate', cellsFormat: 'd', width: 120 },
            { text: 'Hire Date', dataField: 'HireDate', cellsFormat: 'd', width: 120 },
            { text: 'Phone', dataField: 'Phone', cellsFormat: 'd', width: 120 }
        ]
    }
}
}
</script>