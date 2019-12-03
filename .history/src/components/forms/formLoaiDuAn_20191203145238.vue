<template>
 <form @submit.prevent="api_loai_du_an()" class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên loại dự án</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="loai_du_an.ten_loai_da"  placeholder="Tên loại dự án" required></b-input>
        </div>
    </div>
        <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả</label>
        <div class="col-sm-8">
            <b-input type="textarea" v-model="loai_du_an.mo_ta" minlength=""
            maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="loai_du_an.ghi_chu"  placeholder="Ghi chú"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái</label>
        <div class="col-sm-8">
            <b-field>
                <b-select v-model="loai_du_an.trang_thai">
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
    props: ["update", "loai_du_an_edit"],
    data()
    {
        return {
            loai_du_an: {
                trang_thai: 1
            }
        }
    },
    watch:
    {
        loai_du_an_edit(newVal)
        {
            console.log(newVal)
            this.loai_du_an = newVal
        },
        update(newVal)
        {
            if(newVal == false)
            {
                this.loai_du_an =  {
                    trang_thai: 1
                }
            }
        }
    },
    methods: {
        api_loai_du_an()
        {
            const loai_du_an = new FormData();
            loai_du_an.append("P_TEN_LOAI_DA", this.loai_du_an.ten_loai_da);
            loai_du_an.append("P_MO_TA", this.loai_du_an.mo_ta);
            loai_du_an.append("P_GHI_CHU", this.loai_du_an.ghi_chu);
            loai_du_an.append("P_TRANG_THAI", this.loai_du_an.trang_thai);
            this.axios.post(this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$cookies.get('token'),loai_du_an).then((response) => {
                app.loai_du_an = {
                    trang_thai: 1
                }
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: 'is-success',
                    hasIcon: true
                })
            })
        },
        updateLoaiDuAn()
        {
            const loai_du_an = new FormData();
            loai_du_an.append("P_TEN_LOAI_DA", this.loai_du_an.ten_loai_da);
            loai_du_an.append("P_MO_TA", this.loai_du_an.mo_ta);
            loai_du_an.append("P_GHI_CHU", this.loai_du_an.ghi_chu);
            loai_du_an.append("P_TRANG_THAI", this.loai_du_an.trang_thai);
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'loai-du-an/'+this.loai_du_an.id_loai_da+'?api_token='+this.$cookies.get('token'),loai_du_an).then((response) => {
                app.loai_du_an = {
                    trang_thai: 1
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
    }
}
</script>