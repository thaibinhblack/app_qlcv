<template>
<form @submit.prevent="api_loai_cv()" class="form-rule" style="padding: 15px;">

    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Tên loại công việc</label>
        <div class="col-sm-9">
        <b-input type="text"  placeholder="Tên dự án" v-model="loai_cv.ten_loai_cv"></b-input>
        </div>
    </div>

    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Mô tả</label>
        <div class="col-sm-9">
            <b-input type="textarea" v-model="loai_cv.mo_ta" minlength=""
            maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
        </div>
    </div>
    
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Trạng thái</label>
        <div class="col-sm-9">
            <b-field>
                <b-select v-model="loai_cv.trang_thai">
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
            <button type="button" :disabled="!update" class="btn btn-warning btn-form" @click="updateDuAn()">Cập nhật</button>
            <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
        </div>
    </div>
</form>
</template>

<script>
export default {
    data()
    {
        return {
            loai_cv: {
                trang_thai: 1
            }
        }
    }
}
</script>