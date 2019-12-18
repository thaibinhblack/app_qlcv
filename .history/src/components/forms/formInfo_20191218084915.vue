<template>
<form @submit.prevent="api_create_customer()" class="form-rule row" style="padding: 15px;">
    <div class="col-sm-12 col-md-6">
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
    </div>
</form>
</template>