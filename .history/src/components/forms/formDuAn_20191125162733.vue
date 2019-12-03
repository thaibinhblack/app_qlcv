<template>
 <form @submit.prevent="api_du_an()" class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Loại dự án</label>
        <div class="col-sm-9">
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
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="du_an.ghi_chu_du_an"  placeholder="Ghi chú"  ></b-input>
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
            <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
            <button type="button" :disabled="!update" class="btn btn-warning btn-form" @click="updateLoaiDuAn()">Cập nhật</button>
            <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
        </div>
    </div>
</form>
</template>

<script>
export default {
    props: ["update", "du_an_edit"],
    data()
    {
        return {
            du_an: {
                trang_thai_du_an: 1
            },
            loai_du_an: []
        }
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
            this.axios.get(this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$session.get('token'))
            {
                this.loai_du_an = response.data
            }
        },
        api_du_an()
        {
            const du_an = new FormData();
            du_an.append("P_TEN_DU_AN", this.du_an.ten_du_an);
            du_an.append("P_MO_TA_DU_AN", this.du_an.mo_ta_du_an);
            du_an.append("P_GHI_CHU_DU_AN", this.du_an.ghi_chu_du_an);
            du_an.append("P_TRANG_THAI_DU_AN", this.du_an.trang_thai_du_an);
            this.axios.post(this.$store.state.config.API_URL + 'du-an?api_token='+this.$session.get('token'),du_an).then((response) => {
                console.log(response.data)
            })
        },
        updateLoaiDuAn()
        {
            const du_an = new FormData();
            du_an.append("P_TEN_DU_AN", this.du_an.ten_du_an);
            du_an.append("P_MO_TA_DU_AN", this.du_an.mo_ta_du_an);
            du_an.append("P_GHI_CHU_DU_AN", this.du_an.ghi_chu_du_an);
            du_an.append("P_TRANG_THAI_DU_AN", this.du_an.trang_thai_du_an);
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'du-an/'+this.du_an.id_du_an+'?api_token='+this.$session.get('token'),du_an).then((response) => {
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
        }
    },
    created()
    {
        this.api_loai_du_an()
    }
}
</script>