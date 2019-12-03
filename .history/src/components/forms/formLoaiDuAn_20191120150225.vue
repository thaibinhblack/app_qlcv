<template>
 <form @submit.prevent="api_function()" class="form-rule" style="padding: 15px;">
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
</form>
</template>

<script>
export default {
    data()
    {
        return {
            loai_du_an: {
                trang_thai_loai_du_an: 1
            }
        }
    }
}
</script>