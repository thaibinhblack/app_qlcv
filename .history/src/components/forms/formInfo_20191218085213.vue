<template>
<form @submit.prevent="api_create_customer()" class="form-rule row" style="padding: 15px;">
    <div class="col-sm-12 col-md-6">
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tài khoản</label>
            <div class="col-sm-8">
                <b-input disabled type="text" v-model="user.username_nd"  placeholder="Tài khoản" required></b-input>
            </div>
        </div>
            <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Họ và Tên</label>
            <div class="col-sm-8">
                <b-input type="text" v-model="user.display_name"  placeholder="Họ và Tên" required></b-input>
            </div>
        </div>
            <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >SĐT</label>
            <div class="col-sm-8">
                <b-input type="text" v-model="user.phone" placeholder="Số điện thoại" required></b-input>
            </div>
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
    }
}
</script>