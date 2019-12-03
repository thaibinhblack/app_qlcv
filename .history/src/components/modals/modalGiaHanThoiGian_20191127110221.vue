<template>
<form action="">
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
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
        <div class="col-sm-8">
        <b-input type="text" v-model="cong_viec.ten_cv" required placeholder="Tên công việc" ></b-input>
        </div>
    </div>
</form>
</template>