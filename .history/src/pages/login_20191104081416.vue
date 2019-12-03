<template>
<div id="page-login">
    <form class="form-login">
        <b-field label="Username">
            <b-input v-model="user.username"
            icon="account"></b-input>
        </b-field>
        <b-field label="Password">
            <b-input v-model="user.password" icon="key"></b-input>
        </b-field>
    </form>
</div>
</template>