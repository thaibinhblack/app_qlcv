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

        <div class="col-sm-12 col-md-12" v-if=" Object.entries(this.trang_thai_edit).length === 0">
            <button type="submit"   class="btn btn-primary btn-form" style="margin-left:0" >Lưu lại</button>
        </div> 
        <div class="col-sm-12" v-else>
                <button type="submit" class="btn btn-primary btn-form" style="margin-left:0" >Cập nhật</button>
                <button type="button" class="btn btn-warning btn-form">Xóa</button>
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
    watch:
    {
        trang_thai_edit(val)
        {
            this.status = val
        }
    },
    methods: {
        api_trang_thai_du_an_kh()
        {
            var app = this;
            if(Object.entries(this.trang_thai_edit).length === 0)
            {

                const result = this.$store.dispatch('createTrangThaiDuAn',this.status)
                this.status = { }
                result.then((response) => {
                    if(response == true)
                    {
                        this.$emit('update',true);
                        app.$buefy.notification.open({
                            duration: 1500,
                            message: 'Thêm trạng thái mới thành công',
                            position: 'is-bottom-left',
                            type: 'is-success',
                            hasIcon: true
                        })
                    }
                    else
                    {
                        app.$buefy.notification.open({
                            duration: 1500,
                            message: 'Lỗi! Xin vui lòng thử lại',
                            position: 'is-bottom-left',
                            type: 'is-danger',
                            hasIcon: true
                        })
                    }
                })
                // console.log(result.then);
               
            }
            else
            {
               
            }
            
        },
        api_delete_trang_thai_du_an_kh()
        {
            var app = this;
             const result = this.$store.dispatch("deleteTrangThai",this.status.id_trang_thai)
                result.then((response) => {
                    if(response == true)
                    {
                         app.$buefy.notification.open({
                            duration: 1500,
                            message: 'Thêm trạng thái mới thành công',
                            position: 'is-bottom-left',
                            type: 'is-success',
                            hasIcon: true
                        })
                    }
                    else
                    {
                         app.$buefy.notification.open({
                            duration: 1500,
                            message: 'Lỗi! Xin vui lòng thử lại!',
                            position: 'is-bottom-left',
                            type: 'is-danger',
                            hasIcon: true
                        })
                    }
                })
        }
    }
}
</script>