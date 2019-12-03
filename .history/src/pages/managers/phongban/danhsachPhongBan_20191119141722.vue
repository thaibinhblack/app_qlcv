<template>
<div id="page-ds-phong-ban">
    <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-7">
            <div class="card">
                 <p class="background">Danh mục phòng ban</p>
                <form-group />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-group': () => import('@/components/forms/formgroup.vue')
    }
}
</script>