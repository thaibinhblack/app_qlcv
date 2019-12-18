<template>
<div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-12">
            <div class="avatar">
                <img v-if="getUser.avatar != null" :src="$store.state.config.PUBLIC_URL + getUser.avatar" >
            </div>
        </div>
         <b-tabs
  
                vertical
                :expanded="false">
            <b-tab-item label="Pictures" icon="google-photos">
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet.
            </b-tab-item>

            <b-tab-item label="Music" icon="library-music">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </b-tab-item>

            <b-tab-item label="Videos" icon="video" disabled>
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
        </b-tabs>
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