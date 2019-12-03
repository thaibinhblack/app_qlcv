<template>
    <JqxGrid ref="myGrid"
             :width="width" :source="dataAdapter" :columns="columns" :sortable="true"
             :filterable="true" :autoshowfiltericon="true" :ready="ready">
    </JqxGrid>
</template>
<script>
    import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
    export default {
        components: {
            JqxGrid
        },
        data: function () {
            return {
                width: 800,
                dataAdapter: new jqx.dataAdapter(this.source),
                columns: [
                    { text: 'First Name', datafield: 'firstname', width: 160 },
                    { text: 'Last Name', datafield: 'lastname', width: 160 },
                    { text: 'Product', datafield: 'productname', width: 170 },
                    { text: 'Order Date', datafield: 'date', filtertype: 'date', width: 160, cellsformat: 'dd-MMMM-yyyy' },
                    { text: 'Quantity', datafield: 'quantity', width: 80, cellsalign: 'right' },
                    { text: 'Unit Price', datafield: 'price', cellsalign: 'right', cellsformat: 'c2' }
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
                    { name: 'ContactName', type: 'string', map: '0' },
                    { name: 'Title', type: 'string', map: '1' },
                    { name: 'City', type: 'string', map: '2' },
                    { name: 'Country', type: 'string', map: '3' }
                ],
                datatype: 'array'
            }
        },
        methods: {
            addfilter: function () {
                // create a filter group for the FirstName column.
                let fNameFiltergroup = new jqx.filter();               
                // operator between the filters in the filter group. 1 is for OR. 0 is for AND.
                let filter_or_operator = 1;
                // create a string filter with `contains` condition.
                let filtervalue = 'Beate';
                let filtercondition = 'contains';
                let fNameFilter1 = fNameFiltergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // create second filter.
                filtervalue = 'Andrew';
                filtercondition = 'starts_with';
                let fNameFilter2 = fNameFiltergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // add the filters to the filter group.
                fNameFiltergroup.addfilter(filter_or_operator, fNameFilter1);
                fNameFiltergroup.addfilter(filter_or_operator, fNameFilter2);
                // add the filter group to the `firstname` column in the Grid.
                this.$refs.myGrid.addfilter('firstname', fNameFiltergroup);
                // create a filter group for the Quantity column.
                let quantityFilterGroup = new jqx.filter();
                // create a filter.
                filter_or_operator = 1;
                filtervalue = 3;
                filtercondition = 'less_than';
                let quantityFilter1 = quantityFilterGroup.createfilter('numericfilter', filtervalue, filtercondition);
                quantityFilterGroup.addfilter(filter_or_operator, quantityFilter1);
                // add the filter group to the `quantity` column in the Grid.
                this.$refs.myGrid.addfilter('quantity', quantityFilterGroup);
                // apply the filters.
                this.$refs.myGrid.applyfilters();
            },
            ready: function () {
                this.addfilter();
            }
        }
    }
</script>