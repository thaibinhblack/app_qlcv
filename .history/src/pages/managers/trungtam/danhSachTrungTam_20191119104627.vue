<template>
<div id="page-ds-trung-tam">
    <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-7" style="margin:auto">
            <div class="card">
                <form action="">
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên Trung Tâm</label>
                        <div class="col-sm-8">
                            <b-input type="text"  placeholder="Mã chức năng" required></b-input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả</label>
                        <div class="col-sm-8">
                            <b-input type="textarea" minlength="    "
                            maxlength="255" placeholder="Mô tả chức năng"   required></b-input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
                        <div class="col-sm-8">
                            <b-input type="text"  placeholder="Mã chức năng" required></b-input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng</label>
                        <div class="col-sm-8">
                            <b-field>
                                <b-select placeholder="Danh sách phòng ban">
                                
                                    <option value="1" selected>Đang hoạt động</option>
                                    <option value="2">Đang bảo trì</option>
                                    <option value="3">Ngừng hoạt động</option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-8">
                        <button type="submit" class="btn btn-primary btn-form">Thêm</button>
                    
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>