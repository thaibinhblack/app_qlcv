<template>
<div class="columns">
    <div class="column  sidebar-left is-3">
        <sidebar-left />
    </div>
    <div class="column  is-9">
        <tool-header/>
    </div>
</div>
</template>
<script>

export default {
    components: {
        'sidebar-left': () => import('@/components/sidebars/sidebardleft.vue'),
        'tool-header': () => import('@/components/sidebars/toolheader.vue')
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