<template>
 <form @submit.prevent="api_du_an()" class="form-rule" style="padding: 15px;">
    <div class="row">
        <div class="col-sm-12 col-md-6">
                <b-filed>
                    <b-input type="text" placeholder="Nhập tên thuộc tinh" label="Tên thuộc tính"></b-input>
                </b-filed>
        </div>
        <div class="col-sm-12 col-md-12">
            <button v-if="getAction_danhmuc.them == '5.2'" type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
            <button v-if="getAction_danhmuc.sua == '5.3'" type="button" :disabled="!update" class="btn btn-warning btn-form" @click="updateLoaiDuAn()">Cập nhật</button>
            <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
    
        </div>
    </div>

</form>
</template>

<script>
import { mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
    components: {
        Multiselect
    },
    props: ["update", "du_an_edit", "users"],
    data()
    {
        return {
            du_an: {
                trang_thai_du_an: 1
            },
            loai_du_an: [],
            selected_user_ql: {},
        }
    },
    computed: {
        ...mapGetters(["getAction_danhmuc"])
    },
    watch:
    {
        du_an_edit(newVal)
        {
            this.du_an = newVal
            this.selected_user_ql = this.users.filter((value,index,array) => {
                return array[index].id_nd == newVal.id_ql
            })[0]
        }
    },
    methods: {
        api_loai_du_an()
        {
            this.axios.get(this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$cookies.get('token')).then((response) => {
                 this.loai_du_an = response.data
            })
        },
        api_du_an()
        {
            const du_an = new FormData();
            du_an.append("P_TEN_DU_AN", this.du_an.ten_du_an);
            du_an.append("P_ID_LOAI_DA",this.du_an.id_loai_da)
            du_an.append("P_MO_TA_DU_AN", this.du_an.mo_ta_du_an);
            du_an.append("P_GHI_CHU_DU_AN", this.du_an.ghi_chu_du_an);
            du_an.append("P_TRANG_THAI_DU_AN", this.du_an.trang_thai_du_an);
            du_an.append("P_ID_QL",this.selected_user_ql.id_nd)
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'du-an?api_token='+this.$cookies.get('token'),du_an).then((response) => {
                app.du_an = {
                    trang_thai_du_an: 1
                }
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: 'is-success',
                    hasIcon: true
                })
                app.$emit('create', true)
            })
        },
        updateLoaiDuAn()
        {
            const du_an = new FormData();
            du_an.append("P_TEN_DU_AN", this.du_an.ten_du_an);
            du_an.append("P_ID_LOAI_DA",this.du_an.id_loai_da)
            du_an.append("P_MO_TA_DU_AN", this.du_an.mo_ta_du_an);
            du_an.append("P_GHI_CHU_DU_AN", this.du_an.ghi_chu_du_an);
            du_an.append("P_TRANG_THAI_DU_AN", this.du_an.trang_thai_du_an);
            du_an.append("P_ID_QL",this.selected_user_ql.id_nd)
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'du-an/'+this.du_an.id_du_an+'?api_token='+this.$cookies.get('token'),du_an).then((response) => {
                app.du_an = {
                    trang_thai_du_an: 1
                }
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: 'is-success',
                    hasIcon: true
                })
                this.$emit('clear',false)
            })
        },
        
    },
    created()
    {
        this.api_loai_du_an()
    }
}
</script>