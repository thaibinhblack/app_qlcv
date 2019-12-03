<template>
<div id="page-login">
    <form class="form-login">
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
.label{text-align: left}
</style>