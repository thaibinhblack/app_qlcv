<template>
    <form>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Tài khoản</label>
            <div class="col-sm-10">
            <b-input type="text" placeholder="Username" icon="account" v-model="user.username_nd"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3"  class="col-sm-2 col-form-label">Mật khẩu</label>
            <div class="col-sm-10">
            <b-input type="password" password-reveal placeholder="Password" icon="key" v-model="user.password_nd"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label" >Email</label>
            <div class="col-sm-10">
            <b-input type="email" v-model="user.email_nd"  placeholder="example@gmail.com" icon="email" ></b-input>
            </div>
        </div>
        <fieldset class="form-group">
            <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Giới tính</legend>
            <div class="col-sm-10">
                <div class="form-check">
                <b-radio v-model="user.gt_nd"
                        name="name"
                        native-value="1">
                        Nam
                </b-radio>
                    <b-radio v-model="user.gt_nd"
                        name="name"
                        native-value="0">
                        Nữ
                    </b-radio>
                </div>
            </div>
            </div>
        </fieldset>

        <div class="form-group row">
            <div class="col-sm-10">
            <button type="button"  class="btn btn-primary btn-form" @click="api_resignter_user()">Thêm</button>
            <button type="submit" class="btn btn-warning btn-form">Sửa</button>
            <button type="submit" class="btn btn-danger btn-form">Xóa</button>
            </div>
            
        </div>
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:["user_edit","update"],
    data()
    {
        return {
            user : {}
        }
    },
    watch:{
        user_edit(newVal)
        {
           
            this.user = newVal
        }
    },
    computed: 
    {
            ...mapGetters(["getView","getCreate","getEdit","getDelete"])
    },
    methods:
    {
        api_resignter_user()
        {
            const user  = new FormData();
            user.append("USERNAME",this.user.USERNAME)
            user.append("PASSWORD",this.user.PASSWORD)
            this.axios.post(this.$store.state.config.API_URL + 'resignter',user).then((response) => {
                console.log(response.data)
            })
        }
    }
}
</script>

<style scoped>
.btn-form {margin-left: 10px;}
</style>