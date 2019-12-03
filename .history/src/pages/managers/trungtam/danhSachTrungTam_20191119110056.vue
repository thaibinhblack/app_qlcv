<template>
<div id="page-ds-trung-tam">
    <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-7" style="margin:auto">
            <div class="card">
                <p class="background">Danh mục trung tâm</p>
                <form-trung-tam />
            </div>
        </div>
    </div>
    <div class="row">
        JqxGrid
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-trung-tam': () => import('@/components/forms/formTrungTam.vue')
    }
}
</script>