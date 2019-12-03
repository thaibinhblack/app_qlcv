<template>
<div id="page-loai-du-an">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-5" style="margin:auto">
            <div class="edit-user card">
                <p class="background">Danh mục loại dự án</p>
                <div class="card">
                    <form @submit.prevent="api_function()" class="form-rule" style="padding: 15px;">
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên loại dự án</label>
                            <div class="col-sm-8">
                                <b-input type="text"  placeholder="Tên loại dự án" required></b-input>
                            </div>
                        </div>
                         <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả</label>
                            <div class="col-sm-8">
                                <b-input type="textarea" minlength=""
                                maxlength="255" placeholder="Mô tả loại dự án"  required></b-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
                            <div class="col-sm-8">
                                <b-input type="text"  placeholder="Ghi chú"  required></b-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng</label>
                            <div class="col-sm-8">
                                <b-field>
                                    <b-select>
                                        <option value="1" selected>Đang hoạt động</option>
                                        <option value="2">Đang bảo trì</option>
                                        <option value="3">Ngừng hoạt động</option>
                                    </b-select>
                                </b-field>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>