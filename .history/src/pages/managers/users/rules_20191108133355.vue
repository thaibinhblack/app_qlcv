<template>
<div id="page-rule" class="row">
    <div class="col-sm-12">
        <div>
           
            <div class="row">
                <div class="col-md-6 sm-12">
                    <div class="card">
                         <p class="background">Danh mục phòng ban</p>
                        <form-group @addgroup="addgroup = $event" />
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                     <div class="card">
                         <p class="background">Danh mục quyền</p>
                     <form-rule :groups="groups" @add_rule="add_rule = $event" />
                     </div>
                </div>
            </div>
        </div>
        
    </div>
    <div class="col-sm-12" style="margin-top:50px">
        <div class="row">
            <div class="col-md-2" style="padding:0">
                 <p class="background">Danh sách quyền</p>
                <div class="card card-rule">
                    <b-field>
                        <b-select v-model="group_selected" placeholder="Danh sách phòng ban">
                            <option value="">
                            Tất cả phòng
                            </option>
                            <option v-for="(group,index) in groups" :key="index" :value="group.ID_GROUP">{{group.NAME_GROUP}}</option>
                        </b-select>
                    </b-field>
                    <b-radio v-for="(rule,index) in rules"
                        :key="index"
                        v-model="rule_selected"
                        width="100%"
                        name="name"
                        class="radio-group"
                        :native-value="rule.ID_RULE">
                        {{rule.NAME_RULE}}
                    </b-radio>
                </div>
            </div>
            <div class="col-md-10">
                <p class="background">Danh sách chức năng theo quyền</p>
                {{functions_check_rule}}
                <div class="card card-rule">
                    <div class="row" style="padding: 10px 0">
                        <div class="col-sm-4 col-md-4 ">Tên chức năng</div>
                        <div class="col-sm-2 text-rule"> Xem</div>
                        <div class="col-sm-2 text-rule">Thêm</div>
                        <div class="col-sm-2 text-rule">Sửa</div>
                        <div class="col-sm-2 text-rule">Xóa</div>  
                    </div>
                    <div class="row" style="margin:7px 0" v-for="(function_rule, index) in functions" :key="index">
                        <div class="col-sm-2 col-md-4">{{function_rule.NAME_FUNCTION}}</div>
                        <div class="col-sm-2 col-md-2 text-rule"> 
                            <div class="field" >
                                <b-checkbox 
                                v-model="functions_check_rule[index]"  
                                :native-value="function_rule.ID_FUNCTION +'.'+ 1"
                                @change="changeSlectFunction(index,)"
                                ></b-checkbox>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-2 text-rule">
                             <div class="field">
                                <b-checkbox v-model="functions_check_rule[index]" :native-value="function_rule.ID_FUNCTION +'.' + 2"></b-checkbox>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-2 text-rule">
                             <div class="field">
                                <b-checkbox v-model="functions_check_rule[index]" :native-value="function_rule.ID_FUNCTION +'.' + 3"></b-checkbox>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-2 text-rule">
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
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-rule': () => import('@/components/forms/formrule.vue'),
        'form-group': () => import('@/components/forms/formgroup.vue')
    },
    data()
    {
        return {
            addgroup: false,
            add_rule: false,
            groups: [],
            rules: [],
            group_selected: "",
            rules_tmp: [],
            functions: [],
            functions_tmp: [],
            rule_selected: null,
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
        rule_selected(newVal)
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
        api_rule()
        {
            this.axios.get(this.$store.state.config.API_URL + 'rules').then((response) => {
                this.rules = response.data.results
                this.rules_tmp = response.data.results
            })
        },
        api_function()
        {
            this.axios.get(this.$store.state.config.API_URL + 'functions').then((response) => {
                this.functions = response.data.results
                this.functions_tmp = response.data.results
            })
        },
        api_function_rule($id)
        {
            this.axios.get(this.$store.state.config.API_URL + 'function_rule/'+$id).then((response) => {
                this.function_rule = response.data.results
                const check_rule = []
                var object =[]
                for (let index = 0; index < this.functions.length; index++) {
                    check_rule.push([]) 
                }
                for (let index = 0; index < response.data.results.length; index++) {
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
                console.log(response.data.results.length, this.functions.length,(this.functions.length - response.data.results.length) + 1)
                // if(response.data.results.length > 0)
                // {
                    
                //     console.log(response.data.results.length,(this.functions.length - response.data.results.length) )
                //     for (let index = response.data.results.length  ; index < (this.functions.length - response.data.results.length) + 1; index++) {
                //         const object_function = []
                //         // console.log('test',index,this.functions[index],this.functions[index].ID_FUNCTION )
                //         // object_function.push(this.functions[index].ID_FUNCTION + '.' +0, this.functions[index].ID_FUNCTION + '.' + 0,
                //         // this.functions[index].ID_FUNCTION + '.' + 0, this.functions[index].ID_FUNCTION + '.' + 0)
                //         // console.log('object',object_function)
                //         this.functions_check_rule.push(object_function)
                        
                //     }
                // }
                // else
                // {
                   
                //     for (let index = 0; index < (this.functions.length - response.data.results.length); index++) {
                //          const object_function  = []
                //         // object_function.push(this.functions[index].ID_FUNCTION + '.' +0, this.functions[index].ID_FUNCTION + '.' + 0,
                //         // this.functions[index].ID_FUNCTION + '.' + 0, this.functions[index].ID_FUNCTION + '.' + 0)
                //         this.functions_check_rule.push(object_function)
                        
                //     }
                // }
               
                  
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
                        const lenght = 0;
                        check.forEach((value) => {
                            if(value.slice(0,1) == id_function)
                            {
                                lenght = lenght + 1;
                            }
                        })
                        console.log(lenght)
                        const data = new FormData()
                        data.append("ID_RULE",this.rule_selected)
                        data.append("ID_FUNCTIONS", id_function)
                        // data.append("FUNCTIONS",value_function)
                        // data.append("FUNCTION_CREATE",function_create)
                        // data.append("FUNCTION_EDIT",function_edit)
                        // data.append("FUNCTION_DELETE",function_delete)
                        // console.log('test',check)
                        // this.axios.post(this.$store.state.config.API_URL + 'function_rule', data).then((response) => {
                        //     console.log(response.data)
                        // })
                    }
                    
            })
        }
    },
    created()
    {
        this.api_groups()
        this.api_rule()
        this.api_function()
    }
    
}
</script>

<style scoped>
.background {padding: 7px 15px;background: #0051e9; color: #fff;}
.card-rule {padding: 10px}
.radio-group {margin: 7px;height: 28px;}
.text-rule {text-align: center}
</style>

