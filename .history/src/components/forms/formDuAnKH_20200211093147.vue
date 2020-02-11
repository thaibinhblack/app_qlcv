<template>
<form @submit.prevent="api_du_an()" class="form-rule row" style="padding: 15px;">
    <div class="col-sm-12 col-md-6">
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-3 col-form-label" >Loại dự án</label>
            <div class="col-sm-9">
                <b-field>
                    <b-select v-model="du_an_kh.id_du_an" required>
                        <option value="0"> --Tất cả loại dự án--</option>
                        <option v-for="(lda,index) in du_an" :key="index" :value="lda.id_du_an"> {{lda.ten_du_an}}</option>
                    </b-select>
                </b-field>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-3 col-form-label" >Tên dự án</label>
            <div class="col-sm-9">
            <b-input type="text"  placeholder="Tên dự án" v-model="du_an_kh.ten_du_an_kh"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-3 col-form-label" >Khách hàng</label>
            <div class="col-sm-9">
                <multiselect v-model="selected_kh" :options="khach_hang" label="ten_kh" track-by="id_khach_hang"  style="z-index:9999"></multiselect>
            </div>
        </div>
       
    </div>
    <div class="col-sm-12 col-md-6">
         <div class="form-group row">
            <label for="inputPassword3" class="col-sm-3 col-form-label" >Mô tả</label>
            <div class="col-sm-9">
                <b-input type="textarea" v-model="du_an_kh.mo_ta_du_an" minlength=""
                maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-3 col-form-label" >Ghi chú</label>
            <div class="col-sm-9">
                <b-input type="text" v-model="du_an_kh.ghi_chu_du_an"  placeholder="Ghi chú"  ></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-3 col-form-label" >Trạng thái</label>
            <div class="col-sm-9">
                <b-field>
                    <b-select v-model="du_an_kh.trang_thai_du_an" required>
                        <option value="0">Chọn trạng thái dự án</option>
                        <option v-for="(trang_thai,index) in getListTrangThai" :key="index" :value="trang_thai.id_trang_thai">
                            {{trang_thai.ten_trang_thai}}
                        </option>
                    </b-select>
                </b-field>
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-9">
        <button v-if="getAction_projects.them == '3.2'" type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
        <button v-if="getAction_projects.sua == '3.3'" type="button" :disabled="!update" class="btn btn-warning btn-form" @click="updateDuAn()">Cập nhật</button>
        <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
    </div>
</form>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
export default {
    props: ["du_an", "update", "du_an_kh_edit"],
    components: {
        Multiselect
    },
    data()
    {
        return {
            du_an_kh : {
                 id_loai_du_an: 0,
                trang_thai_du_an: 0,
                ten_kh: ''
            },
            khach_hang: [],
            khach_hang_tmp: [],
            search: false,
            selected_kh: null
        }
    },
    computed: {
        ...mapGetters(["getAction_projects", "getListTrangThai"])
    },
    watch:
    {
        update(newVal)
        {   
            if(newVal == false)
            {
                this.du_an_kh =  {
                    id_loai_du_an: 0,
                    trang_thai_du_an: 1,
                    ten_kh: ''
                }
            }
        },
        du_an_kh_edit(newVal)
        {
            this.du_an_kh = newVal
        },
        selected_kh(newVal)
        {
            this.du_an.id_khach_hang = newVal
            this.search = false
            this.du_an.ten_kh = this.khach_hang.filter((value,index,array) => {
                return array[index].id_khach_hang == newVal
            })[0].ten_kh
        }
    },
    methods: {
        api_kh()
        {
            this.axios.get(this.$store.state.config.API_URL + 'customers?api_token='+this.$cookies.get('token')).then((response) => {
                this.khach_hang = response.data.results
            })
        },
        api_du_an()
        {
            var app = this;
            if(this.selected_kh.id_khach_hang)
            {
                
                if(!this.du_an_kh.trang_thai_du_an)
                {
                     app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Chưa thêm trạng thái cho dự án',
                        position: 'is-bottom-right',
                        type: 'is-warning',
                        hasIcon: true
                    })
                }
                else
                {
                    const du_an = new FormData();
                    du_an.append("P_ID_DU_AN",this.du_an_kh.id_du_an)
                    du_an.append("P_TEN_DU_AN_KH",this.du_an_kh.ten_du_an_kh)
                    du_an.append("P_MO_TA_DU_AN",this.du_an_kh.mo_ta_du_an)
                    du_an.append("P_GHI_CHU_DU_AN",this.du_an_kh.ghi_chu_du_an)
                    du_an.append("P_TRANG_THAI_DU_AN",this.du_an_kh.trang_thai_du_an)
                    du_an.append("P_ID_KHACH_HANG",this.selected_kh.id_khach_hang)
                    // du_an.append("P_ID_KHACH_HANG",this.du_an.id_loai_du_an)
                    
                    this.axios.post(this.$store.state.config.API_URL + 'du-an-kh?api_token='+this.$cookies.get('token'), du_an).then((response) => {
                        app.du_an_kh = {
                            id_du_an: 0,
                            trang_thai_du_an: 1,
                            ten_kh: ''
                        }
                        app.$buefy.notification.open({
                            duration: 1500,
                            message: response.data.message,
                            position: 'is-bottom-right',
                            type: 'is-success',
                            hasIcon: true
                        })
                        app.$emit('create_project',true)
                    }).catch(() => {
                        app.$buefy.notification.open({
                            duration: 1500,
                            message: 'Lỗi server',
                            position: 'is-bottom-right',
                            type: 'is-danger',
                            hasIcon: true
                        })
                    })
                }
              
            }
            else
            {
                 app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Chưa chọn khách hàng',
                        position: 'is-bottom-right',
                        type: 'is-warning',
                        hasIcon: true
                    })
            }
        },
        updateDuAn()
        {
            const du_an = new FormData();
            du_an.append("P_ID_DU_AN",this.du_an_kh.id_du_an)
            du_an.append("P_TEN_DU_AN_KH",this.du_an_kh.ten_du_an_kh)
            du_an.append("P_MO_TA_DU_AN",this.du_an_kh.mo_ta_du_an)
            du_an.append("P_GHI_CHU_DU_AN",this.du_an_kh.ghi_chu_du_an)
            du_an.append("P_TRANG_THAI_DU_AN",this.du_an_kh.trang_thai_du_an)
            du_an.append("P_ID_KHACH_HANG",this.selected_kh.id_khach_hang)
            // du_an.append("P_ID_KHACH_HANG",this.du_an.id_khach_hang)
            // du_an.append("P_ID_KHACH_HANG",this.du_an.id_loai_du_an)
            const app = this;
            if(!this.du_an_kh.trang_thai_du_an)
            {
                app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Chưa chọn trang thái dự án',
                        position: 'is-bottom-right',
                        type: 'is-wartning',
                        hasIcon: true
                    })
            }
            else
            {
                this.axios.post(this.$store.state.config.API_URL + 'du-an-kh/'+this.du_an_kh.id_du_an_kh+'?api_token='+this.$cookies.get('token'), du_an).then((response) => {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: response.data.message,
                        position: 'is-bottom-right',
                        type: 'is-success',
                        hasIcon: true
                    })
                    this.$emit('clear',false)
                })
            }
           
        },
        searchKH()
        {
            this.search = true
            this.api_kh(this.du_an.ten_kh)
        }
    },
    created()
    {
         this.api_kh()
    }
}
</script>

<style scoped>
.list-kh {position: absolute;width: 100%;left: 0;padding: 15px;z-index: 999;display: none}
.list-kh.active {display: block}
</style>