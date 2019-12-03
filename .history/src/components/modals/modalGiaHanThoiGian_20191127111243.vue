<template>
<form style="padding:15px;">
    <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
        <div class="col-sm-8">
        <b-input type="text" v-model="cong_viec.ten_cv" required placeholder="Tên công việc" ></b-input>
        </div>
    </div>
    <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Thời gian cam kết</label>
        <div class="col-sm-8">
            <b-field >
                  <b-datepicker
                      :show-week-number="showWeekNumber"
                      placeholder="Nhập ngày tiếp nhận"
                      v-model="cong_viec.ngay_cam_ket"
                      required
                      @date-formatter="formatter(date)"
                      style="z-index:9999"
                      icon="calendar-today">
                  </b-datepicker>
              </b-field>
        </div>
    </div>
    <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Thời gian gia hạn</label>
        <div class="col-sm-8">
            <b-field >
                  <b-datepicker
                      :show-week-number="showWeekNumber"
                      placeholder="Nhập ngày tiếp nhận"
                      v-model="cong_viec.thoi_gian_gia_han"
                      required
                      @date-formatter="formatter(date)"
                      style="z-index:9999"
                      icon="calendar-today">
                  </b-datepicker>
              </b-field>
        </div>
    </div>
    <div class="form-group row">        
        <label for="inputPassword3"  class="col-sm-4 col-form-label" >Lý do</label>
        <div class="col-sm-8">
        <b-input type="textarea"  minlength=""
        maxlength="255" placeholder="Lý do gia hạn"  v-model="cong_viec.noi_dung_cv" required  ></b-input>
        </div>
    </div>
    <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Người duyệt</label>
        <div class="col-sm-8">
           <multiselect></multiselect>
        </div>
    </div>
</form>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
    props: ["cong_viec_edit"],
    components: {
        Multiselect
    },
    data()
    {
        return {
            cong_viec: {}
        }
    },
    created(){
        this.cong_viec = this.cong_viec_edit
    }
}
</script>