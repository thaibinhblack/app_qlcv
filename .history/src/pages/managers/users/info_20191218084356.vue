<template>
<div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-12">
            <div class="avatar">
                <img v-if="getUser.avatar != null" :src="$store.state.config.PUBLIC_URL + getUser.avatar" >
            </div>
        </div>
        <div class="col-sm-5 col-md-4">
            <ul class="list-action">
                <li>Thông tin cá nhân</li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters(["getUser"])
    }
}
</script>

<style scoped>
.avatar, .avatar img {width: 120px;height: 120px; border-radius: 50%;background: #e2e2e2;margin: auto}
</style>