<template>
<form @submit.prevent="api_trang_thai_du_an_kh()" class="card" style="padding: 15px;">
    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên trạng thái</label>
                <div class="col-sm-8">
                    <b-input type="text" v-model="status.ten_trang_thai"  placeholder="Tên trạng thái" required></b-input>
                </div>
            </div>
        </div>
        
        <div class="col-sm-12 col-md-6">
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
                <div class="col-sm-8">
                    <b-input type="text" v-model="status.ghi_chu_trang_thai"  placeholder="Tên trạng thái"></b-input>
                </div>
            </div>
        </div>
        
        <div class="col-sm-12 col-md-6">
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Nội dung</label>
                <div class="col-sm-8">
                    <b-input type="textarea" v-model="status.noi_dung_trang_thai" minlength=""
                        maxlength="255" placeholder="Nội dung trạng thái dự án"  ></b-input>
                </div>
            </div>
        </div>

        <div class="col-sm-12 col-md-12">
            <button type="submit"  class="btn btn-primary btn-form" style="margin-left:0" >Lưu lại</button>
        </div>  
    </div>
    
</form>
</template>

<script>
export default {
    props: ["trang_thai_edit"],
    data()
    {
        return {
            status: {

            }
        }
    },
    methods: {
        api_trang_thai_du_an_kh()
        {
            this.$store.dispatch('createTrangThaiDuAn',this.status)
        }
    }
}
</script>