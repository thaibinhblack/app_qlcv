<template>
<div class="row" style="height:100%">
    <div id="sidebar" class="col-md-3 col-lg-2" style="background: #e9ebee;padding:15px 0;height:100%;padding-left:15px;">
        <sidebar-left :user="user" />
    </div>
    <div class="col-md-9 col-lg-10">
        
        <router-view></router-view>
    </div>
</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import axios from '@/axios';
export default {
    components: {
        'sidebar-left': () => import('@/components/sidebars/sidebardleft.vue'),
    },
    data()
    {
        return {
            token: '',
            user: {}
        }
    },
    computed:{
        ...mapGetters(["loading"])
    },
    watch:
    {
        loading(val)
        {
            if(val == true)
            {
                this.$buefy.loading.open()
            }
            else
            {
                this.$buefy.loading.close()
            }
        }
    },
    methods:{
        ...mapActions(["commitAction_user", "commitAction_rule", "commitUser", "commitAction_customers", "commitAction_danhmuc",
        "commitAction_projects", "commitAction_laoicv", "commit_dataset_congviec"]),
        api_function()
        {
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$cookies.get('token')).then((response) => {
                this.axios.get(this.$store.state.config.API_URL + 'function_user?ID_ND'+response.data.id_nd).then((response) => {
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
                this.$cookies.remove('token')
            })
        },
        api_get_token(){
            axios.defaults.params.api_token= this.$cookies.get('token')
            this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$cookies.get('token')).then((response) => {
                this.user = response.data[0]
                
                console.log(Object.entries(response.data).length)
                if(Object.entries(response.data).length == 0)
                {
                    this.$cookies.remove('token')
                    this.$router.push('/login')
                }
                this.user.ngay_sinh_nd = this.user.ngay_sinh_nd.slice(0,10)
                this.commitUser(response.data[0])
                this.axios.get(this.$store.state.config.API_URL + 'function_user?api_token='+this.$cookies.get('token')+'&ID_ND='+response.data[0].id_nd).then((response) => {
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
                        if(rule.id_cn == 3)
                        {
                            this.commitAction_projects({
                                xem: rule.cn_xem,
                                them: rule.cn_tao,
                                sua: rule.cn_sua,
                                xoa: rule.cn_xoa,
                                xuat: rule.cn_xuat_file
                            })
                        }
                        if(rule.id_cn == 4)
                        {
                            this.commitAction_customers({
                                xem: rule.cn_xem,
                                them: rule.cn_tao,
                                sua: rule.cn_sua,
                                xoa: rule.cn_xoa,
                                xuat: rule.cn_xuat_file
                            })
                        }
                        if(rule.id_cn == 5)
                        {
                            this.commitAction_danhmuc({
                                xem: rule.cn_xem,
                                them: rule.cn_tao,
                                sua: rule.cn_sua,
                                xoa: rule.cn_xoa,
                                xuat: rule.cn_xuat_file
                            })
                        }
                        if(rule.id_cn == 6)
                        {   
                            this.commitAction_laoicv({
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
        },
        api_loai_cv()
        {
            this.axios.get(this.$store.state.config.API_URL + 'thong-ke?api_token='+this.$cookies.get('token')).then((response) => {
              this.commit_dataset_congviec(response.data)
            })
        },
    },
    updated()
    {
        if(!this.$cookies.isKey('token'))
        {
            this.$router.push('/login')
        }
    },
    created()
    {
        if(!this.$cookies.isKey('token'))
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