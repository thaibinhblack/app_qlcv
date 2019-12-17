<template>
 <form @submit.prevent="api_du_an()" class="form-rule" style="padding: 15px;">
    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div class="form-group row">
                <label for="inputPassword3" class="col-xs-5 col-sm-4 col-form-label" >Loại dự án </label>
                <div class="col-sm-8 col-xs-7">
                    <b-field>
                        <b-select v-model="du_an.id_loai_da" required>
                            <option value="0"> --Tất cả loại dự án--</option>
                            <option v-for="(lda,index) in loai_du_an" :key="index" :value="lda.id_loai_da"> {{lda.ten_loai_da}}</option>
                        </b-select>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên loại dự án</label>
                <div class="col-sm-8">
                    <b-input type="text" v-model="du_an.ten_du_an"  placeholder="Tên loại dự án" required></b-input>
                </div>
            </div>
                <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả</label>
                <div class="col-sm-8">
                    <b-input type="textarea" v-model="du_an.mo_ta_du_an" minlength=""
                    maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="du_an.ghi_chu_du_an"  placeholder="Ghi chú"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Quản lí dự án</label>
        <div class="col-sm-8">
            <b-field>
                  <multiselect  v-model="selected_user_ql" :options="users" label="display_name" track-by="id_nd"></multiselect>
            </b-field>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái</label>
        <div class="col-sm-8">
            <b-field>
                <b-select v-model="du_an.trang_thai_du_an">
                    <option value="1" selected>Đang hoạt động</option>
                    <option value="2">Đang bảo trì</option>
                    <option value="3">Ngừng hoạt động</option>
                </b-select>
            </b-field>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-9">
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
    props: ["update", "du_an_edit"],
    data()
    {
        return {
            du_an: {
                trang_thai_du_an: 1
            },
            loai_du_an: [],
            selected_user_ql: {},
            users: []
        }
    },
    computed: {
        ...mapGetters(["getAction_danhmuc"])
    },
    watch:
    {
        du_an_edit(newVal)
        {
            console.log(newVal)
            this.du_an = newVal
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
            console.log(this.du_an)
            const du_an = new FormData();
            du_an.append("P_TEN_DU_AN", this.du_an.ten_du_an);
            du_an.append("P_ID_LOAI_DA",this.du_an.id_loai_da)
            du_an.append("P_MO_TA_DU_AN", this.du_an.mo_ta_du_an);
            du_an.append("P_GHI_CHU_DU_AN", this.du_an.ghi_chu_du_an);
            du_an.append("P_TRANG_THAI_DU_AN", this.du_an.trang_thai_du_an);
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
        api_users()
        {
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$cookies.get('token')).then((response) => {
                this.users = response.data
            })
        }
    },
    created()
    {
        this.api_loai_du_an()
        this.api_users()
    }
}
</script>