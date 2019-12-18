<template>
<form @submit.prevent="api_create_customer()" class="form-rule" style="padding: 15px;">
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
            <b-input type="text" v-model="getUser.sdt_nd" placeholder="Số điện thoại" required></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >SĐT</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="getUser.sdt_nd" placeholder="Số điện thoại" required></b-input>
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
            user: this.getUser
        }
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    watch:
    {
        
    },
    created()
    {
        console.log(this.getUser)
    }
}
</script>