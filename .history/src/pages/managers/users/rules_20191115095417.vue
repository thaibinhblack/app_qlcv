<template>
<div id="page-rule" class="row">
    <div class="col-sm-12" style="margin-top:50px">
      
        <div class="row">
            <div class="col-md-2" style="padding:0">
                 <p class="background">DS người dùng</p>
                    <div class="card card-rule">
                        <b-field>
                            <b-select v-model="group_selected" placeholder="Danh sách phòng ban">
                                <option value="">
                                Tất cả phòng
                                </option>
                                <option v-for="(group,index) in groups" :key="index" :value="group.ID_GROUP">{{group.NAME_GROUP}}</option>
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
            <div class="col-md-10">
                <p class="background">Danh sách chức năng theo người dùng</p>
                {{functions_check_rule}}
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
                                <b-checkbox v-model="functions_check_rule[index]" :native-value="function_rule.ID_FUNCTION +'.' + 2"></b-checkbox>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-1 text-rule">
                             <div class="field">
                                <b-checkbox v-model="functions_check_rule[index]" :native-value="function_rule.ID_FUNCTION +'.' + 3"></b-checkbox>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-1 text-rule">
                             <div class="field">
                                <b-checkbox v-model="functions_check_rule[index]" :native-value="function_rule.ID_FUNCTION +'.' + 4"></b-checkbox>
                            </div>
                        </div>  
                        <div class="col-sm-2 col-md-1 text-rule">
                             <div class="field">
                                <b-checkbox v-model="functions_check_rule[index]" :native-value="function_rule.ID_FUNCTION +'.' + 4"></b-checkbox>
                            </div>
                        </div>  
                    </div>
                    <div class="row">
                        <div class="col-sm-12  col-md-2">
                            <b-button @click="updateFunctionRule()">Cập nhật</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-6" style="margin:auto">
               
                <div class="card card-function">
                    <p class="background">Danh mục chức năng</p>
                    <form-function  style="padding:15px;" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
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
    watch:{
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
                this.rules = this.rules_tmp.filter((value,index,array) => {
                    return array[index].ID_GROUP == newVal
                })
            }
            else
            {
                this.rules = this.rules_tmp
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
        api_groups()
        {
            this.axios.get(this.$store.state.config.API_URL + 'groups').then((response) => {
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
                        object.push(response.data.results[index].FUNCTION_VIEW)
                        object.push(response.data.results[index].FUNCTION_CREATE)
                        object.push(response.data.results[index].FUNCTION_EDIT)
                        object.push(response.data.results[index].FUNCTION_DELETE)
                        console.log('lenght',response.data.results[index].ID_FUNCTION -1 )
                        check_rule[response.data.results[index].ID_FUNCTION -1 ] = object
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
                        data.append("ID_USER",this.user_selected)
                        data.append("ID_FUNCTION", id_function)
                        data.append("FUNCTIONS",check)
                        this.axios.post(this.$store.state.config.API_URL + 'function_rule', data).then((response) => {
                            console.log(response.data)
                        })
                    }
                    
            })
        }
    },
    created()
    {
        // this.api_groups()
        this.api_user()
        this.api_function()
    }
    
}
</script>

<style scoped>
.background {padding: 7px 15px;background: #0051e9; color: #fff;}
.card-rule {padding: 10px}
.radio-group {margin: 7px;height: 28px;}
.text-rule {text-align: center;font-size: 12px;}
.card-function {margin-top: 25px;}
</style>

