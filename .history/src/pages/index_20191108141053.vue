<template>
<div class="columns">
    <div class="column  sidebar-left is-3">
        <sidebar-left />
    </div>
    <div class="column  is-9">
        <tool-header/>
        <router-view></router-view>
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
        else
        {
            this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$session.get('token')).then((response) => {
                console.log(response.data)
                this.axios.get(this.$store.state.config.API_URL + 'function_rule/'+response.data.result.ID_RULE).then((response) => {
                    console.log(response.data)
                })
            })
        }
    }
}
</script>