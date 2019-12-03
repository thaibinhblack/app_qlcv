<template>
<div>
    <div class="sidebar-left is-3-desktop">

    </div>

</div>
</template>
<script>

export default {
    components: {
        'sidebar-left': () => import('@/components/sidebars/sidebarleft.vue')
    },
    data()
    {
        return {
            token: ''
        }
    },
    created()
    {
        this.token = this.$session.get('token')
    }
}
</script>