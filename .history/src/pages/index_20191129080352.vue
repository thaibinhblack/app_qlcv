<template>
<div class="columns" style="height:100%">
    <div id="sidebar" class="column  sidebar-left is-2" style="background: #e9ebee;padding:15px 0;height:100%;padding-left:15px;">
        <sidebar-left />
    </div>
    <div class="column  is-10">
        
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
        ...mapActions(["commitAction_user", "commitAction_rule", "commitUser"]),
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
        },
        api_get_token(){
            this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$session.get('token')).then((response) => {
                this.commitUser(response.data[0])
                // console.log(response.data)
                this.axios.get(this.$store.state.config.API_URL + 'function_user?api_token='+this.$session.get('token')+'&ID_ND='+response.data[0].id_nd).then((response) => {
                    console.log(response.data)
                    response.data.forEach((rule) => {
                        if(rule.id_cn == 1)
                        {
                            this.commitAction_rule({
                                xem: rule.cn_xem,
                                them: rule.cn_tao,
                                sua: rule.cn_sua,
                                xoa: rule.cn_xoa,
                                xuat: rule.cn_xuat_file
                            })
                        }
                        if(rule.id_cn == 2)
                        {
                            this.commitAction_user({
                                xem: rule.cn_xem,
                                them: rule.cn_tao,
                                sua: rule.cn_sua,
                                xoa: rule.cn_xoa,
                                xuat: rule.cn_xuat_file
                            })
                        }
                    })
                })
            
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
            this.api_get_token()
        }
    }
}
</script>

<style>
.sidebar-left {
    background: #e9ebee;
}
.popup {
    display: none;
    position: absolute;
    width: 200px;
    box-shadow: 10px 1px 25px 1px #eee;
    border: 1px solid #e2e2e2;
    z-index: 9999;background: #fff}
.popup ul li {padding: 5px 15px;cursor: pointer;}
.popup ul li:hover {background: #eee}
.popup.active {display: block}
.background {padding: 7px 15px;background: #0051e9; color: #fff;}
.edit-user {margin: 0 0 25px 0;}
.btn-form {margin-left: 10px;}
</style>