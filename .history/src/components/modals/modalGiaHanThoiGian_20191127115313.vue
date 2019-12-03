<template>
<form style="padding:15px;">
    <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
        <div class="col-sm-8">
        <b-input disabled type="text" v-model="cong_viec.ten_cv" required placeholder="Tên công việc" ></b-input>
        </div>
    </div>
     
    <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Thời gian cam kết</label>
        <div class="col-sm-8">
            <b-field >
                  <b-datepicker
                      :show-week-number="showWeekNumber"
                      placeholder="Ngày cam kết"
                      v-model="cong_viec.ngay_cam_ket"
                      disabled
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
                      placeholder="Nhập ngày gia hạn"
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
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Người duyệt</label>
        <div class="col-sm-8">
            <multiselect v-model="selected_ng_giahan" :options="users" label="username_nd" track-by="id_nd"  style="z-index:9999"></multiselect>
        </div>
    </div>
    <div class="form-group row">        
        <label for="inputPassword3"  class="col-sm-4 col-form-label" >Lý do</label>
        <div class="col-sm-8">
        <b-input type="textarea"  minlength=""
        maxlength="255" placeholder="Lý do gia hạn"  v-model="cong_viec.ly_do" required  ></b-input>
        </div>
    </div>
   
    <div class="form-group row">
        <div class="col-sm-9">
            <button type="submit" class="btn btn-primary btn-form">Gia hạn</button>
            <b-button icon-left="close" class="btn btn-close btn-form" @click="$emit('close',false)">Close</b-button>
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
            cong_viec: {},
            users: [],
            selected_ng_giahan: {},
            showWeekNumber: true
        }
    },
    methods:
    {
        api_users()
        {
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                this.users = response.data
            })
        }
    },
    created(){
        this.cong_viec = this.cong_viec_edit
        this.api_users()
    }
}
</script>