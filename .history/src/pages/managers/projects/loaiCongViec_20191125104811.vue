<template>
<div id="page-loai-cv">
    <div class="row">
        <div class="col-sm-12 col-md-7 col-lg-6">
            <div class="card">
                <p class="background">Danh mục loại công việc</p>
                <loai-cv />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components:{
        'loai-cv': () => import('@/components/forms/formLoaiCongViec.vue')
    }
}
</script>