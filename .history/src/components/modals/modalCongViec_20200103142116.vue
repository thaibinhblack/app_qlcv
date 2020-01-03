<template>
<b-tabs>
  <b-tab-item  label="Thông tin công việc">
    <form @submit.prevent="api_cong_viec()" style="width:100%;padding:15px;">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <div class="form-group row">
              <div class="col-sm-4 col-form-label">Dự án</div>
              <div class="col-sm-8">
                <b-field>
                  <multiselect v-model="selected_du_an" :options="LIST_DUAN" label="ten_du_an" track-by="ten_du_an" placeholder="Danh sách dự án"
                  :multiple="false"  :show-labels="false"></multiselect>
                </b-field>
              </div> 
         </div>
          <div class="form-group row" >
              <div class="col-sm-4 col-form-label">Dự án KH</div>
              <div class="col-sm-8">
                <b-field>
                  <multiselect v-model="selected_du_an_kh" :options="LIST_DUAN_KH" label="ten_du_an_kh" track-by="id_du_an_kh" 
                  :multiple="true" :taggable="true"  @remove="toggleUnSelectMarket"  :show-labels="false"></multiselect>
                </b-field>
              </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Loại công việc</label>
            <div class="col-sm-8">
                <b-field>
                    <multiselect :options="loai_cv"
                  
                    v-model="selected_loai_cv"
                    :multiple="false"
                    group-values="children"
                    group-label="parent"
                    :group-select="false"
                    :show-labels="false"
                    track-by="ten_loai_cv"
                    label="ten_loai_cv"></multiselect>
                </b-field>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >KH yêu cầu</label>
            <div class="col-sm-8">
              <b-checkbox  v-model="cong_viec.type_cv"  style="margin-top:10px;"></b-checkbox>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên người yêu cầu</label>
            <div class="col-sm-8">
              <b-input type="text" placeholder="Người yêu cầu" v-model="cong_viec.nguoi_yeu_cau"></b-input>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
            <div class="col-sm-8">
              <b-input :disabled="update" type="text" v-model="cong_viec.ten_cv" required placeholder="Tên công việc" ></b-input>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" :   class="col-sm-4 col-form-label" >Nội dung</label>
            <div class="col-sm-8">
              <b-input type="textarea"  minlength="" : 
              maxlength="255" placeholder="Nội dung"  v-model="cong_viec.noi_dung_cv" required  ></b-input>
            </div>
          </div>
           <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
            <div class="col-sm-8">
              <b-input type="text"  minlength=""
              maxlength="255" placeholder="Ghi chú" :  v-model="cong_viec.ghi_chu" required  ></b-input>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Người giao việc</label>
            <div class="col-sm-8">
                <multiselect    :show-labels="false" :disabled="update" v-model="selected_user_giaoviec" :options="users_giaoviec" label="display_name" track-by="id_nd" ></multiselect>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người tiếp nhận</label>
            <div class="col-sm-8">
            <!-- {{selected_user_tiepnhan}} -->
             <!-- :disabled="selected_user_tiepnhan && update || my_info.id_rule == 1"  -->
              <multiselect :   :show-labels="false" v-model="selected_user_tiepnhan" :options="users" label="display_name" track-by="id_nd"></multiselect>
            </div>
          </div>
            
        </div>
        <div class="col-sm-12 col-md-6">
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày tiếp nhận</label>
              <div class="col-sm-8">
                <b-field >
                  <b-input type="date" :   style="width: 100%;"  v-model="cong_viec.ngay_tiep_nhan"></b-input>
                 
                </b-field>
              </div>
            </div>
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày giao việc</label>
              <div class="col-sm-8">
                <b-field >
                   <b-input type="date" :   style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"></b-input>
                  <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"> -->
                </b-field>
              </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày hoàn thành</label>
                <div class="col-sm-8">
                  <b-field >
                     <b-input type="date" :   style="width: 100%;"  v-model="cong_viec.ngay_hoan_thanh"></b-input>
                    <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_hoan_thanh" data-date-format="dd-mm-yyyy"> -->
                  </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày cam kết</label>
                <div class="col-sm-8">
                  <b-field >
                     <b-input type="date" :   style="width: 100%;"  v-model="cong_viec.ngay_cam_ket"></b-input>
                       <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_cam_ket" data-date-format="dd-mm-yyyy"> -->
                  </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Tiến độ ({{cong_viec.tien_do}}%)</label>
                <div class="col-sm-3">
                  <b-field>
                    <b-input  type="number" : v-model="cong_viec.tien_do" required placeholder="Tiến độ" ></b-input>
                  </b-field>
                </div>
                <div class="col-sm-5">
                    <b-field>
                      <b-slider type="is-success" :   v-model="cong_viec.tien_do" :custom-formatter="val => val + '%'"></b-slider>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Giờ thực hiện</label>
                <div class="col-sm-8">
                    <b-field>
                      <b-input type="text" :  v-model="cong_viec.gio_thuc_hien" placeholder="Giờ thực hiện" ></b-input>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Độ ưu tiên</label>
                <div class="col-sm-8">
                  <b-input :disabled="update"  type="number" v-model="cong_viec.do_uu_tien" maxlength="1" max="9" min="1" required placeholder="Độ ưu tiên" ></b-input>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã JIRA</label>
                <div class="col-sm-8">
                  <b-input type="text" : v-model="cong_viec.ma_jra" placeholder="Mã JIIRA" ></b-input>
                </div>
            </div>
             <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày thẩm định</label>
                <div class="col-sm-8">
                  <b-input type="date" disabled v-model="cong_viec.ngay_tham_dinh" ></b-input>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Thẩm định thời gian</label>
                <div class="col-sm-8">
                  <b-input type="number" disabled v-model="cong_viec.tham_dinh_tgian" ></b-input>
                </div>
            </div>
             <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Thẩm định chất lượng</label>
                <div class="col-sm-8">
                  <b-input type="text" disabled v-model="cong_viec.tham_dinh_chat_luong" ></b-input>
                </div>
            </div>
             <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Thẩm định khối lượng</label>
                <div class="col-sm-8">
                  <b-input type="text" disabled v-model="cong_viec.tham_dinh_khoi_luong" ></b-input>
                </div>
              </div>
              <div class="form-group row">        
                  <label for="inputPassword3" class="col-sm-4 col-form-label" >Người thẩm định</label>
                  <div class="col-sm-8">
                    <b-input type="text" disabled v-model="nguoi_tham_dinh" ></b-input>
                  </div>
              </div>
        
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái</label>
                <div class="col-sm-8">
                    <b-field>
                        <b-select v-model="cong_viec.trang_thai" required : >
                            <option v-if="cong_viec.trang_thai <= 1" value="1" selected>Chưa thực hiện</option>
                            <option v-if="cong_viec.trang_thai <= 2" value="2">Đang thực hiện</option>
                            <option  value="3">Đã hoàn thành</option>
                            <option  value="4">Công việc gia hạn</option>
                        </b-select>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">        
              <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người nhập công việc</label>
              <div class="col-sm-8">
                  <b-input disabled type="text" v-if="update == false" v-model="my_info.display_name" required placeholder="Người nhập công việc" ></b-input>
                  <b-input v-else disabled type="text" v-model="nguoi_nhap"></b-input>
              </div>
            </div>
        </div>
          
      </div>
      <div class="form-group row">
        <!-- {{Object.entries(this.getTaskEdit)}} -->
          <div class="col-sm-9">
            <!-- {{Object.entries(this.getTaskEdit).length === 0}} -->
              <button type="submit" v-if="Object.entries(this.getTaskEdit).length <= 5"  class="btn btn-primary btn-form">Thêm</button>
              <button type="submit" v-else class="btn btn-warning btn-form">Cập nhật</button>
              <button type="button" @click="clear()" class="btn btn-success btn-form">Clear</button>
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
  <b-tab-item label="Thẩm định" v-if="my_info.id_rule > 0">
    <form @submit.prevent="api_tham_dinh()">
      <div class="row">
          <div class="form-group col-sm-12 col-md-6 row">
            <div class="col-sm-4 col-form-label">Thẩm định thời gian</div>
            <div class="col-sm-8">
              <b-field>
                <b-input type="text" v-model="thamdinh.tham_dinh_tgian" placeholder="Thẩm định thời gian"></b-input>
              </b-field>
            </div> 
          </div>

          <div class="form-group col-sm-12 col-md-6 row">
            <div class="col-sm-4 col-form-label">Thẩm định chất lượng</div>
            <div class="col-sm-8">
              <b-field>
                <b-input type="text" v-model="thamdinh.tham_dinh_chat_luong" placeholder="Thẩm định chất lượng"></b-input>
              </b-field>
            </div> 
          </div>

          <div class="form-group col-sm-12 col-md-6 row">
            <div class="col-sm-4 col-form-label">Thẩm định khối lượng</div>
            <div class="col-sm-8">
              <b-field>
                <b-input type="text" v-model="thamdinh.tham_dinh_khoi_luong" placeholder="Thẩm định khối lượng"></b-input>
              </b-field>
            </div> 
          </div>

          <div class="form-group col-sm-12 col-md-6 row">
            <div class="col-sm-4 col-form-label">Người thẩm định {{my_info.display_name}}</div>
            <div class="col-sm-8">
              <b-field>
                <b-input disabled type="text" v-model="my_info.display_name" @input="my_info.display_name" ></b-input>
              </b-field>
            </div> 
          </div>

          <div class="form-group col-sm-12 col-md-6 row">
            <div class="col-sm-4 col-form-label">Ngày thẩm đinh</div>
            <div class="col-sm-8">
              <b-field>
                <b-input disabled v-model="thamdinh.ngay_tham_dinh" type="date" placeholder="Ngày thẩm định"></b-input>
              </b-field>
            </div> 
          </div>
          <div class="col-sm-12 col-md-12">
            <button type="submit"  class="btn btn-primary btn-form" style="margin-left:0" >Lưu lại</button>
        </div>    
      </div>
    </form>
  </b-tab-item>
  <b-tab-item label="Công việc gốc">
    <cong-viec-goc :id_cv_da="cong_viec.id_cv_da" :loai_cv="GROUP_LCV" />
  </b-tab-item>
</b-tabs>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
export default {
    props: ["isActiveModal"],
    components:
    {
      Multiselect,
      'cong-viec-goc': () => import('@/components/congviec/congviecGoc.vue')
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
        selected_du_an: {},
        selected_du_an_kh: [],
        users: [],
        users_giaoviec: [],
        selected_user_tiepnhan: {},
        selected_user_giaoviec: {},
        my_info: {},
        selected_loai_cv: null,
        nguoi_nhap: "",
        thamdinh: {
          ngay_tham_dinh: new Date().toISOString().substr(0,10)
        }
      }
    },
    computed:{
      ...mapGetters(["getUser", "getTaskEdit", "GROUP_LCV", "LIST_DUAN", "LIST_DUAN_KH"]),
      nguoi_tham_dinh()
      {
        if(this.cong_viec.nguoi_tham_dinh != null)
        {
          return this.users.filter((value,index,array) => {
            return array[index].id_nd == this.cong_viec.nguoi_tham_dinh
          })[0].display_name
        }
        else
         return "Chưa có người thẩm định"
      }
    },
    watch:
    {
      selected_loai_cv(val)
      {
        this.cong_viec.id_loai_cv = val.id_loai_cv
      },
      cong_viec_edit(newVal)
      {
        this.cong_viec = newVal
       
      },
      selected_du_an(val)
      {
        this.$store.dispatch('fetchDuAnKHById',val);
      },
    },
    methods:
    {
      formatDate (date) {
          if (!date) return null
          const [year, month, day] = date.split('-')
          return `${year}-${month}-${day}`
      },
      // api_users_giaoviec()
      // {
      //   this.axios.get(this.$store.state.config.API_URL + 'user-giaoviec?api_token='+this.$cookies.get('token')+'&id_du_an='+this.selected_du_an.id_du_an).then((response) => {
      //       this.users_giaoviec = response.data
      //       if(this.update == false)
      //       {
      //           this.selected_user_giaoviec = response.data.filter((value,index,array) => {
      //             return array[index].id_nd == this.getUser.id_nd
      //           })[0]
      //       }
      //       else
      //       {
      //         this.selected_user_giaoviec = response.data.filter((value,index,array) => {
      //           return array[index].id_nd == this.cong_viec.nguoi_giao_viec
      //         })[0]

      //       }
      //   })
      // },
      api_cong_viec()
      {
        this.cong_viec.nguoi_nhap = this.my_info.id_nd
        this.cong_viec.id_loai_cv = this.selected_loai_cv.id_loai_cv;
        this.cong_viec.nguoi_giao_viec = this.selected_user_giaoviec.id_nd
        this.cong_viec.nguoi_nhan_viec = this.selected_user_tiepnhan.id_nd
        if(this.ca_nhan == true)
        {
            
            this.cong_viec.type = 0;
        }
        else
        {
           this.cong_viec.type = 1;
        }
        const app = this;
        if(Object.entries(this.getTaskEdit).length > 0)
        {
          this.$store.dispatch('updateCongViec',this.cong_viec)
        }
        // this.axios.post(this.$store.state.config.API_URL + 'cong-viec?api_token='+this.$cookies.get('token'),cong_viec).then((response) => {
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
              app.axios.post(app.$store.state.config.API_URL + 'cong-viec-da',form).then(() => {
              })
            }
            app.$emit('create_cong_viec',true)
        // }).catch(() => {
        //     app.$buefy.notification.open({
        //           duration: 1500,
        //           message: 'Lỗi server',
        //           position: 'is-bottom-right',
        //           type: 'is-danger',
        //           hasIcon: true
        //       })
        // })
      },
      api_capnhat_congviec()
      {
          const cong_viec = new FormData()
          const app = this;
          cong_viec.append("P_NOI_DUNG_CV", this.cong_viec.noi_dung_cv)
          cong_viec.append("P_ID_LOAI_CV", this.selected_loai_cv.id_loai_cv)
          cong_viec.append("P_NGUOI_GIAO_VIEC",this.selected_user_giaoviec.id_nd)
          cong_viec.append("P_NGAY_TIEP_NHAN",this.cong_viec.ngay_tiep_nhan)
          cong_viec.append("P_NGAY_GIAO_VIEC",this.cong_viec.ngay_giao_viec)
          cong_viec.append("P_NGUOI_NHAN_VIEC",this.selected_user_tiepnhan.id_nd)
          cong_viec.append("P_NGAY_HOAN_THANH",this.cong_viec.ngay_hoan_thanh)
          cong_viec.append("P_TIEN_DO",this.cong_viec.tien_do)
          cong_viec.append("P_NGAY_CAM_KET",this.cong_viec.ngay_cam_ket)
          this.axios.post(this.$store.state.config.API_URL + 'capnhat_congviec/'+this.cong_viec_edit.id_cv_da+'?api_token='+this.$cookies.get('token'),cong_viec).then(() => {
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
        this.axis.post(this.$store.state.config.API_URL + 'file',form_fle).then(() => {
        })
      },
      api_tham_dinh()
      {
        const tham_dinh = new FormData();
        tham_dinh.append("P_THAM_DINH_TGIAN",this.thamdinh.tham_dinh_tgian)
        tham_dinh.append("P_THAM_DINH_CHAT_LUONG",this.thamdinh.tham_dinh_chat_luong)
        tham_dinh.append("P_THAM_DINH_KHOI_LUONG",this.thamdinh.tham_dinh_khoi_luong)
        const app = this;
        this.axios.post(this.$store.state.config.API_URL + 'tham-dinh-cong-viec/'+this.cong_viec.id_cv_da+'?api_token='+this.$cookies.get('token'),tham_dinh)
        .then(() => {
            app.$buefy.notification.open({
                duration: 1500,
                message: 'Thẩm định thành công',
                position: 'is-bottom-right',
                type: 'is-success',
                hasIcon: true
            })
        }).catch(() => {
          app.$buefy.notification.open({
                duration: 1500,
                message: 'Lỗi server',
                position: 'is-bottom-right',
                type: 'is-danger',
                hasIcon: true
            })
        })
      }
    },
    created()
    {
     
        this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$cookies.get('token')).then((response) => {
            this.my_info = response.data[0]
        })
        if(this.getTaskEdit.id_cv_da)
        {
          this.axios.get(this.$store.state.config.API_URL + 'loai-cv/'+this.getTaskEdit.id_loai_cv).then((response) => {
            this.selected_loai_cv = response.data
          })
          this.axios.get(this.$store.state.config.API_URL + 'user/'+this.getTaskEdit.nguoi_nhap).then((response) => {
            this.nguoi_nhap = response.data
          })
          this.cong_viec = this.getTaskEdit
  
        }
        this.selected_du_an_kh = this.du_an.filter((value,index,array) => {
          return array[index].id_du_an_kh == this.selected_project
        })
      this.api_du_an()
      // this.api_users()
      this.api_users_giaoviec()
    }
}
</script>

<style scoped>
.multiselect__option--highlight {margin-left: 35px !important;}
</style>