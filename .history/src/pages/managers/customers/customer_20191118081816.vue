<template>
<div id="page-customer">
    <div class="row">
        <div class=" col-md-8 col-lg-7 col-sm-12" style="margin:auto">
            <div class="card" >
                <p class="background">Danh mục khách hàng</p>
                <form-customer/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
export default {
    components:
    {
        'form-customer': () => import('@/components/forms/formCustomer.vue'),
        JqxGrid
    }
}
</script>

<style>

.btn-form {margin: 0 10px;}
.btn-form:first-child {margin-left: 0;}
</style>