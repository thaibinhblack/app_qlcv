<template>

  <form action="" style="width:100%;padding:15px;">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="form-group row">
            <div class="col-sm-4 col-form-label">Dự án</div>
            <div class="col-sm-8">
              <b-field>
                <b-select v-model="cong_viec.id_du_an" required>
                    <option value="0"> --Tất cả loại dự án--</option>
                    <option v-for="(da,index) in du_an" :key="index" :value="da.id_du_an"> {{da.ten_du_an}}</option>
                </b-select>
              </b-field>
            </div>
        </div>
        <div class="form-group row">        
          <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
          <div class="col-sm-8">
            <b-input type="text" v-model="cong_viec.ten_cv" required placeholder="Tên công việc" ></b-input>
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
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày tiếp nhận</label>
            <div class="col-sm-8">
              <b-field >
                  <b-datepicker
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
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày hoàn thành</label>
            <div class="col-sm-8">
              <b-field >
                  <b-datepicker
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
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Độ ưu tiên</label>
            <div class="col-sm-8">
              <b-input type="number" v-model="cong_viec.do_uu_tien"  required placeholder="Độ ưu tiên" ></b-input>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã JIRA</label>
            <div class="col-sm-8">
              <b-input type="text" v-model="cong_viec.ma_jra"  required placeholder="Mã JIIRA" ></b-input>
            </div>
        </div>
        <div class="form-group row">        
          <label for="inputPassword3" class="col-sm-4 col-form-label" >Người giao việc</label>
          <div class="col-sm-8">
            <b-input type="text" v-model="cong_viec.nguoi_giao_viec"  required placeholder="Người giao việc" ></b-input>
          </div>
        </div>
        <div class="form-group row">        
          <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người tiếp nhận</label>
          <div class="col-sm-8">
            <b-input type="text" v-model="cong_viec.nguoi_nhan_viec" placeholder="Người tiếp nhận" ></b-input>
          </div>
        </div>
          <div class="form-group row">        
          <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái lập trình</label>
          <div class="col-sm-8">
            <b-field>
                <b-select v-model="cong_viec.trang_thai_ltrinh" required>
                    <option value="0">Chưa thực hiện</option>
                    <option value="1">Đang thực hiện</option>
                    <option value="2">Lỗi</option>
                    <option value="3">Hotfix</option>
                    <option value="3">Hoàn thành</option>
                </b-select>
            </b-field>
          </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái</label>
              <div class="col-sm-8">
                  <b-field>
                      <b-select v-model="cong_viec.trang_thai" required>
                          <option value="1" selected>Đang hoạt động</option>
                          <option value="2">Đang bảo trì</option>
                          <option value="3">Ngừng hoạt động</option>
                      </b-select>
                  </b-field>
              </div>
          </div>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-9">
            <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
            <button type="button" :disabled="!update" class="btn btn-warning btn-form" @click="updateDuAn()">Cập nhật</button>
            <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
        </div>
    </div>
  </form>
</template>

<script>
export default {
    props: ["update", "du_an", "selected_project", "isActiveModal"],
    data()
    {
      return {
        showWeekNumber: false,
        cong_viec: {
          id_du_an: this.selected_project,
          trang_thai_ltrinh: 0,
          trang_thai: 1,
          ngay_tiep_nhan: new Date(),
          ngay_hoan_thanh: new Date()
        }
      }
    },
    methods:
    {
        api_cong_viec()
        {
          const cong_viec = new FormData();
          cong_viec.append("P_ID_DU_AN",this.cong_viec.id_du_an)
          cong_viec.append("P_TEN_CV",this.cong_viec.ten_cv)
          cong_viec.append("P_NOI_DUNG_CV",this.cong_viec.noi_dung_cv)
          cong_viec.append("P_NGAY_TIEP_NHAN",this.cong_viec.ngay_tiep_nhan)
          cong_viec.append("P_NGAY_HOAN_THANH",this.cong_viec.ngay_hoan_thanh)
          cong_viec.append("P_NGAY_CAM_KET",this.cong_viec.ngay_cam_ket)
          cong_viec.append("P_GIO_THUC_HIEN",this.cong_viec.gio_thuc_hien)
          cong_viec.append("P_MA_JIRA",this.cong_viec.ma_jara)
          cong_viec.append("P_NGUOI_GIAO_VIEC",this.cong_viec.nguoi_giao_viec)
          cong_viec.append("P_NGUOI_NHAN_VIEC",this.cong_viec.nguoi_nhan_viec)
          cong_viec.append("P_TIEN_DO",this.cong_viec.tien_do)
          cong_viec.append("P_GHI_CHU",this.cong_viec.ghi_chu)
          cong_viec.append("P_LY_DO",this.cong_viec.ly_do)
          cong_viec.append("P_THAM_DINH_TGIAN",this.cong_viec.tham_dinh_tgian)
          cong_viec.append("P_THAM_DINH_KHOI_LUONG",this.cong_viec.tham_dinh_khoi_luong)
          cong_viec.append("P_THAM_DINH_CHAT_LUONG",this.cong_viec.tham_dinh_chat_luong)
          cong_viec.append("P_TRANG_THAI_LTRINH",this.cong_viec.trang_thai_ltrinh)
          cong_viec.append("P_TRANG_THAI",this.cong_viec.trang_thai)
        

        }
    }
}
</script>