<template>
<div class="row">
    <div class="col-sm-12 col-md-12">
        <div class="avatar">
            <img v-if="getUser.avatar != null" :src="$store.state.config.PUBLIC_URL + getUser.avatar" >
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