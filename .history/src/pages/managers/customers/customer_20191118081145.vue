<template>
<div id="page-customer">
    <div class="row">
        <div class=" col-md-8 col-lg-7 col-sm-12" style="margin:auto">
            <div class="card" style="padding: 15px;">
                <p class="background">Danh mục khách hàng</p>
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
                            <button type="submit"  class="btn btn-primary btn-form" >Thêm</button>
                            <button type="button" class="btn btn-warning btn-form">Sửa</button>
                            <button type="button" class="btn btn-danger btn-form">Xóa</button>
                        </div>          
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

.btn-form {margin: 0 10px;}
.btn-form:first-child {margin-left: 0;}
</style>