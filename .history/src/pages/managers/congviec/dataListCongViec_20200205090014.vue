<template>
      <JqxGrid ref="myGrid"
            :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
            :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true" :pageable="true" >
    </JqxGrid>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
export default {
    components:
    {
        JqxGrid
    }
}
</script>