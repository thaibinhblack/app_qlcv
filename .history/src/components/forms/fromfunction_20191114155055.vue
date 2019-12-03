<template>
    <form class="form-rule">
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.MA_CN"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.TEN_CN"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.MO_TA_CN"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.GHI_CHU_CN"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.TRANG_THAI_CN"></b-input>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-8">
            <button @click="add_rule()" type="button" class="btn btn-primary btn-form">Thêm</button>
            <button type="submit" class="btn btn-warning btn-form">Sửa</button>
            <button type="submit" class="btn btn-danger btn-form">Xóa</button>
            </div>
            
        </div>
    </form>
</template>