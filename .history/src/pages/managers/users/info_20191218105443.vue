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

            <b-tab-item label="Thay đổi mật khẩu" icon="account-key">
                <form-password />
            </b-tab-item>

            <b-tab-item label="Thống kê công việc" icon="chart">
              
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
        'form-info': () => import('@/components/forms/formInfo.vue'),
        'form-password': () => import('@/components/forms/formPassword.vue')
    },
    computed:{
        ...mapGetters(["getUser"])
    }
}
</script>

