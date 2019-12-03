<template>
<div id="page-customer">
    <div class="row">
        <div class=" col-md-8 col-lg-7 col-sm-12" style="margin:auto">
            <div class="card" style="padding: 15px;">
                <form class="form-rule">
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên khách hàng</label>
                        <div class="col-sm-8">
                            <b-input type="text"  placeholder="Tên khách hàng" required></b-input>
                        </div>
                    </div>
                     <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Địa chỉ khách hàng</label>
                        <div class="col-sm-8">
                            <b-input type="text"  placeholder="Địa chỉ khách hàng" required></b-input>
                        </div>
                    </div>
                     <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >SĐT khách hàng</label>
                        <div class="col-sm-8">
                            <b-input type="text"  placeholder="Số điện thoại khách hàng" required></b-input>
                        </div>
                    </div>
                     <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Người đại diện</label>
                        <div class="col-sm-8">
                            <b-input type="text"  placeholder="Người dại diện" required></b-input>
                        </div>
                    </div>
                    <div class="form-group row">
            <div class="col-sm-8">
                <button type="button" :disabled="update"  class="btn btn-primary btn-form" @click="api_resignter_user()">Thêm</button>
                <button type="submit" class="btn btn-warning btn-form">Sửa</button>
                <button type="submit" class="btn btn-danger btn-form">Xóa</button>
            </div>
            
        </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>