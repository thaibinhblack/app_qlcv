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
import {mapActions} from 'vuex'
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
    methods:{
        ...mapActions(["commitFunctioUser"]),
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
                   response.data.results.forEach(result => {
                       if(result.ID_FUNCTION == 1)
                       {
                           this.commitFunctioUser({
                               view: result.FUNCTION_VIEW,
                               create: result.FUNCTION_CREATE
                           })
                       } 
                   });
                })
            })
        }
    }
}
</script>