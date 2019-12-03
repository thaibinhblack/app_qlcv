<template>
    <section id="section-users">
         <b-field grouped group-multiline>
            <div v-for="(column, index) in columnsVisible"
                 :key="index"
                 class="control">
                <b-checkbox v-model="column.display">
                    {{ column.title }}
                </b-checkbox>
            </div>
        </b-field>
        <div class="columns">
            <div class="column is-3 is-desktop">
                <b-field width="100%">
                        <b-select placeholder="Quyền hệ thống" v-model="rule_selected" expanded> 
                            <option value="all">Tất cả</option>
                            <option
                                v-for="rule in rules"
                                :value="rule.ID_RULE"
                                :key="rule.ID_RULE">
                                {{ rule.NAME_RULE }}
                            </option>
                        </b-select>
                    </b-field>
            </div>
            <div class="column is-4 is-desktop">
                <b-input placeholder="Nhập username cần tìm kiếm"
                    v-model="search"
                    type="text"
                    icon="magnify">
                </b-input>
            </div>
        </div>
         <JqxGrid 
            :width="getWidth"
             :source="data" 
             :columns="columns" :columnsresize="true" 
             :pageable="true">    
    </JqxGrid>
    </section>
</template>

<script>
    import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
    export default {
        components: { JqxGrid },
        data() {
            return {
                data,
                data_tmp: [],
                checkboxPosition: 'left',
                checkedRows: [],
                edit_user: '',
                columns: [
        
                    {
                        field: 'ID_RULE',
                        label: 'ID_RULE',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'USERNAME',
                        label: 'Username',
                    },
                    {
                        field: 'EMAIL',
                        label: 'Email',
                      
                    },
                    {
                        field: 'GENDER',
                        label: 'Giới tính',
                      
                    },
                    {
                        field: 'PHONE',
                        label: 'SĐT',
                      
                    },
                    {
                        field: 'NAME',
                        label: 'Họ & Tên',
                      
                    },
                    {
                        field: 'BIRTH_DAY',
                        label: 'Ngày sinh',
                      
                    },
                    {
                        field: 'ADDRESS',
                        label: 'Địa chỉ',
                      
                    },
                    {
                        field: 'ACTION',
                        label: 'Thao tác'
                    }
                    
                ],
                columnsVisible: {
                    ID_RULE: { title: 'Quyền', display: true },
                    USERNAME: { title: 'Username', display: true },
                    EMAIL: { title: 'Email', display: true },
                    GENDER: {title: 'Giới tính' ,display: true},
                    PHONE: {title: 'SĐT', display: false},
                    NAME: {title: 'Họ & Tên', display: false},
                    BIRTH_DAY: {title: 'Ngày sinh', display: false},
                    ADDRESS: {title: 'Địa chỉ', display: false}
                },
                rules: [],
                rule_selected: 'all',
                search: ''
            }
        },
        watch: {
            rule_selected(newVal)
            {
                if(newVal == 'all')
                {
                    this.data = this.data_tmp
                }
                else
                {
                    this.data =this.data_tmp.filter((value, index,array) => {
                        return array[index].ID_RULE == newVal
                    })
                }
            },
            search(newVal)
            {
                if(newVal != '')
                {   
                    const search = '/'+newVal+'/i'
                    this.data = this.data_tmp.filter((value,index,array) => {
                        return array[index].USERNAME.match(search)
                    })
                }
                else
                {
                    this.data = this.data_tmp
                }
                
                //  var str = "Visit W3Schools";
                // var patt = /w3schools/i;
                // var result = str.match(patt);
            }
        },
        methods:
        {
            api_rules()
            {
                this.$http.get(this.$store.state.config.API_URL + 'rules?api_token='+this.$session.get('token')).then((response) => {
                    this.rules = response.data.results
                })
            },
            api_users()
            {
                this.$http.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                    this.data = response.data.result
                    this.data_tmp = response.data.result
                })
            },
            edit(ID)
            {
                alert(ID)
            },
            next()
            {

            }
        },
        created()
        {
            this.api_users()
            this.api_rules()
        }
    }
</script>

<style scoped>
#section-users {padding: 50px 0;}
</style>

