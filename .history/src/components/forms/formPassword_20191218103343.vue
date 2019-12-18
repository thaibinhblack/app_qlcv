<template>
<form @submit.prevent="api_update_password()" class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mật khẩu cũ</label>
        <div class="col-sm-8">
            <b-input  type="password" password-reveal v-model="user.password_old" @change="check_password()"></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mật khẩu mới</label>
        <div class="col-sm-8">
            <b-input type="password" password-reveal v-model="user.password_new"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Nhập lại mật khẩu</label>
        <div class="col-sm-8">
            <b-input type="password" password-reveal v-model="user.password_confirm" ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-12 col-md-12">
            <button type="submit"  class="btn btn-primary btn-form" style="margin-left:0" >Cập nhật</button>
        </div>    
    </div>
</form>
</template>

<script>
export default {
    data()
    {
        return {
            user: {}
        }
    },
    methods:
    {
        check_password()
        {
            const password = new FormData();
            var app = this;
            password.append("password_nd",this.user.password_old)
            this.axios.post(this.$store.state.config.API_URL + 'check_password?api_token='+this.$cookies.get('token'),password).then((response) => {
                const type = response.data.success == true ? 'is-success': 'is-warning'
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: type,
                    hasIcon: true
                })
            })
        },
        api_update_password()
        {
            var app = this;
           
           if(this.user.password_new != this.user.password_comfirm)
           {
                app.$buefy.notification.open({
                    duration: 1500,
                    message: `Mật khảu không trùng khớp`,
                    position: 'is-bottom-right',
                    type: 'is-warning',
                    hasIcon: true
                })
           }
        },
        renderAvatar()
        {
            var app =this;
            var file = this.$refs.avatar.files[0];
            if(file.type.slice(0,5) != 'image')
            {
                 app.$buefy.notification.open({
                    duration: 1500,
                    message: `Đây không phải file hình ảnh`,
                    position: 'is-bottom-right',
                    type: 'is-warning',
                    hasIcon: true
                })
                this.banner = null
            }
            else
            {
                this.file = file
                this.banner = URL.createObjectURL(file)
            }
        }
    },
    created()
    {
    }
}
</script>

<style scoped>
.avatar, .avatar img {width: 120px;height: 120px; border-radius: 50%;background: #e2e2e2;margin: auto; position: relative;}
.input-file {position: absolute;width: 100%;height: 100%;top: 0;left: 0;opacity: 0;}
</style>