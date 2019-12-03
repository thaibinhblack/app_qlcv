<template>
<div class="columns">
    <div class="sidebar-left is-3-desktop">
        <sidebar-left />
    </div>
    <div class="is-9"></div>
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