<template>
    <form class="form-rule">
        <div class="form-group row ">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Danh mục phòng</label>
            <div class="col-sm-8">
                 <b-field>
                    <b-select v-model="group_selected" placeholder="Danh sách phòng">
                        <option value="">
                           Tất cả phòng
                        </option>
                        <option v-for="(group,index) in groups" :key="index" :value="group.ID_GROUP">{{group.NAME_GROUP}}</option>
                    </b-select>
                </b-field>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên quyền</label>
            <div class="col-sm-8">
            <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="rule.NAME_RULE"></b-input>
            </div>
        </div>


        <div class="form-group row">
            <div class="col-sm-8">
            <button @click="add_rule()" type="button" class="btn btn-primary btn-form">Thêm</button>
            <button type="submit" class="btn btn-warning btn-form">Sửa</button>
            <button type="submit" class="btn btn-danger btn-form">Xóa</button>
            </div>
            
        </div>
    </form>
</template>

<script>
export default {
    props: ["groups"],
    data()
    {
        return {
            group_selected: "",
            rule: {

            }
        }
    },
    methods:{
        add_rule()
        {
            const rule =  new FormData()
            rule.append("ID_GROUP",this.group_selected)
            rule.append("NAME_RULE",this.rule.NAME_RULE)
            this.axios.post(this.$store.state.config.API_URL + 'rule',rule).then(() => {
                this.rule = {}
                this.$emit("add_rule",true)
            })
        }
    }
}
</script>
<style scoped>
.btn-form {margin-left: 10px;}
.form-rule {padding: 15px;}
</style>