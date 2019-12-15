<template>
    <form>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-3 col-form-label" >Trung Tâm</label>
                    <div class="col-sm-9">
                        <b-field>
                            <b-select v-model="trung_tam_selected" required placeholder="Danh sách trung tâm">
                                <option value="0"> --Tất cả trung tâm--</option>
                                <option v-for="(tt,index) in trung_tams" :key="index" :value="tt.id_tt"> {{tt.ten_tt}}</option>
                            </b-select>
                        </b-field>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-3 col-form-label" >Phòng</label>
                    <div class="col-sm-9">
                        <b-field>
                            <b-select v-model="user.id_nhom" placeholder="Danh sách phòng ban">
                            
                                <option v-for="(group,index) in groups" :key="index" :value="group.id_nhom">{{group.ten_nhom}}</option>
                                
                            </b-select>
                        </b-field>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Tài khoản</label>
                    <div class="col-sm-9">
                    <b-input type="text" :disabled="update" placeholder="Username" icon="account" v-model="user.username_nd"></b-input>
                    </div>
                </div>
                <div class="form-group row" v-if="update == false">
                    <label for="inputPassword3"  class="col-sm-3 col-form-label">Mật khẩu</label>
                    <div class="col-sm-9">
                    <b-input type="password" password-reveal placeholder="Password" icon="key" v-model="user.password_nd"></b-input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-3 col-form-label" >Phòng</label>
                    <div class="col-sm-9">
                        <b-field>
                            <b-select v-model="user.id_rule" placeholder="Danh sách phòng ban">
                                <option value="0">Nhân viên</option>
                                <option value="1">Quản lí</option>
                            </b-select>
                        </b-field>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                 <div class="form-group row">
                    <label for="inputPassword3"  class="col-sm-3 col-form-label">Họ và Tên</label>
                    <div class="col-sm-9">
                    <b-input type="text" placeholder="Họ và Tên" icon="account" v-model="user.display_name"></b-input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3"  class="col-sm-3 col-form-label">SĐT</label>
                    <div class="col-sm-9">
                    <b-input type="text" placeholder="SDT" icon="phone" v-model="user.sdt_nd"></b-input>
                    </div>
                </div>
                 <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-3 col-form-label" >Email</label>
                    <div class="col-sm-9">
                    <b-input type="email" v-model="user.email_nd"  placeholder="example@gmail.com" icon="email" ></b-input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputNgaySinh" class="col-sm-3 col-form-label" >Ngày sinh</label>
                    <div class="col-sm-9">
                        <b-field >
                            <b-datepicker
                                :show-week-number="showWeekNumber"
                                placeholder="Nhập ngày sinh"
                                v-model="user.ngay_sinh_nd"
                                @date-formatter="formatter(date)"
                                style="z-index:9999"
                                icon="calendar-today">
                            </b-datepicker>
                        </b-field>
                 </div>
                </div>
                <fieldset class="form-group">
                    <div class="row">
                    <legend class="col-form-label col-sm-3 pt-0">Giới tính</legend>
                    <div class="col-sm-9">
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
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-9">
                <button v-if="getAction_user.them == '2.2'" type="button" :disabled="update"  class="btn btn-primary btn-form" @click="api_resignter_user()">Thêm</button>
                <button v-if="getAction_user.sua == '2.3'" type="button" :disabled="!update" class="btn btn-warning btn-form" @click="api_update_user()">Cập nhật</button>
                <button v-if="getAction_user.sua == '2.3'" type="submit" :disabled="!update" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
            </div>
            
        </div>
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
export default {
    props:["user_edit","update", "groups", "trung_tams"],
    data()
    {
        return {
            user : {
                ngay_sinh_nd: new Date(),
                gt_nd: 1,
                id_rule0
            },
            showWeekNumber: false,
            trung_tam_selected: 0
        }
    },
    watch:{
        getAction_user(newVal)
        {
            console.log(newVal)
        },
        user_edit(newVal)
        {
           
            this.user = newVal
        },
        trung_tam_selected(newVal)
        {
            if(newVal == 0)
            {
                this.api_group()
            }
            else
            {
                this.FilterGroup()
            }
           
        },
        update(newVal)
        {
            if(newVal == false)
            {
                this.user = {
                    ngay_sinh_nd: new Date(),
                    gt_nd: 1
                }
            }
        }
    },
    computed: 
    {
            ...mapGetters(["getAction_user"])
    },
    methods:
    {
        api_resignter_user()
        {
            const user  = new FormData();
            // this.user.ngay_sinh_nd = moment(this.user.ngay_sinh_nd).format('dd-mm-yyyy')
            // console.log(this.user.ngay_sinh_nd.getDate())
            user.append("USERNAME",this.user.username_nd)
            user.append("PASSWORD",this.user.password_nd)
            user.append("ID_NHOM",this.user.id_nhom)
            user.append("DISPLAY_NAME", this.user.display_name)
            user.append("SDT_ND",this.user.sdt_nd)
            user.append("EMAIL_ND",this.user.email_nd)
            user.append("GOITINH_ND",this.user.gt_nd)
            user.append("NGAY_SINH",this.user.ngay_sinh_nd.getDate() +'-'+this.user.ngay_sinh_nd.getMonth() + '-' + this.user.ngay_sinh_nd.getFullYear())
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'resignter',user).then((response) => {
                app.$emit('createUser',true)
                 app.$buefy.notification.open({
                    duration: 5000,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: response.data.success == true ? 'is-success' : 'is-danger',
                    hasIcon: true
                })
                app.user =  {
                    ngay_sinh_nd: new Date(),
                    gt_nd: 1
                }
                app.$router.reload()

            }).catch(() => {
               
            })
        },
        api_update_user()
        {
             const user  = new FormData();
            user.append("USERNAME",this.user.username_nd)
            user.append("PASSWORD",this.user.password_nd)
            user.append("ID_NHOM",this.user.id_nhom)
            user.append("DISPLAY_NAME", this.user.display_name)
            user.append("SDT_ND",this.user.sdt_nd)
            user.append("EMAIL_ND",this.user.email_nd)
            user.append("GOITINH_ND",this.user.gt_nd)
            user.append("NGAY_SINH",this.user.ngay_sinh_nd.getDate() +'-'+this.user.ngay_sinh_nd.getMonth() + '-' + this.user.ngay_sinh_nd.getFullYear())
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'user/'+this.user.id_nd+'?api_token='+this.$cookies.get('token'),user).then((response) => {
                app.$emit('createUser',true)
                app.$buefy.notification.open({
                    duration: 5000,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: response.data.success == true ? 'is-success' : 'is-danger',
                    hasIcon: true
                })
                app.user =  {
                    ngay_sinh_nd: new Date(),
                    gt_nd: 1
                }
                app.$router.reload()

            }).catch(() => {
               
            })
        },
        formatter(date)
        {
            return moment(date).format('dd/MM/yyyy')
        },
        api_group()
        {
             this.axios.get(this.$store.state.config.API_URL + 'group_user'+'?api_token='+this.$cookies.get('token')).then((response) => {
                this.$emit('updateGroups',response.data)
            })
        },
        FilterGroup()
        {
            
            this.axios.get(this.$store.state.config.API_URL + 'group_user/'+this.trung_tam_selected+'?api_token='+this.$cookies.get('token')).then((response) => {
                this.$emit('updateGroups',response.data)
            })
        }
    }
}
</script>

<style scoped>

</style>