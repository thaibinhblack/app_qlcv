<template>
    <form @submit.prevent="api_function()" class="form-rule">
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Mã chức năng" v-model="fc.MA_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên chức năng" v-model="fc.TEN_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả chức năng</label>
            <div class="col-sm-8">
                <b-input type="textarea" minlength="10"
                maxlength="100" placeholder="Mô tả chức năng"  v-model="fc.MO_TA_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" v-model="fc.GHI_CHU_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
            <div class="col-sm-8">
                <b-field>
                    <b-select v-model="fc.TRANG_THAI_CN" placeholder="Danh sách phòng ban">
                       
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
</template>

<script>
export default {
    data()
    {
        return {
            fc: {
                TRANG_THAI_CN: 1
            }
        }
    },
    methods: {
        api_function()
        {

        }
    }
}
</script>