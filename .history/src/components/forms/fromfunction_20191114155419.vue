<template>
    <form @submit.prevent="api_function()" class="form-rule">
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.MA_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.TEN_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.MO_TA_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú chức năng</label>
            <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên quyền" icon="key" v-model="fc.GHI_CHU_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
            <div class="col-sm-8">
                <b-field>
                    <b-select v-model="group_selected" placeholder="Danh sách phòng ban">
                        <option value="">
                           Tình trạng chức năng
                        </option>
                        <option value="1">Đang hoạt động</option>
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
            fc: {}
        }
    },
    methods: {
        api_function()
        {

        }
    }
}
</script>