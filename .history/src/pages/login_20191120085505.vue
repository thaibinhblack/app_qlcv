<template>
<div id="page-login">
    <form class="form-login" @submit.prevent="login()">
        <div class="logo" style="text-align:center">
            <img src="../assets/images/logo/vnpt.png" width="75px" height="auto" alt="vnpt">
        </div>
        <h3>Đăng nhập</h3>
        <b-field class="label-login" label="Username">
            <b-input  v-model="user.username"
            placeholder="Nhập tài khoản"
            required
            icon="account"></b-input>
        </b-field>
        <b-field class="label-login"  label="Password">
            <b-input v-model="user.password" icon="key"
            type="password"
            password-reveal
            required
            placeholder="Nhập mật khẩu"></b-input>
        </b-field>
        <b-button  native-type="submit" class="btn-login">Đăng nhập</b-button>
        {{token}}
    </form>
</div>
</template>

<script>
export default {
    data()
    {
        return {
            user: {},
            token: ''
        }
    },
    methods: {
        login()
        {
            const user = new FormData()
            user.append("USERNAME",this.user.username)
            user.append("PASSWORD",this.user.password)
            this.$http.post(this.$store.state.config.API_URL + "login",user).then((response) => {
                this.$buefy.loading.open()
                if(response.data.success == false)
                {
                    alert(response.data.message)
                }
                else
                {
                    this.token = response.data.reuslt
                    console.log(response.data)
                    this.$session.set('token',response.data.result)
                    this.$router.push('/')
                }
               
            })
            this.$buefy.loading.close()
        }
    },
    created()
    {
        console.log(this.$session.get('token'))
        if(this.$session.has('token'))
        {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
#page-login {height: 100%;background: #eeeeee;background-image: url('../assets/images/bacground-login.jpg');
background-size: cover}
#page-login .form-login {width: 500px; margin: auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);
padding: 50px 15px;background: #fff;
border: 1px solid #e2e2e2;}
.form-login  h3 {text-transform: uppercase;text-align: center;font-weight: bold;margin: 25px 0;font-size: 22px;margin-top: 10px;}
.label{text-align: left}
.btn-login {margin-top: 25px;}
</style>