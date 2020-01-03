<template>
<div>
    <div class="row">
    <div class="col-sm-12 col-md-6">
        <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Loại công việc</label>
        <div class="col-sm-8">
            <b-field>
                <b-input type="text" v-model="cong_viec.ten_loai_cv"></b-input>
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
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
        <div class="col-sm-8">
            <b-input type="text"  minlength=""
            maxlength="255" placeholder="Ghi chú"   v-model="cong_viec.ghi_chu" required  ></b-input>
        </div>
        </div>
        <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Người giao việc</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="cong_viec.nv_giao"></b-input>
        </div>
        </div>
        <div class="form-group row">        
        <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người tiếp nhận</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="cong_viec.nv_nhan"></b-input>
        </div>
        </div>
        
    </div>
    <div class="col-sm-12 col-md-6">
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày tiếp nhận</label>
            <div class="col-sm-8">
            <b-field >
                <b-input type="date"    style="width: 100%;"  v-model="cong_viec.ngay_tiep_nhan"></b-input>
                
            </b-field>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày giao việc</label>
            <div class="col-sm-8">
            <b-field >
                <b-input type="date"    style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"></b-input>
                <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"> -->
            </b-field>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày hoàn thành</label>
            <div class="col-sm-8">
                <b-field >
                    <b-input type="date"    style="width: 100%;"  v-model="cong_viec.ngay_hoan_thanh"></b-input>
                <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_hoan_thanh" data-date-format="dd-mm-yyyy"> -->
                </b-field>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày cam kết</label>
            <div class="col-sm-8">
                <b-field >
                    <b-input type="date"    style="width: 100%;"  v-model="cong_viec.ngay_cam_ket"></b-input>
                    <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_cam_ket" data-date-format="dd-mm-yyyy"> -->
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
                <b-input type="text"  v-model="cong_viec.ma_jra" placeholder="Mã JIIRA" ></b-input>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người nhập công việc</label>
            <div class="col-sm-8">
                <b-input disabled type="text" v-model="cong_viec.nguoi_nhap" required placeholder="Người nhập công việc" ></b-input>
               
            </div>
        </div>
    </div>
        
    </div>
    <div class="form-group row">
        <div class="col-sm-9">
            <b-button icon-left="close" class="btn btn-close btn-form" @click="close()">Close</b-button>  
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["id_cv_da", "loai_cv"],
    data()
    {
        return {
            cong_viec: {},
            selected_loai_cv: {}
        }
    },
    methods: {
        api_cv_goc()
        {
            this.axios.get(this.$store.state.config.API_URL + 'cong-viec-goc/'+this.id_cv_da).then((response) => {
                this.cong_viec = response.data
                this.cong_viec.ngay_tiep_nhan = this.cong_viec.ngay_tiep_nhan != null ?  this.cong_viec.ngay_tiep_nhan.slice(0,10) : null
                this.cong_viec.ngay_giao_viec =  this.cong_viec.ngay_giao_viec != null ? this.cong_viec.ngay_giao_viec.slice(0,10) : null
                this.cong_viec.ngay_hoan_thanh =  this.cong_viec.ngay_hoan_thanh != null ? this.cong_viec.ngay_hoan_thanh.slice(0,10) : null
                this.cong_viec.ngay_cam_ket =   this.cong_viec.ngay_cam_ket != null ? this.cong_viec.ngay_cam_ket.slice(0,10) : null
                this.cong_viec.ngay_tham_dinh =   this.cong_viec.ngay_tham_dinh != null ? this.cong_viec.ngay_tham_dinh.slice(0,10) : null
                this.axios.get(this.$store.state.config.API_URL + 'loai-cv/'+response.data.id_loai_cv).then((response) => {
                    this.selected_loai_cv = response.data
                })
            })
        }
    },
    created()
    {
        this.api_cv_goc()
    }
}
</script>