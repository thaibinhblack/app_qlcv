<template>
<b-tabs  >
    <!-- {{getTaskEdit}} -->
  <b-tab-item  label="Thông tin công việc">
  
    <form @keydown.esc="close()" @submit.prevent="api_cong_viec()" style="width:100%;padding:15px;">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <div class="form-group row">
              <div class="col-sm-4 col-form-label">Dự án <span class="color-warning">(*)</span></div>
              <div class="col-sm-8">
                {{check_remove}}
                <b-field >
                  <!-- {{selected_du_an}} -->
                  <!-- {{Object.entries(setting_modal.selected_du_an_setting).length}} -->
                  <multiselect v-model="selected_du_an" 
                  :disabled="check_remove"
                  :options="Object.entries(setting_modal.selected_du_an_setting).length > 0 ?  setting_modal.selected_du_an_setting : LIST_DUAN" 
                  label="ten_du_an" 
                  track-by="ten_du_an" placeholder="Danh sách dự án"
                  :multiple="false"  :show-labels="false" ></multiselect>
                </b-field>
              </div> 
         </div>
          <div class="form-group row" >
              <div class="col-sm-4 col-form-label">Khách hàng <span class="color-warning">(*)</span></div>
              <div class="col-sm-8">
                <b-field>
                  <multiselect v-model="selected_du_an_kh" 
                  :disabled="cong_viec.trang_thai_td == 1 ?  true : false"
                  :options="LIST_DUAN_KH" label="ten_kh" track-by="id_du_an_kh" 
                  :multiple="true" :taggable="true" @remove="toggleUnSelectMarket"  :show-labels="false"></multiselect>
                </b-field>
              </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Loại công việc <span class="color-warning">(*)</span></label>
            <div class="col-sm-8">
              <!-- {{GROUP_LCV}} -->
                <b-field v-if="Object.entries(setting_modal.selected_loai_cv_setting).length > 0 ">
                    <multiselect :options="setting_modal.selected_loai_cv_setting"
                    v-model="selected_loai_cv"
                    :multiple="false"
                    :disabled="cong_viec.trang_thai_td == 1 ?  true : false"
                    :group-select="false"
                    :show-labels="false"
                    track-by="ten_loai_cv"
                    label="ten_loai_cv"></multiselect>
                </b-field>
                <b-field v-else>
                    <multiselect :options="GROUP_LCV"
                    v-model="selected_loai_cv"
                    :multiple="false"
                    :disabled="cong_viec.trang_thai_td == 1 ?  true : false"
                    :group-values="'children'"
                    :group-label="'parent'"
                    :group-select="false"
                    :show-labels="false"
                    track-by="ten_loai_cv"
                    label="ten_loai_cv"></multiselect>
                </b-field>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >KH yêu cầu</label>
            <!-- {{cong_viec.type_cv}} -->
            <div class="col-sm-8">
              <b-field>
                <b-select v-model="cong_viec.type_cv" :disabled="cong_viec.trang_thai_td == 1 ?  true : false">
                  <option value="0">CÔNG VIỆC TỰ NHẬP</option>
                  <option value="1">CÔNG VIỆC KHÁCH HÀNG YÊU CẦU</option>
                </b-select>
              </b-field>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên người yêu cầu</label>
            <div class="col-sm-8">
              <b-input :disabled="cong_viec.trang_thai_td == 1 ?  true : false" type="text" placeholder="Người yêu cầu" v-model="cong_viec.nguoi_yeu_cau"></b-input>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc <span class="color-warning">(*)</span></label>
            <div class="col-sm-8">
              <b-input :disabled="cong_viec.trang_thai_td == 1 ?  true : false" type="text" v-model="cong_viec.ten_cv" required placeholder="Tên công việc" ></b-input>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3"    class="col-sm-4 col-form-label" >Nội dung</label>
            <div class="col-sm-8">
              <b-input type="textarea"  minlength=""  :disabled="cong_viec.trang_thai_td == 1 ?  true : false"
              maxlength="4000" placeholder="Nội dung"  v-model="cong_viec.noi_dung_cv"   ></b-input>
            </div>
          </div>
           <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
            <div class="col-sm-8">
              <b-input type="text"  minlength=""
              maxlength="255" placeholder="Ghi chú" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" v-model="cong_viec.ghi_chu"   ></b-input>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Người giao việc</label>
            <div class="col-sm-8">
                <multiselect  :show-labels="false" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" v-model="selected_user_giaoviec" :options="LIST_USER" label="display_name" track-by="id_nd" ></multiselect>
            </div>
          </div>
          <div class="form-group row">        
            <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người tiếp nhận</label>
            <div class="col-sm-8">
            <!-- {{selected_user_tiepnhan}} -->
             <!-- :disabled="selected_user_tiepnhan && update || my_info.id_rule == 1"  -->
              <multiselect  :disabled="cong_viec.trang_thai_td == 1 ?  true : false" :show-labels="false" v-model="selected_user_tiepnhan" :options="LIST_USER" label="display_name" track-by="id_nd"></multiselect>
            </div>
          </div>
            
        </div>
        <div class="col-sm-12 col-md-6">
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày tiếp nhận</label>
              <div class="col-sm-8">
                <b-field >
                  <b-input type="date" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" style="width: 100%;"  v-model="cong_viec.ngay_tiep_nhan"></b-input>
                 
                </b-field>
              </div>
            </div>
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày giao việc</label>
              <div class="col-sm-4">
                  <input type="number" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" v-model="cong_viec.time_nhan_viec.HH" min="1" max="24" class="tag-time" style="margin-right:5px;"> giờ :
                  <input type="number" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" v-model="cong_viec.time_nhan_viec.mm" min="0" max="59" class="tag-time" style="margin-left: 5px;"> phút
              </div>
              <div class="col-sm-4">
                <b-field >
                  
                   <b-input type="date"  :disabled="cong_viec.trang_thai_td == 1 ?  true : false"  style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"></b-input>
                  <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"> -->
                </b-field>
              </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày hoàn thành</label>
                 <div class="col-sm-4">
                  <input type="number" :disabled="cong_viec.trang_thai_td == 1 ?  true : false"  v-model="cong_viec.time_hoan_thanh.HH" :min="1" :max="24" class="tag-time" style="margin-right:5px;"> giờ :
                  <input type="number" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" v-model="cong_viec.time_hoan_thanh.mm" :min="0" :max="59" class="tag-time" style="margin-left: 5px;"> phút
                </div>
                <div class="col-sm-4">
                  <b-field >
                     <b-input type="date" :disabled="cong_viec.trang_thai_td == 1 ?  true : false"  style="width: 100%;"  v-model="cong_viec.ngay_hoan_thanh"></b-input>
                    <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_hoan_thanh" data-date-format="dd-mm-yyyy"> -->
                  </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày cam kết</label>
                <div class="col-sm-8">
                  <b-field >
                     <b-input type="date" :disabled="cong_viec.trang_thai_td == 1 ?  true : false"  style="width: 100%;"  v-model="cong_viec.ngay_cam_ket"></b-input>
                       <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_cam_ket" data-date-format="dd-mm-yyyy"> -->
                  </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Tiến độ <span class="color-warning">(*)</span> ({{cong_viec.tien_do}}%)</label>
                <div class="col-sm-3">
                  <b-field>
                    <b-input  type="number" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" min="0" max="100"  v-model="cong_viec.tien_do" required placeholder="Tiến độ" ></b-input>
                  </b-field>
                </div>
                <div class="col-sm-5">
                    <b-field>
                      <b-slider type="is-success"   v-model="cong_viec.tien_do" :custom-formatter="val => val + '%'"></b-slider>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Thời gian thực hiện (giờ)</label>
                
                <div class="col-sm-8">
                    <b-field>
                      <b-input type="text" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" v-model="cong_viec.gio_thuc_hien" placeholder="Thời gian thực hiện (giờ)" ></b-input>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Độ ưu tiên <span class="color-warning">(*)</span> </label>
                <div class="col-sm-8">
                  <!-- {{cong_viec.do_uu_tien}} -->
                  <b-select :disabled="cong_viec.trang_thai_td == 1 ?  true : false" v-model="cong_viec.do_uu_tien" >
                    <option :value="0">Chưa có độ ưu tiên</option>
                    <option :value="1">Cao</option>
                    <option :value="2">Trung bình</option>
                    <option :value="3">Thấp</option>
                  </b-select>
                  <!-- <b-input   type="number" :disabled="cong_viec.trang_thai_td == 1 ?  true : false" v-model="cong_viec.do_uu_tien" maxlength="1" max="9" min="1" required placeholder="Độ ưu tiên" ></b-input> -->
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã JIRA</label>
                <div class="col-sm-8">
                  <b-input type="text" :disabled="cong_viec.trang_thai_td == 1 ?  true : false"  v-model="cong_viec.ma_jra" placeholder="Mã JIIRA" ></b-input>
                </div>
            </div>
             <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày thẩm định</label>
                <div class="col-sm-8">
                  <b-input type="date" :disabled="my_info.id_rule > 0 && cong_viec.trang_thai_td == 1 ? false: true" v-model="cong_viec.ngay_tham_dinh" ></b-input>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Thẩm định thời gian</label>
                <div class="col-sm-8">
                  <b-input type="number" :disabled="my_info.id_rule > 0 && cong_viec.trang_thai_td == 1 ? false: true" v-model="cong_viec.tham_dinh_tgian" ></b-input>
                </div>
            </div>
             <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Thẩm định chất lượng</label>
                <div class="col-sm-8">
                  <b-input type="text" :disabled="my_info.id_rule > 0 && cong_viec.trang_thai_td == 1 ? false: true" v-model="cong_viec.tham_dinh_chat_luong" ></b-input>
                </div>
            </div>
             <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Thẩm định khối lượng</label>
                <div class="col-sm-8">
                  <b-input type="text" :disabled="my_info.id_rule > 0 && cong_viec.trang_thai_td == 1 ? false: true" v-model="cong_viec.tham_dinh_khoi_luong" ></b-input>
                </div>
              </div>
              <div class="form-group row">        
                  <label for="inputPassword3" class="col-sm-4 col-form-label" >Người thẩm định</label>
                  <div class="col-sm-8">
                    <b-input type="text" disabled v-model="nguoi_tham_dinh" ></b-input>
                  </div>
              </div>
        
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái <span class="color-warning">(*)</span> </label>
                <div class="col-sm-8">
                    <b-field>
                        <b-select v-model="cong_viec.trang_thai" required :disabled="cong_viec.trang_thai_td == 1 ?  true : false" @input="selected_trang_thai()" >
                            <option  value="1" selected>Chưa thực hiện</option>
                            <option  value="2">Đang thực hiện</option>
                            <option  value="3">Đã hoàn thành</option>
                            <option  value="4">Công việc gia hạn</option>
                        </b-select>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">        
              <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người nhập công việc <span class="color-warning">(*)</span></label>
              <div class="col-sm-8">
                  <b-input v-if="Object.entries(this.getTaskEdit).length <= 5" disabled type="text" v-model="my_info.display_name" required placeholder="Người nhập công việc" ></b-input>
                  <b-input v-else disabled type="text" v-model="cong_viec.ten_nnhap"></b-input>
              </div>
            </div>
        </div>
          
      </div>
      <div class="form-group row">
        <!-- {{Object.entries(this.getTaskEdit)}} -->
          <div class="col-sm-9" v-if="cong_viec.trang_thai_td == 1 && cong_viec.trang_thai == 3">
              <!-- <button v-if="my_info.id_rule == 0" disabled class="btn btn-form"> Chờ thẩm định</button> -->
              <button  :disabled="my_info.id_rule == 0 ? true: false"  @click="tham_dinh()" class="btn btn-primary btn-form">Thẩm định </button>
              <button  @click="huy_tham_dinh()"  class="btn btn-warning btn-form">Hủy thẩm định </button>
              <button type="button" class="btn btn-danger btn-form" @click="close()">Đóng</button>  
          </div>
          <div class="col-sm-9" v-else>
            <!-- {{Object.entries(this.getTaskEdit).length === 0}} -->
              <button type="submit" v-if="Object.entries(this.getTaskEdit).length <= 5"  class="btn btn-primary btn-form">Lưu lại</button>
              <button  type="submit" v-else class="btn btn-warning btn-form">Cập nhật</button>
              <button type="button" class="btn btn-danger btn-form" @click="close()">Đóng</button>  
          </div>
          
      </div>
    </form>
  </b-tab-item>
  <b-tab-item label="File công việc">
      <div class="row">
          <nav class="col-sm-12" style="padding: 15px;">
            <ul class="list-file">
              <li v-for="(file,index) in files" :key="index"> {{file.name}} </li>
              <li v-for="(file,index) in LIST_FILE" :key="index"> {{file.CREATED_AT}} <a target="_blank" :href="$store.state.config.PUBLIC_URL + file.url_file"> {{file.url_file.slice(17)}} </a> </li>
              <!-- <li> </li> -->
            </ul>
          </nav>
      </div>
      <div>
        <input ref="file_cv" type="file" multiple @change="up_files()">
        <b-button @click="api_up_file()">Lưu file</b-button>
      </div>
  </b-tab-item>
  <b-tab-item label="Thẩm định" v-if="my_info.id_rule > 0">
    <form-tham-dinh :id_cv_da="cong_viec.id_cv_da" />
  </b-tab-item>
  <b-tab-item label="Công việc gốc" v-if="Object.entries(this.getTaskEdit).length <= 5 || Object.entries(this.getTaskEdit).length === 0 && this.getTaskEdit != 0" >
    <cong-viec-goc :id_cv_da="cong_viec.id_cv_da" :loai_cv="GROUP_LCV" />
  </b-tab-item>
  <b-tab-item label="Cài đặt">
      <div class="form-setting-modal-cv">
        <div class="row">
          <div class="col-sm-12 col-md-6">
              <div class="form-group row">
                <div class="col-sm-3 col-form-label">Dự án</div>
                <div class="col-sm-9">
                  <b-field>
                    <multiselect v-model="setting_modal.selected_du_an_setting" :options="LIST_DUAN" label="ten_du_an" :disabled="check_disabled" 
                    track-by="ten_du_an" placeholder="Danh sách dự án"
                    :multiple="true"  :show-labels="false" ></multiselect>
                  </b-field>
                </div> 
              </div>

              <div class="form-group row">
                <div class="col-sm-3 col-form-label">Loại công việc</div>
                <div class="col-sm-9">
                  <b-field>
                    <multiselect :options="GROUP_LCV"
                    v-model="setting_modal.selected_loai_cv_setting"
                    :multiple="true"
                    :disabled="check_disabled"
                    group-values="children"
                    group-label="parent"
                    :group-select="false"
                    :show-labels="false"
                    track-by="ten_loai_cv"
                    label="ten_loai_cv"></multiselect>
                </b-field>
                </div> 
              </div>
          </div>
          <div class="col-sm-12">
            <b-button type="is-info" @click="update_setting_modal()">CẬP NHẬT</b-button>
          </div>
        </div>
      </div>
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
      'cong-viec-goc': () => import('@/components/congviec/congviecGoc.vue'),
      'form-tham-dinh': () => import('@/components/forms/formThamDinh.vue')
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
          ngay_tiep_nhan: new Date().toISOString().substr(0,10),
          ngay_giao_viec: new Date().toISOString().substr(0,10),
          ngay_hoan_thanh: new Date().toISOString().substr(0,10),
          ngay_cam_ket: new Date().toISOString().substr(0,10),
          type: false,
          gio_thuc_hien: 0,
          nguoi_nhan_viec: 0,
          nguoi_giao_viec: 0,
          time_nhan_viec: {
            HH: "07",
            mm: "00",
            ss: '00'
          },
          time_hoan_thanh: {
            HH: "07",
            mm: "00",
            ss: '00'
          },
          type_cv: "0",
          do_uu_tien: 1,
          trang_thai_td: 0,
          tham_dinh_tgian: 0
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
        files: [],
        check_remove: false
      }
    },
    computed:{
      ...mapGetters(["getUser", "getTaskEdit", "GROUP_LCV", "LIST_DUAN", "LIST_DUAN_KH", "GROUP_LCV", 
      "LIST_USER_GIAOVIEC", "LIST_USER", "get_list_lcv", "INFO_USER", "LIST_FILE", "setting_modal", "DELETE_CV_DA_KH"]),
      nguoi_tham_dinh()
      {
        if(this.cong_viec.nguoi_tham_dinh != null || this.cong_viec.trang_thai_td == 1)
        {
            if(this.cong_viec.nguoi_tham_dinh != null)
            {
                return this.LIST_USER.filter((value,index,array) => {
                  return array[index].id_nd == this.cong_viec.nguoi_tham_dinh
                })[0].display_name
            }
            else{
              return this.my_info.display_name
            }
        }
        else
         return "Chưa có người thẩm định"
      },
      check_disabled()
      {
        if(this.cong_viec.nguoi_tham_dinh != null)
        {
          return true
        }
        else
        {
          if(this.INFO_USER.id_rule < 0 && Object.entries(this.getTaskEdit).length <= 5 )
          {
            return true
          }
          return false
        }
      }
    },
    watch:
    {
      selected_loai_cv(val)
      {
        this.cong_viec.id_loai_cv = val.id_loai_cv
      },
      selected_du_an(val)
      {
          this.$store.dispatch('fetchDuAnKHById',val.id_du_an);
          
          // console.log('Dự án khách hàng',this.selected_du_an_kh, this.LIST_DUAN_KH)
      },
      LIST_DUAN_KH()
      {
        if(Object.entries(this.getTaskEdit).length > 5)
        {
          this.selected_du_an_kh = this.LIST_DUAN_KH.filter((value,index,array) => {
            return array[index].id_du_an_kh == this.getTaskEdit.id_du_an_kh
          })[0]
        }
      },
      selected_du_an_kh(val)
      {
        if(Object.entries(this.getTaskEdit).length > 5 && this.DELETE_CV_DA_KH == true)
        {
          console.log(val)
          console.log(this.cong_viec)
        }
      }
    },
    methods:
    {
      formatDate (date) {
          if (!date) return null
          const [year, month, day] = date.split('-')
          return `${year}-${month}-${day}`
      },
      api_cong_viec()
      {
        var app = this;
        this.cong_viec.nguoi_nhap = this.my_info.id_nd
        this.cong_viec.id_loai_cv = this.selected_loai_cv.id_loai_cv;
        this.cong_viec.id_du_an = this.selected_du_an.id_du_an
        // this.cong_viec.id_du_an_kh = this.selected_du_an_kh[0].id_du_an_kh
        // this.cong_viec.DELETE_CV_DA_KH = this.DELETE_CV_DA_KH
        if(Object.entries(this.selected_user_tiepnhan).length > 0)
        {
           this.cong_viec.nguoi_giao_viec = this.selected_user_giaoviec.id_nd
        
        }
        if(Object.entries(this.selected_user_giaoviec).length > 0)
        {
          this.cong_viec.nguoi_nhan_viec = this.selected_user_tiepnhan.id_nd
        }
        this.cong_viec.type = 0;
        if(Object.entries(this.getTaskEdit).length > 5)
        {

          this.$store.dispatch('updateCongViec',this.cong_viec).then((response) => {
            // console.log(response)
              if(response.success == true){
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.message,
                    position: 'is-bottom-left',
                    type: 'is-success',
                    hasIcon: true
                })
              }
              else
              {
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.message,
                    position: 'is-bottom-left',
                    type: 'is-warning',
                    hasIcon: true
                })
              }
          })
          .catch(() => {
            app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Lỗi server! Xin vui lòng thử lại',
                    position: 'is-bottom-left',
                    type: 'is-danger',
                    hasIcon: true
                })
          })
        }
        else
        {
           this.$store.dispatch('createCongViec',this.cong_viec).then((response) => {
             if(response.success != false)
             {
                const array_du_an = []
                this.selected_du_an_kh.forEach((du_an_kh) => {
                  array_du_an.push(du_an_kh.id_du_an_kh)
                })
                const form = new FormData()
                form.append("P_ID_DU_AN_KH",array_du_an)
                form.append("P_ID_CV_DA",response.results)
                this.$store.dispatch('createCongViecKH',form)
                app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Thêm công việc mới thành công',
                    position: 'is-bottom-left',
                    type: 'is-success',
                    hasIcon: true
                })
                this.cong_viec = {
                  id_du_an_kh: this.selected_du_an.id_du_an_kh,
                  tien_do: 0,
                  id_loai_cv: 1,
                  trang_thai: 1,
                  ngay_tiep_nhan: new Date().toISOString().substr(0,10),
                  ngay_giao_viec: new Date().toISOString().substr(0,10),
                  ngay_hoan_thanh: new Date().toISOString().substr(0,10),
                  ngay_cam_ket: new Date().toISOString().substr(0,10),
                  type: false,
                  time_nhan_viec: {
                    HH: 7,
                    mm: 0,
                    ss: '00'
                  },
                  time_hoan_thanh: {
                    HH: 7,
                    mm: 0,
                    ss: '00'
                  },
                  type_cv: "0",
                  do_uu_tien: 1,
                  trang_thai_td: 0
                }
                this.selected_loai_cv = {}
                this.selected_user_giaoviec = this.my_info
                this.selected_user_tiepnhan = this.my_info
                // this.selected_du_an = {}
                this.selected_du_an_kh = []
                this.selected_loai_cv = {}
             }
             else{
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.message,
                    position: 'is-bottom-left',
                    type: 'is-warning',
                    hasIcon: true
                })
             }
          })
        }
      },
      clear()
      {
        this.cong_viec = {
          id_du_an_kh: -1 ,
          tien_do: 0,
          id_loai_cv: 1,
          trang_thai: 1,
          ngay_tiep_nhan: new Date().toISOString().substr(0,10),
          ngay_giao_viec: new Date().toISOString().substr(0,10),
          ngay_hoan_thanh: new Date().toISOString().substr(0,10),
          ngay_cam_ket: new Date().toISOString().substr(0,10),
          type: false
        }
        this.$store.dispatch("resetCongViecEdit")
      },
      close()
      {
        this.cong_viec = {
          id_du_an_kh: this.selected_project,
          tien_do: 0,
          id_loai_cv: 1,
          trang_thai: 1,
          ngay_tiep_nhan: new Date().toISOString().substr(0,10),
          ngay_giao_viec: new Date().toISOString().substr(0,10),
          ngay_hoan_thanh: new Date().toISOString().substr(0,10),
          ngay_cam_ket: new Date().toISOString().substr(0,10),
          type: false
        }
        this.$store.dispatch("updateModalEdit",false)
        this.$store.dispatch("resetCongViecEdit")
        // console.log('cong việc close',this.cong_viec)
        
      },
      toggleUnSelectMarket({ ten_kh, id_du_an_kh }) {
        if(Object.entries(this.getTaskEdit).length > 5)
        {
            this.check_remove = false
            this.$store.dispatch("deleteCongViecDAKH", {
            ID_CV_DA: this.cong_viec.id_cv_da,
            ID_DA_KH: id_du_an_kh,
            TEN_KH: ten_kh
          })
        }
      },
      api_files()
      {
        this.$store.dispatch("getFile",this.cong_viec.id_cv_da)
      },
      api_up_file()
      {
         this.$store.dispatch('uploadFile',{
          P_ID_CV_DA: this.cong_viec.id_cv_da,
          FILE_CV: this.$refs.file_cv.files
        })
        this.files = []
      },
      up_files()
      {
        this.files = this.$refs.file_cv.files
      },
      update_setting_modal()
      {
        this.$store.dispatch("SETTING_MODAL_CV",this.setting_modal).then(() => {
           this.$buefy.notification.open({
                    duration: 1500,
                    message: 'CẬP NHẬT SETTING MODAL CÔNG VIỆC THÀNH CÔNG',
                    position: 'is-bottom-left',
                    type: 'is-success',
                    hasIcon: true
                })
          }).catch(() => {
            this.$buefy.notification.open({
                    duration: 1500,
                    message: 'LỖI! XIN VUI LÒNG THỬ LẠI',
                    position: 'is-bottom-left',
                    type: 'is-danger',
                    hasIcon: true
                })
          })
      },
      huy_tham_dinh()
      {
        this.$store.dispatch("sendThamDinh",{
          list_cv: [this.cong_viec],
          tham_dinh: 1}).then(() => {
            this.close()
          })
      },
      tham_dinh()
      {
          this.$store.dispatch("createThamDinhCV",this.cong_viec)
      },
      selected_trang_thai()
      {
        if(this.cong_viec.trang_thai == 3)
        {
          this.cong_viec.tien_do = 100
        }
      }
    },
    created()
    {
     
        
        this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$cookies.get('token')).then((response) => {
             this.my_info = response.data[0]
          })
        // console.log('length',Object.entries(this.getTaskEdit).length)
        if(Object.entries(this.getTaskEdit).length > 5)
        {
          this.check_remove = true
          this.selected_du_an = this.LIST_DUAN.filter((value,index,array) => {
            return array[index].id_du_an == this.getTaskEdit.id_du_an
          })[0]
          // console.log(this.getTaskEdit)
          this.$store.dispatch('fetchDuAnKHById',this.getTaskEdit.id_du_an);
        
          this.selected_loai_cv = this.get_list_lcv.filter((value,index,array) => {
            return array[index].id_loai_cv == this.getTaskEdit.id_loai_cv
          })[0]
      
          this.selected_user_tiepnhan = this.LIST_USER.filter((value,index,array) => {
            return array[index].id_nd == this.getTaskEdit.nguoi_nhan_viec
          })[0]
          // console.log(this.selected_user_tiepnhan)
           this.selected_user_giaoviec = this.LIST_USER.filter((value,index,array) => {
            return array[index].id_nd == this.getTaskEdit.nguoi_giao_viec
          })[0]
          this.axios.get(this.$store.state.config.API_URL + 'user/'+this.getTaskEdit.nguoi_nhap).then((response) => {
            this.nguoi_nhap = response.data
          })
          
          this.cong_viec = this.getTaskEdit
          if(this.cong_viec.trang_thai_td == 1)
          {
            this.cong_viec.ngay_tham_dinh = new Date().toISOString().substr(0,10)
          }
          this.cong_viec.tien_do = parseInt(this.getTaskEdit.tien_do)
          this.cong_viec.time_nhan_viec = JSON.parse(this.cong_viec.time_nhan_viec)
          this.cong_viec.time_hoan_thanh = JSON.parse(this.cong_viec.time_hoan_thanh)
          this.api_files()
        }
        else{
          this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$cookies.get('token')).then((response) => {
            this.selected_user_giaoviec = this.selected_user_tiepnhan = this.my_info = response.data[0]
          })
           
         
        }
        // this.$store.dispatch("fetchUserQLDA",this.selected_du_an.id_du_an)
        
        this.$store.dispatch('SELECT_SETTING_MODAL_CV')
      // this.api_du_an()
      // this.api_users()
      // this.api_users_giaoviec()
    }
}
</script>

<style scoped>
.multiselect__option--highlight {margin-left: 35px !important;}
.list-file>li {padding: 5px 0;display: inline-block;width: 50%;}
span.color-warning {color: red}
.tag-time {    padding: 3px;
    line-height: unsetpx;
    line-height: 36px;
    height: 36px;
    width: 45px;
    text-align: center;}
</style>