<template>
<div id="page-login">
    <form class="form-login">
        <h3>Đăng nhập</h3>
        <b-field class="label-login" label="Username">
            <b-input  v-model="user.username"
            icon="account"></b-input>
        </b-field>
        <b-field class="label-login"  label="Password">
            <b-input v-model="user.password" icon="key"></b-input>
        </b-field>
    </form>
</div>
</template>

<script>
export default {
    data()
    {
        return {
            user: {}
        }
    }
}
</script>

<style scoped>
#page-login {height: 100%}
#page-login .form-login {width: 500px; margin: auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);
padding: 50px 15px;
border: 1px solid #e2e2e2;}
.label{text-align: left}
</style>