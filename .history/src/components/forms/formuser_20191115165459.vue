<template>
    <form>
         <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >DS phòng ban</label>
            <div class="col-sm-8">
                <b-field>
                    <b-select v-model="user.id_nhom" placeholder="Danh sách phòng ban">
                       
                        <option v-for="(group,index) in groups" :key="index" :value="group.id_nhom">{{group.ten_nhom}}</option>
                        
                    </b-select>
                </b-field>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Tài khoản</label>
            <div class="col-sm-8">
            <b-input type="text" placeholder="Username" icon="account" v-model="user.username_nd"></b-input>
            </div>
        </div>
        <div class="form-group row" v-if="update == false">
            <label for="inputPassword3"  class="col-sm-4 col-form-label">Mật khẩu</label>
            <div class="col-sm-8">
            <b-input type="password" password-reveal placeholder="Password" icon="key" v-model="user.password_nd"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3"  class="col-sm-4 col-form-label">SĐT</label>
            <div class="col-sm-8">
            <b-input type="text" placeholder="SDT" icon="phone" v-model="user.sdt_nd"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Email</label>
            <div class="col-sm-8">
            <b-input type="email" v-model="user.email_nd"  placeholder="example@gmail.com" icon="email" ></b-input>
            </div>
        </div>
         <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Email</label>
            <div class="col-sm-8">
            <b-field label="Ngày sinh">
                <b-datepicker
                    :show-week-number="showWeekNumber"
                    placeholder="Nhập ngày sinh"
                    v-model="user.ngay_sinh_nd"
                    style="z-index:9999"
                    icon="calendar-today">
                </b-datepicker>
            </b-field>
            </div>
        </div>
        
        <fieldset class="form-group">
            <div class="row">
            <legend class="col-form-label col-sm-4 pt-0">Giới tính</legend>
            <div class="col-sm-8">
                <div class="form-check">
                <b-radio v-model="user.gt_nd"
                        name="name"
                        native-value="1">
                        Nam
                </b-radio>
                    <b-radio v-model="user.gt_nd"
                        name="name"
                        native-value="0">
                        Nữ
                    </b-radio>
                </div>
            </div>
            </div>
        </fieldset>

        <div class="form-group row">
            <div class="col-sm-8">
            <button type="button" :disabled="update"  class="btn btn-primary btn-form" @click="api_resignter_user()">Thêm</button>
            <button type="submit" class="btn btn-warning btn-form">Sửa</button>
            <button type="submit" class="btn btn-danger btn-form">Xóa</button>
            </div>
            
        </div>
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
export default {
    props:["user_edit","update", "groups"],
    data()
    {
        return {
            user : {},
            showWeekNumber: false
        }
    },
    watch:{
        user_edit(newVal)
        {
           
            this.user = newVal
        }
    },
    computed: 
    {
            ...mapGetters(["getView","getCreate","getEdit","getDelete"])
    },
    methods:
    {
        api_resignter_user()
        {
            const user  = new FormData();
            // this.user.ngay_sinh_nd = moment(this.user.ngay_sinh_nd).format('dd-mm-yyyy')
            console.log(user.ngay_sinh_nd)
            user.append("USERNAME",this.user.username_nd)
            user.append("PASSWORD",this.user.password_nd)
            user.append("ID_NHOM",this.user.id_nhom)
            user.append("SDT_ND",this.user.sdt_nd)
            user.append("EMAIL_ND",this.user.email_nd)
            user.append("GOITINH_ND",this.user.gt_nd)
            user.append("NGAY_SINH",this.user.ngay_sinh_nd)
            // this.axios.post(this.$store.state.config.API_URL + 'resignter',user).then((response) => {
            //     console.log(response.data)
            // })
        }
    }
}
</script>

<style scoped>
.btn-form {margin-left: 10px;}
</style>