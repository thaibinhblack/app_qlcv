<template>
<form @submit.prevent="api_update_password()" class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mật khẩu cũ</label>
        <div class="col-sm-8">
          <b-field>
                <b-input 
                    type="password"
                    icon="check"
                    :icon-clickable="true"
                    @icon-click="check_password">
                 </b-input>
                <!-- <b-input  
                icon="check"
                icon-clickable
                @icon-click="check_password"  
                type="password" password-reveal v-model="password_old" ></b-input> -->
          </b-field>
        </div>
    </div>
</form>
</tempalte>