<template>
<b-tabs>
  <b-tab-item  label="Thông tin công việc">
    <form @submit.prevent="api_cong_viec(1)" style="width:100%;padding:15px;">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <div class="form-group row">
              <div class="col-sm-4 col-form-label">Dự án </div>
              <div class="col-sm-8">
                <b-field>
                  <multiselect :disabled="update" v-model="selected_du_an_kh" :options="du_an" label="ten_du_an_kh" track-by="id_du_an_kh" 
                  :multiple="true" :taggable="true"  @remove="toggleUnSelectMarket"></multiselect>

                  <!-- <b-select v-model="cong_viec.id_du_an_kh" required>
                      <option value="0"> --Tất cả loại dự án--</option>
                      <option v-for="(da,index) in du_an" :key="index" :value="da.id_du_an_kh"> {{da.ten_du_an_kh}}</option>
                  </b-select> -->
                </b-field>
              </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Loại công việc</label>
            <div class="col-sm-8">
              <b-field>
                  <b-select :disabled="update" v-model="cong_viec.id_loai_cv" required>
                      <option v-for="(lcv,index) in loai_cv" :key="index" :value="lcv.id_loai_cv">{{lcv.ten_loai_cv}}</option>
                  </b-select>
              </b-field>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >KH yêu cầu</label>
            <div class="col-sm-8">
              <b-checkbox  v-model="cong_viec.type"  style="margin-top:10px;"></b-checkbox>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
            <div class="col-sm-8">
              <b-input :disabled="update" type="text" v-model="cong_viec.ten_cv" required placeholder="Tên công việc" ></b-input>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3"  class="col-sm-4 col-form-label" >Nội dung</label>
            <div class="col-sm-8">
              <b-input type="textarea"  minlength=""
              maxlength="255" placeholder="Nội dung"  v-model="cong_viec.noi_dung_cv" required  ></b-input>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Người giao việc</label>
            <div class="col-sm-8">
                <multiselect :disabled="update" v-model="selected_user_giaoviec" :options="users_giaoviec" label="display_name" track-by="id_nd" ></multiselect>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người tiếp nhận</label>
            <div class="col-sm-8">
            
              <multiselect :disabled="update || ca_nhan" v-model="selected_user_tiepnhan" :options="users" label="display_name" track-by="id_nd"></multiselect>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người nhập công việc</label>
            <div class="col-sm-8">
            
                <b-input disabled type="text" v-model="my_info.display_name" required placeholder="Người nhập công việc" ></b-input>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6">
          <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày tiếp nhận</label>
              <div class="col-sm-8">
                <b-field >
                    <b-datepicker
                        :disabled="update"
                        :show-week-number="showWeekNumber"
                        placeholder="Nhập ngày tiếp nhận"
                        v-model="cong_viec.ngay_tiep_nhan"
                        required
                        @date-formatter="formatter(date)"
                        style="z-index:9999"
                        icon="calendar-today">
                    </b-datepicker>
                </b-field>
              </div>
            </div>
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày giao việc</label>
              <div class="col-sm-8">
                <b-field >
                    <b-datepicker
                      
                        :show-week-number="showWeekNumber"
                        placeholder="Nhập giao việc"
                        v-model="cong_viec.ngay_giao_viec"
                        required
                        :disabled="update && ca_nhan"
                        @date-formatter="formatter(date)"
                        style="z-index:9999"
                        icon="calendar-today">
                    </b-datepicker>
                </b-field>
              </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày hoàn thành</label>
                <div class="col-sm-8">
                  <b-field >
                      <b-datepicker
                          :disabled="update"
                          :show-week-number="showWeekNumber"
                          placeholder="Nhập ngày hoàn thành"
                          v-model="cong_viec.ngay_hoan_thanh"
                          required
                          @date-formatter="formatter(date)"
                          style="z-index:9999"
                          icon="calendar-today">
                      </b-datepicker>
                  </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày cam kết</label>
                <div class="col-sm-8">
                  <b-field >
                      <b-datepicker
                          :show-week-number="showWeekNumber"
                          placeholder="Nhập ngày cam kết"
                          v-model="cong_viec.ngay_cam_ket "
                          :disabled="new Date().getDate() == new Date(cong_viec.ngay_cam_ket).getDate() ? false: true"
                          :required="ca_nhan"
                          @date-formatter="formatter(date)"
                          style="z-index:9999"
                          icon="calendar-today">
                      </b-datepicker>
                  </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Tiến độ ({{cong_viec.tien_do}}%)</label>
                <div class="col-sm-8">
                    <b-field>
                      <b-slider type="is-success" v-model="cong_viec.tien_do" :custom-formatter="val => val + '%'"></b-slider>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Giờ thực hiện</label>
                <div class="col-sm-8">
                    <b-field>
                      <b-input :disabled="cong_viec.gio_thuc_hien > 0 ? true: false" type="text" v-model="cong_viec.gio_thuc_hien" placeholder="Giờ thực hiện" ></b-input>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Độ ưu tiên</label>
                <div class="col-sm-8">
                  <b-input :disabled="update" type="number" v-model="cong_viec.do_uu_tien" maxlength="1" max="9" min="1" required placeholder="Độ ưu tiên" ></b-input>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã JIRA</label>
                <div class="col-sm-8">
                  <b-input type="text" v-model="cong_viec.ma_jra" placeholder="Mã JIIRA" ></b-input>
                </div>
            </div>

        
          <div class="form-group row">
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái</label>
                <div class="col-sm-8">
                    <b-field>
                        <b-select v-model="cong_viec.trang_thai" required>
                            <option v-if="cong_viec.trang_thai <= 1" value="1" selected>Chưa thực hiện</option>
                            <option v-if="cong_viec.trang_thai <= 2" value="2">Đang thực hiện</option>
                            <option  value="3">Đã hoàn thành</option>
                            <option  value="4">Công việc gia hạn</option>
                        </b-select>
                    </b-field>
                </div>
            </div>
          </div>
      </div>
      <div class="form-group row">
          <div class="col-sm-9">
              <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
              <button type="button" :disabled="!update" class="btn btn-warning btn-form" @click="api_capnhat_congviec()">Cập nhật</button>
              <button type="submit" v-if="update == true" @click="clear()" class="btn btn-success btn-form">Clear</button>
              <b-button icon-left="close" class="btn btn-close btn-form" @click="close()">Close</b-button>  
          </div>
      </div>
    </form>
  </b-tab-item>
  <b-tab-item label="File công việc">
      <form action="" @submit.prevent="api_up_file()">
        <input ref="file_cv" type="file">
        <b-button>Lưu file</b-button>
      </form>
  </b-tab-item>
</b-tabs>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
export default {
    props: ["update", "du_an", "selected_project", "isActiveModal", "cong_viec_edit","ca_nhan", "loai_cv"],
    components:
    {
      Multiselect
    },
    data()
    {
      return {
        showWeekNumber: false,
        cong_viec: {
          id_du_an_kh: this.selected_project,
          tien_do: 0,
          id_loai_cv: 1,
          trang_thai: 1,
          ngay_tiep_nhan: new Date(),
          ngay_giao_viec: new Date(),
          ngay_hoan_thanh: new Date(),
          ngay_cam_ket: new Date(),
          type: false
        },
       
        selected_du_an_kh: [],
        users: [],
        users_giaoviec: [],
        selected_user_tiepnhan: {},
        selected_user_giaoviec: {},
        my_info: {}
      }
    },
    computed:{
      ...mapGetters(["getUser"])
    },
    watch:
    {
      cong_viec_edit(newVal)
      {
        console.log('test', newVal)
        this.cong_viec = newVal
      },
      update(newVal)
      {
        console.log(newVal)
      },
      selected_du_an_kh(newVal)
      {
        if(newVal.length == 0)
        {
          this.id_du_an_kh = 0
        }
        else
        {
          this.id_du_an_kh = newVal[0].id_du_an_kh
        }
        this.api_users_giaoviec()
      }
    },
    methods:
    {
      api_users_giaoviec()
      {
        this.axios.get(this.$store.state.config.API_URL + 'user-giaoviec?api_token='+this.$cookies.get('token')+'&ID_DU_AN_KH='+this.id_du_an_kh).then((response) => {
            this.users_giaoviec = response.data
            console.log('test',response.data)
            if(this.update == false)
            {
                this.selected_user_giaoviec = response.data.filter((value,index,array) => {
                  return array[index].id_nd == this.getUser.id_nd
                })[0]
            }
            else
            {
              this.selected_user_giaoviec = response.data.filter((value,index,array) => {
                return array[index].id_nd == this.cong_viec.nguoi_giao_viec
              })[0]

            }
        })
      },
      api_users()
      {
        this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$cookies.get('token')).then((response) => {
            if(response.data.length == 0)
            {
              this.$cookies.remove('token')
              this.$router.push('/')
            }
            this.my_info = response.data[ơ0]
          })
        this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$cookies.get('token')).then((response) => {
          this.users = response.data
          if(this.update == false)
          {
              this.selected_user_giaoviec = response.data.filter((value,index,array) => {
                return array[index].id_nd == this.getUser.id_nd
              })[0]
             
                
              
          }
          else
          {
            this.selected_user_giaoviec = response.data.filter((value,index,array) => {
              return array[index].id_nd == this.cong_viec.nguoi_giao_viec
            })[0]
            this.selected_user_tiepnhan = response.data.filter((value,index,array) => {
              return array[index].id_nd == this.cong_viec.nguoi_nhan_viec
            })[0]
          }
         
        })
      },
        api_cong_viec(P_ACTION)
        {
          const cong_viec = new FormData();
          cong_viec.append("P_ID_CV_DA",this.cong_viec.id_cv_da)
          cong_viec.append("P_ID_DU_AN",this.cong_viec.id_du_an)
          cong_viec.append("P_TEN_CV",this.cong_viec.ten_cv)
          cong_viec.append("P_NOI_DUNG_CV",this.cong_viec.noi_dung_cv)
          cong_viec.append("P_NGAY_TIEP_NHAN", this.cong_viec.ngay_tiep_nhan.getFullYear() + '-' + ( this.cong_viec.ngay_tiep_nhan.getMonth() + 1) + '-' + this.cong_viec.ngay_tiep_nhan.getDate()  )
          cong_viec.append("P_NGAY_GIAO_VIEC", this.cong_viec.ngay_giao_viec.getFullYear() + '-' + ( this.cong_viec.ngay_giao_viec.getMonth() + 1) + '-' + this.cong_viec.ngay_giao_viec.getDate()  )
          cong_viec.append("P_NGAY_HOAN_THANH",this.cong_viec.ngay_hoan_thanh.getFullYear() + '-' + ( this.cong_viec.ngay_hoan_thanh.getMonth() + 1) + '-' + this.cong_viec.ngay_hoan_thanh.getDate() )
          cong_viec.append("P_NGAY_CAM_KET",this.cong_viec.ngay_cam_ket.getFullYear() + '-' + ( this.cong_viec.ngay_cam_ket.getMonth() + 1) + '-' + this.cong_viec.ngay_cam_ket.getDate())
          cong_viec.append("P_GIO_THUC_HIEN",this.cong_viec.gio_thuc_hien)
          cong_viec.append("P_DO_UU_TIEN",this.cong_viec.do_uu_tien)
          cong_viec.append("P_MA_JIRA",this.cong_viec.ma_jara)
          cong_viec.append("P_NGUOI_GIAO_VIEC",this.selected_user_giaoviec.id_nd)
          cong_viec.append("P_NGUOI_NHAN_VIEC",this.selected_user_tiepnhan.id_nd)
          cong_viec.append("P_TIEN_DO",this.cong_viec.tien_do)
          cong_viec.append("P_GHI_CHU",this.cong_viec.ghi_chu)
          cong_viec.append("P_LY_DO",this.cong_viec.ly_do)
          cong_viec.append("P_THAM_DINH_TGIAN",this.cong_viec.tham_dinh_tgian)
          cong_viec.append("P_THAM_DINH_KHOI_LUONG",this.cong_viec.tham_dinh_khoi_luong)
          cong_viec.append("P_THAM_DINH_CHAT_LUONG",this.cong_viec.tham_dinh_chat_luong)
          cong_viec.append("P_TRANG_THAI_LTRINH",this.cong_viec.trang_thai_ltrinh)
          cong_viec.append("P_TRANG_THAI",this.cong_viec.trang_thai)
          cong_viec.append("P_ID_LOAI_CV",this.cong_viec.id_loai_cv)
          cong_viec.append("P_ACTION",P_ACTION)
          cong_viec.append("P_NGUOI_NHAP",this.my_info.username_nd)
          if(this.ca_nhan == true)
          {
              cong_viec.append("P_TYPE",0)
          }
          else
          {
            cong_viec.append("P_TYPE",this.cong_viec.type == true ? 1 : 0)
          }
          const app = this;
          this.axios.post(this.$store.state.config.API_URL + 'cong-viec?api_token='+this.$cookies.get('token'),cong_viec).then((response) => {
              app.$buefy.notification.open({
                  duration: 1500,
                  message: response.data.message,
                  position: 'is-bottom-right',
                  type: 'is-success',
                  hasIcon: true
              })
              if(app.selected_du_an_kh.length > 0)
              {
                const array_du_an = []
                app.selected_du_an_kh.forEach((du_an_kh) => {
                  array_du_an.push(du_an_kh.id_du_an_kh)
                })
                const form = new FormData()
                form.append("P_ID_DU_AN_KH",array_du_an)
                form.append("P_ID_CV_DA",response.data.results)
                app.axios.post(app.$store.state.config.API_URL + 'cong-viec-da',form).then((response) => {
                  console.log(response.data)
                })
              }
              const content = this.my_info.username_nd + ' vừa tạo công việc ' + this.cong_viec.ten_cv +' Nội dung phần mềm: '+ this.cong_viec.noi_dung_cv + ' Người giao việc: '+this.selected_user_giaoviec.username_nd + ' Người nhận việc: '+ this.selected_user_tiepnhan.username_nd
              this.axios.post("https://api.telegram.org/bot984384864:AAHL9TTvMytHSHiRJA4eEd5O3fv4njLCbK8/sendMessage",{
                  'chat_id': '-1001463887834',
                  'text':   content
              });

              app.$emit('create_cong_viec',true)
          }).catch(() => {
             app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Lỗi server',
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true
                })
          })
        },
        api_capnhat_congviec()
        {
            const cong_viec = new FormData()
            const app = this;
            cong_viec.append("P_TIEN_DO",this.cong_viec_edit.tien_do)
            cong_viec.append("P_NGAY_CAM_KET",this.cong_viec.ngay_cam_ket.getFullYear() + '-' + ( this.cong_viec.ngay_cam_ket.getMonth() + 1) + '-' + this.cong_viec.ngay_cam_ket.getDate())
            this.axios.post(this.$store.state.config.API_URL + 'capnhat_congviec/'+this.cong_viec_edit.id_cv_da+'?api_token='+this.$cookies.get('token'),cong_viec).then((response) => {
              app.$buefy.notification.open({
                  duration: 1500,
                  message: 'Cập nhật thành công',
                  position: 'is-bottom-right',
                  type: 'is-success',
                  hasIcon: true
              })
            })
        },
        clear()
        {
          this.$emit('clear',false);
          this.cong_viec = {
            id_du_an: this.cong_viec_edit,
            tien_do: 0,
            id_loai_cv: 3,
            trang_thai: 1,
            ngay_tiep_nhan: new Date(),
            ngay_hoan_thanh: new Date()
          }
        },
        close()
        {
          this.$emit('close',false)
          this.clear()
        },
      
        toggleUnSelectMarket({ ten_du_an_kh, id_du_an_kh }) {
          this.toggleUnSelectLojas(ten_du_an_kh, id_du_an_kh);
        },

        api_up_file()
        {
          const form_fle = new FormData();
          form_fle.append("file",this.$refs.file_cv.files[0])
          this.axis.post(this.$store.state.config.API_URL + 'file',form_fle).then((response) => {
            console.log(response.data)
          })
        }
    },
    created()
    {
     
        if(this.cong_viec_edit.id_cv_da)
        {
          console.log(this.cong_viec_edit)
          this.cong_viec_edit.ngay_tiep_nhan = new Date(this.cong_viec_edit.ngay_tiep_nhan)
          this.cong_viec_edit.ngay_hoan_thanh = new Date(this.cong_viec_edit.ngay_hoan_thanh)
          this.cong_viec_edit.ngay_cam_ket = new Date(this.cong_viec_edit.ngay_cam_ket)
          this.cong_viec_edit.ngay_giao_viec = new Date(this.cong_viec_edit.ngay_giao_viec)
          this.cong_viec = this.cong_viec_edit
          this.cong_viec.type = this.cong_viec_edit.type_cv == 1 ? true : false
          console.log(this.cong_viec)      
        }
        console.log('modal',this.cong_viec,this.cong_viec_edit)
        this.selected_du_an_kh = this.du_an.filter((value,index,array) => {
          return array[index].id_du_an_kh == this.selected_project
        })
      this.api_users()
      this.api_users_giaoviec()
      console.log('store',this.getUser)
    }
}
</script>