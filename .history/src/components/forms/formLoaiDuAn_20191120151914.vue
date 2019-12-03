<template>
 <form @submit.prevent="api_loai_du_an()" class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên loại dự án</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="loai_du_an.ten_loai_du_an"  placeholder="Tên loại dự án" required></b-input>
        </div>
    </div>
        <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả</label>
        <div class="col-sm-8">
            <b-input type="textarea" v-model="loai_du_an.mo_ta_loai_du_an" minlength=""
            maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="loai_du_an.ghi_chu_loai_du_an"  placeholder="Ghi chú"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái</label>
        <div class="col-sm-8">
            <b-field>
                <b-select v-model="loai_du_an.trang_thai_loai_du_an">
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
            <button type="button" :disabled="!update" class="btn btn-warning btn-form" >Cập nhật</button>
            <button type="submit" :disabled="!update" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
        </div>
    </div>
</form>
</template>

<script>
export default {
    props: ["update"],
    data()
    {
        return {
            loai_du_an: {
                trang_thai_loai_du_an: 1
            }
        }
    },
    methods: {
        api_loai_du_an()
        {
            const loai_du_an = new FormData();
            loai_du_an.append("P_TEN_LOAI_DU_AN", this.loai_du_an.ten_loai_du_an);
            loai_du_an.append("P_MO_TA_LOAI_DU_AN", this.loai_du_an.mo_ta_loai_du_an);
            loai_du_an.append("P_GHI_CHU_LOAI_DU_AN", this.loai_du_an.ghi_chu_loai_du_an);
            loai_du_an.append("P_TRANG_THAI_LOAI_DU_AN", this.loai_du_an.trang_thai_loai_du_an);
            this.axios.post(this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$session.get('token'),loai_du_an).then((response) => {
                console.log(response.data)
            })
        }
    }
}
</script>