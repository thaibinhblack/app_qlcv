<template>
<div id="page-rule" class="columns">
    <div class="column is-12">
        <div class="card">
            <p class="background">Danh mục quyền</p>
            <form-rule />
        </div>
        
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-rule': () => import('@/components/forms/formrule.vue')
    }
}
</script>

<style scoped>
.background {padding: 7px 15px;background: #0051e9; color: #fff;}

</style>

