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
            <div class="col-md-2">
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
                    <b-checkbox v-for="(rule,index) in rules"
                        :key="index"
                        v-model="radio"
                        width="100%"
                        name="name"
                        class="radio-group"
                        :native-value="rule.ID_RULE">
                        {{rule.NAME_RULE}}
                    </b-checkbox>
                </div>
            </div>
            <div class="col-md-10">
                <p class="background">Danh sách chức năng theo quyền</p>
                <div class="card card-rule">
                    <div class="row" style="padding: 10px 0">
                        <div class="col-sm-2 text-rule">Tên chức năng</div>
                        <div class="col-sm-2 text-rule"> Xem</div>
                        <div class="col-sm-2 text-rule">Thêm</div>
                        <div class="col-sm-2 text-rule">Sửa</div>
                        <div class="col-sm-2 text-rule">Xóa</div>  
                    </div>
                    <div class="row" style="margin:7px 0">
                        <div class="col-sm-2">Quản lý user</div>
                        <div class="col-sm-2 text-rule"> 
                            <div class="field">
                                <b-checkbox></b-checkbox>
                            </div>
                        </div>
                        <div class="col-sm-2 text-rule">
                             <div class="field">
                                <b-checkbox></b-checkbox>
                            </div>
                        </div>
                        <div class="col-sm-2 text-rule">
                             <div class="field">
                                <b-checkbox></b-checkbox>
                            </div>
                        </div>
                        <div class="col-sm-2 text-rule">
                             <div class="field">
                                <b-checkbox></b-checkbox>
                            </div>
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
            rules_tmp: []
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
        }
    },
    created()
    {
        this.api_groups()
        this.api_rule()
    }
    
}
</script>

<style scoped>
.background {padding: 7px 15px;background: #0051e9; color: #fff;}
.card-rule {padding: 10px}
.radio-group {margin: 7px;height: 28px;}
.text-rule {text-align: center}
</style>

