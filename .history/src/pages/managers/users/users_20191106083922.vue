<template>
    <div>
        <JqxGrid ref="myGrid" @filter="onFilter($event)"
                 :width="getWidth" :source="dataAdapter" :columns="columns" :sortable="true"
                 :filterable="true" :autoshowfiltericon="true" :ready="ready">
        </JqxGrid>
        <div style="margin-top: 30px">
            <div style="width: 200px; float: left; margin-right: 10px">
                <JqxButton @click="clearFiltering()" :width="120">
                    Remove Filter
                </JqxButton>
                <JqxCheckBox @change="onFilterBackground($event)"
                             :height="25" :checked="true">
                    Filter Background
                </JqxCheckBox>
                <JqxCheckBox @change="onFilterIcon($event)"
                             :height="25" :checked="false">
                    Show All Filter Icons
                </JqxCheckBox>
            </div>
            <div style="float: left">
                Event Log:
                <JqxPanel ref="myPanel" :width="300" :height="80"></JqxPanel>
            </div>
        </div>
    </div>
</template>
<script>
    import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
    import JqxCheckBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcheckbox.vue";
    import JqxButton from "jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue";
    import JqxPanel from "jqwidgets-scripts/jqwidgets-vue/vue_jqxpanel.vue";
    export default {
        components: {
            JqxGrid,
            JqxCheckBox,
            JqxButton,
            JqxPanel
        },
        data: function () {
            return {
                getWidth: getWidth('grid'),
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
            };
        },
        methods: {
            addfilter: function () {
                let filtergroup = new jqx.filter();
                let filter_or_operator = 1;
                let filtervalue = 'Beate';
                let filtercondition = 'contains';
                let filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                filtervalue = 'Andrew';
                filtercondition = 'starts_with';
                let filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                filtergroup.addfilter(filter_or_operator, filter1);
                filtergroup.addfilter(filter_or_operator, filter2);
                this.$refs.myGrid.addfilter('firstname', filtergroup, true);
                this.$refs.myGrid.applyfilters();
            },
            ready: function () {
                this.addfilter();
            },
            onFilter: function (event) {
                this.$refs.myPanel.clearcontent();
                let filterinfo = this.$refs.myGrid.getfilterinformation();
                let eventData = 'Triggered "filter" event';
                for (let i = 0; i < filterinfo.length; i++) {
                    let eventData = 'Filter Column: ' + filterinfo[i].filtercolumntext;
                    this.$refs.myPanel.prepend('<div style="margin-top: 5px;">' + eventData + '</div>');
                }
            },
            clearFiltering: function () {
                this.$refs.myGrid.clearfilters();
            },
            onFilterBackground: function (event) {
                this.$refs.myGrid.showfiltercolumnbackground = event.args.checked;
            },
            onFilterIcon: function (event) {
                this.$refs.myGrid.autoshowfiltericon = !event.args.checked;
            }
        }
    }
</script>
<style>
    .jqx-button {
        width: fit-content;
    }
    .jqx-panel {
        border: none;
    }
    .jqx-checkbox {
        margin-top: 5px;
    }
</style>