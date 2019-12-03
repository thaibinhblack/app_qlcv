<template>
<div>
    <div class="sidebar-leftis-one-quarter-fullhd is-3">
        <sidebar-left />
    </div>

</div>
</template>
<script>

export default {
    components: {
        'sidebar-left': () => import('@/components/sidebars/sidebardleft.vue')
    },
    data()
    {
        return {
            token: ''
        }
    },
    created()
    {
        if(!this.$session.has('token'))
        {
            this.$router.push('/login')
        }
        this.token = this.$session.get('token')
    }
}
</script>