<template>
<form @submit.prevent="api_update_info_user()()" class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <div class="col-sm-12 col-md-12">
            <div class="avatar">
                <img v-if="getUser.avatar != null" :src="$store.state.config.PUBLIC_URL + getUser.avatar" >
                <img v-else :src="banner" >
                <input type="file" ref="avatar" class="input-file" @change="renderAvatar()" />
                
            </div>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tài khoản</label>
        <div class="col-sm-8">
            <b-input disabled type="text" v-model="getUser.username_nd"  placeholder="Tài khoản" ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Họ và Tên</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="getUser.display_name"  placeholder="Họ và Tên" ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày sinh</label>
        <div class="col-sm-8">
            <b-input type="date" v-model="getUser.ngay_sinh_nd" placeholder="Ngày sinh" ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Email</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="getUser.email_nd" placeholder="Email" ></b-input>
        </div>
    </div>
    
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >SĐT</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="getUser.sdt_nd" placeholder="Số điện thoại"></b-input>
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
import { mapGetters } from 'vuex'
export default {
    data()
    {
        return {
            user: this.getUser,
            banner: null
        }
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    watch:
    {
        
    },
    methods:
    {
        api_update_info_user()
        {
            const user = new FormData()
            user.append("username_nd",this.getUser.username_nd)
            user.append("email_nd",this.getUser.email_nd)
            user.append("display_name",this.getUser.display_name)
            user.append("sdt_nd",this.getUser.sdt_nd)
            user.append("ngay_sinh_nd",this.getUser.ngay_sinh_nd)
            this.axios.post(this.$store.state.config.API_URL + 'info?api_token='+this.$cookies.get('token'),user).then((response) => {
                console.log(response.data)
            })
        },
        renderAvatar()
        {
            var app =this;
            var file = this.$refs.avatar.files[0];
            if(file.slice(0,5) != 'image')
            {
                 app.$buefy.notification.open({
                    duration: 1500,
                    message: `Đây không phải file hình ảnh`,
                    position: 'is-bottom-right',
                    type: 'is-warning',
                    hasIcon: true
                })
            }
            else
            {

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
.input-file {position: absolute;width: 100%;height: 100%;top: 0;left: 0;}
</style>