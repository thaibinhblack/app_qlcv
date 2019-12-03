<template>
<form @submit.prevent="api_create_customer()" class="form-rule" style="padding: 15px;">
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
            <b-input type="text" v-model="customer.nguoi_dai_dien_kh" placeholder="Người dại diện" required></b-input>
        </div>
    </div>
     <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
        <div class="col-sm-8">
            <b-field>
                <b-select v-model="customer.trang_thai_kh" placeholder="Danh sách phòng ban">
                    
                    <option value="1" selected>Đang hoạt động</option>
                    <option value="2">Đang bảo trì</option>
                    <option value="3">Ngừng hoạt động</option>
                </b-select>
            </b-field>
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
    },
    methods:
    {
        api_create_customer()
        {
            const customer = new FormData();
            customer.append("TEN_KH",this.customer.ten_Kh);
            customer.append("DIA_CHI_KH",this.customer.dia_chi_kh)
            customer.append("SDT_KH",this.customer.sdt_kh);
            customer.append("NGUOI_DAI_DIEN_KH",this.customer.nguoi_dai_dien_kh)
            customer.append("TRANG_THAI_KH",this.customer.trang_thai_kh);

        }
    }
}
</script>