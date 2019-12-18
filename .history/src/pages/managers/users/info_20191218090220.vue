<template>
<div class="container">
    <div class="row">
        
       <div style="margin:auto;margin-top:25px;" class="col-sm-12 col-md-10 col-lg-9">
             <b-tabs
                vertical
                :expanded="false">
            <b-tab-item label="Thông tin cá nhân" icon="account">
                <form-info />
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
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    components: {
        'form-info': () => import('@/components/forms/formInfo.vue')
    },
    computed:{
        ...mapGetters(["getUser"])
    }
}
</script>

