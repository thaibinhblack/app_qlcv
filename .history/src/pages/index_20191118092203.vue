<template>
<div class="columns" style="height:100%">
    <div id="sidebar" class="column  sidebar-left is-3" style="background: #e9ebee;padding:15px 0;height:100%;padding-left:15px;">
        <sidebar-left />
    </div>
    <div class="column  is-9">
        <tool-header :user="user"/>
        <router-view></router-view>
    </div>
</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    components: {
        'sidebar-left': () => import('@/components/sidebars/sidebardleft.vue'),
        'tool-header': () => import('@/components/sidebars/toolheader.vue')
    },
    data()
    {
        return {
            token: '',
            user: {}
        }
    },
    methods:{
        ...mapActions(["commitFunctioUser"]),
        api_function()
        {
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                console.log(response.dât)
                this.user = response.data
                this.axios.get(this.$store.state.config.API_URL + 'function_user?ID_ND'+response.data.id_nd).then((response) => {
                   console.log(response.data)
                   response.data.results.forEach(result => {
                       if(result.ID_FUNCTION == 3)
                       {
                           this.commitFunctioUser({
                               view: result.CN_XEM,
                               create: result.CN_TAO,
                               edit: result.CN_SUA,
                               delete: result.CN_XOA,
                               export: result.CN_XUAT_FILE
                           })
                       } 
                   });
                })
            }).catch(() => {
                this.$session.destroy()
            })
        }
    },
    updated()
    {
        if(!this.$session.has('token'))
        {
            this.$router.push('/login')
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
            // this.api_function()
        }
    }
}
</script>

<style scoped>
.sidebar-left {
    background: #e9ebee;
}
</style>