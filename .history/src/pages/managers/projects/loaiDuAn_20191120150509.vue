<template>
<div id="page-loai-du-an">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-5" style="margin:auto">
            <div class="edit-user card">
                <p class="background">Danh mục loại dự án</p>
                <div class="card">
                    <form-loai-du-an :update="update" @clear="update = $event" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-loai-du-an': () => import('@/components/forms/formLoaiDuAn.vue')
    },
    data()
    {
        return {
            update: false
        }
    }
}
</script>