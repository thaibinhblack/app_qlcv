<template>
<form class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên khách hàng</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="customer.ten_kh"  placeholder="Tên khách hàng" required></b-input>
        </div>
    </div>
        <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Địa chỉ khách hàng</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="customer.dia_chi_kh"  placeholder="Địa chỉ khách hàng" required></b-input>
        </div>
    </div>
        <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >SĐT khách hàng</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="customer.sdt_kh" placeholder="Số điện thoại khách hàng" required></b-input>
        </div>
    </div>
        <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Người đại diện</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="customer.nguoi_dai_dien" placeholder="Người dại diện" required></b-input>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-8">
            <button type="submit"  class="btn btn-primary btn-form" >Thêm</button>
            <button type="button" class="btn btn-warning btn-form">Sửa</button>
            <button type="button" class="btn btn-danger btn-form">Xóa</button>
        </div>          
    </div>
</form>
</template>

<script>
export default {
    data()
    {
        return {
            customer: {

            }
        }
    }
}
</script>