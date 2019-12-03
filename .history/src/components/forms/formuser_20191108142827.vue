<template>
    <form>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Tài khoản</label>
            <div class="col-sm-10">
            <b-input type="text" placeholder="Username" icon="account"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Mật khẩu</label>
            <div class="col-sm-10">
            <b-input type="password" password-reveal placeholder="Password" icon="key"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
            <b-input type="email"  placeholder="example@gmail.com" icon="email"></b-input>
            </div>
        </div>
        <fieldset class="form-group">
            <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Giới tính</legend>
            <div class="col-sm-10">
                <div class="form-check">
                <b-radio v-model="user.GENDER"
                        name="name"
                        native-value="Flint">
                        Nam
                </b-radio>
                    <b-radio v-model="user.GENDER"
                        name="name"
                        native-value="Silver">
                        Nữ
                    </b-radio>
                </div>
            </div>
            </div>
        </fieldset>

        <div class="form-group row">
            <div class="col-sm-10">
            <button type="submit" v-if="getCreate == '1.2'" class="btn btn-primary btn-form">Thêm</button>
            <button type="submit" v-if="getEdit == '1.3'" class="btn btn-warning btn-form">Sửa</button>
            <button type="submit" v-if="getDelete == '1.4'" class="btn btn-danger btn-form">Xóa</button>
            </div>
            
        </div>
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data()
    {
        return {
            user : {}
        }
    },
    computed: {
            ...mapGetters(["getView","getCreate","getEdit","getDelete"])
        }
}
</script>

<style scoped>
.btn-form {margin-left: 10px;}
</style>