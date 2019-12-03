<template>
<div id="page-rule" class="row" style="padding: 0 15px;">

    <div class="col-md-3" style="padding:0">
            <p class="background">DS người dùng</p>
            <div class="card card-rule">
                <b-field>
                    <b-select v-model="group_selected" placeholder="Danh sách phòng ban">
                        <option value="">
                        Tất cả phòng
                        </option>
                        <option v-for="(group,index) in groups" :key="index" :value="group.id_nhom">{{group.ten_nhom}}</option>
                    </b-select>
                </b-field>
                <b-radio v-for="(user,index) in users"
                    :key="index"
                    v-model="user_selected"
                    width="100%"
                    name="name"
                    class="radio-group"
                    :native-value="user.id_nd">
                    {{user.username_nd}}
                </b-radio>
            </div>
    </div>
    <div class="col-md-9">
        <p class="background">Danh sách chức năng theo người dùng</p>
        <div class="card card-rule">
            <div class="row" style="padding: 10px 0">
                <div class="col-sm-4 col-md-7 ">Tên chức năng</div>
                <div class="col-sm-2 col-md-1 text-rule"> Xem</div>
                <div class="col-sm-2 col-md-1 text-rule">Thêm</div>
                <div class="col-sm-2 col-md-1 text-rule">Sửa</div>
                <div class="col-sm-2 col-md-1 text-rule">Xóa</div> 
                <div class="col-sm-2 col-md-1 text-rule">Xuất</div>  
            </div>
            
            <div class="row" style="margin:7px 0" v-for="(function_rule, index) in functions" :key="index">
                <div class="col-sm-2 col-md-7">{{function_rule.ten_cn}}</div>
                <div class="col-sm-2 col-md-1 text-rule"> 
                    <div class="field" >
                        <b-checkbox 
                        v-model="functions_check_rule[index]"  
                        :native-value="function_rule.id_cn +'.'+ 1"
                        @change="changeSlectFunction(index)"
                        ></b-checkbox>
                    </div>
                </div>
                <div class="col-sm-2 col-md-1 text-rule">
                        <div class="field">
                        <b-checkbox :disabled="function_rule.id_cn == 1" v-model="functions_check_rule[index]" :native-value="function_rule.id_cn +'.' + 2"></b-checkbox>
                    </div>
                </div>
                <div class="col-sm-2 col-md-1 text-rule">
                        <div class="field">
                        <b-checkbox  v-model="functions_check_rule[index]" :native-value="function_rule.id_cn +'.' + 3"></b-checkbox>
                    </div>
                </div>
                <div class="col-sm-2 col-md-1 text-rule">
                        <div class="field">
                        <b-checkbox :disabled="function_rule.id_cn == 1" v-model="functions_check_rule[index]" :native-value="function_rule.id_cn +'.' + 4"></b-checkbox>
                    </div>
                </div>  
                <div class="col-sm-2 col-md-1 text-rule">
                        <div class="field">
                        <b-checkbox :disabled="function_rule.id_cn == 1"  v-model="functions_check_rule[index]" :native-value="function_rule.id_cn +'.' + 5"></b-checkbox>
                    </div>
                </div>  
            </div>
            <div class="row">
                <div class="col-sm-12  col-md-2">
                    <b-button v-if="getAction_rule.sua == '1.3'" @click="updateFunctionRule()">Cập nhật</b-button>
                </div>
            </div>
        </div>
    </div>
        <!-- <div class="row">
            <div class="col-sm-12 col-md-6" style="margin:auto">
               
                <div class="card card-function">
                    <p class="background">Danh mục chức năng</p>
                    <form-function  style="padding:15px;" />
                </div>
            </div>
        </div> -->
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        'form-function': () => import('@/components/forms/formfunction.vue')
    },
    data()
    {
        return {
            addgroup: false,
            add_rule: false,
            groups: [],
            users: [],
            group_selected: "",
            users_tmp: [],
            functions: [],
            functions_tmp: [],
            user_selected: null,
            function_rule: [],
            functions_check_rule: []
        }
    },
    computed: {
        ...mapGetters(["getAction_rule"])
    },
    watch:{
        getAction_rule(odlVal, newVal)
        {   
            if(newVal.xem == '1.1' || newVal.sua == '1.3' || odlVal.xem == '1.1' || odlVal.sua == '1.3')
            {
                this.api_groups()
                this.api_user()
                this.api_function()
            }
            else
            {
                this.$router.push("/")
            }
        },
        addgroup(newVal)
        {
            if(newVal == true)
            {
                this.api_groups()
            }
        },
        add_rule(newVal)
        {
            if(newVal == true)
            {
                this.api_rule()
            }
        },
        group_selected(newVal)
        {
            if(newVal != '')
            {
                this.users = this.users_tmp.filter((value,index,array) => {
                    return array[index].id_nhom == newVal
                })
            }
            else
            {
                this.users = this.users_tmp
            }
        },
        user_selected(newVal)
        {
            this.api_function_rule(newVal)
        },
        functions_check_rule(newVal)
        {
            const test = newVal
            console.log(newVal)
            // newVal.forEach((check) => {
            //     if(check.length > 4)
            //     {
            //         for (let index = 4; index < check.length; index++) {
            //             check_tmmp = check[check[index].slice(2,3) - 1]
            //             check[check[index].slice(2,3) - 1] = check[index]
            //         }
            //     }
            // })
            
        }
    },
    methods: {
        ...mapActions(["commit_Update"]),
        api_groups()
        {
            this.axios.get(this.$store.state.config.API_URL + 'group_user?api_token='+this.$session.get('token')).then((response) => {
                this.groups = response.data
            })
        },
        api_user()
        {
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                this.users = response.data
                this.users_tmp = response.data
            })
        },
        api_function()
        {
            this.axios.get(this.$store.state.config.API_URL + 'functions').then((response) => {
                console.log(response.data.results)
                this.functions = response.data.results
                this.functions_tmp = response.data.results
            })
        },
        api_function_rule($id)
        {
            this.axios.get(this.$store.state.config.API_URL + 'function_user?ID_ND='+$id).then((response) => {
                this.function_rule = response.data
                const check_rule = []
                var object =[]
                console.log('length',this.functions.length)
                if(this.functions.length > 0)
                {
                    for (let index = 0; index < this.functions.length; index++) {
                        check_rule.push([]) 
                    }
                    for (let index = 0; index < response.data.length; index++) {
                        console.log('result',response.data.results)
                        object.push(response.data[index].cn_xem)
                        object.push(response.data[index].cn_tao)
                        object.push(response.data[index].cn_sua)
                        object.push(response.data[index].cn_xoa)
                        object.push(response.data[index].cn_xuat_file)
                        console.log('lenght',response.data[index].cn_xem -1 )
                        check_rule[response.data[index].id_cn -1 ] = object
                        object= []
                        
                    }
                    this.functions_check_rule  = check_rule   
                }
                else
                {
                    this.functions_check_rule.push([])
                }
               
                               
            })
        },
        updateFunctionRule()
        {
            this.functions_check_rule.forEach((check) => {
            
                    if(check.length >= 1)
                    {
                        const id_function = check[0].slice(0,1)
                        const value_function = []
                        const function_view = null
                        check.sort()
                        const functions = []
                        const data = new FormData()
                        data.append("ID_ND",this.user_selected)
                        data.append("ID_CN", id_function)
                        data.append("FUNCTIONS",check)
                        const app = this;
                        this.axios.post(this.$store.state.config.API_URL + 'function_user', data).then((response) => {
                            app.commit_Update(true)
                            app.$buefy.notification.open({
                                duration: 1500,
                                message: `Cập nhật quyền cho người dùng thành công`,
                                position: 'is-bottom-right',
                                type: 'is-success',
                                hasIcon: true
                            })
                        }).catch(() => {
                            app.$buefy.notification.open({
                                duration: 1500,
                                message: `Cập nhật quyền cho người dùng thất bại`,
                                position: 'is-bottom-right',
                                type: 'is-danger',
                                hasIcon: true
                            })
                        })
                    }
                    
            })
        }
    },

    
}
</script>

<style scoped>
.background {padding: 7px 15px;background: #0051e9; color: #fff;}
.card-rule {padding: 10px}
.radio-group {margin: 7px;height: 28px;}
.text-rule {text-align: center;font-size: 12px;}
.card-function {margin-top: 25px;}
</style>

