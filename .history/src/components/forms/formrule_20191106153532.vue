<template>
    <form class="form-rule">
        <div class="form-group row ">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Danh mục phòng</label>
            <div class="col-sm-8">
                 <b-field>
                    <b-select placeholder="Danh sách phòng">
                        <option>
                           Tất cả phòng
                        </option>
                    </b-select>
                </b-field>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Mã quyền</label>
            <div class="col-sm-8">
            <b-input type="text" placeholder="Mã quyền" icon="key" ></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Tên quyền</label>
            <div class="col-sm-8">
            <b-input type="text"  placeholder="Tên quyền" icon="key"></b-input>
            </div>
        </div>


        <div class="form-group row">
            <div class="col-sm-8">
            <button type="submit" class="btn btn-primary btn-form">Thêm</button>
            <button type="submit" class="btn btn-warning btn-form">Sửa</button>
            <button type="submit" class="btn btn-danger btn-form">Xóa</button>
            </div>
            
        </div>
    </form>
</template>
<style scoped>
.btn-form {margin-left: 10px;}
.form-rule {padding: 15px;}
</style>