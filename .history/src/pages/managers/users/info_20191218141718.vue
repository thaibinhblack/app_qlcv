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
                <chart-cong-viec :dataset="dataset" />
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
        'form-password': () => import('@/components/forms/formPassword.vue'),
        'chart-cong-viec': () => import('@/components/charts/chartCongviec.vue')

    },
    data(){
        return {
            dataset: []
        }
    },
    computed:{
        ...mapGetters(["getUser"])
    },
    methods: {
         api_loai_cv()
            {
                this.axios.get(this.$store.state.config.API_URL + 'thong-ke?api_token='+this.$cookies.get('token')).then((response) => {
                    this.dataset = response.data
                    console.log(response.data)
                })
            },
    },
    created()
    {
        this.api_loai_cv()
    }
}
</script>

