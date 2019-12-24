<template>
<div>
    <div class="row">
    <div class="col-sm-12 col-md-6">
        <div class="form-group row">
            <div class="col-sm-4 col-form-label">Dự án</div>
            <div class="col-sm-8">
            <b-field>
                <multiselect v-model="selected_du_an" :options="du_an" label="ten_du_an" track-by="ten_du_an" placeholder="Danh sách dự án"
                :multiple="false"  :show-labels="false"></multiselect>
            </b-field>
            </div> 
        </div>
        <div class="form-group row" >
            <div class="col-sm-4 col-form-label">Dự án KH</div>
            <div class="col-sm-8">
            <b-field>
                <multiselect :disabled="update" v-model="selected_du_an_kh" :options="du_an_kh" label="ten_du_an_kh" track-by="id_du_an_kh" 
                :multiple="true" :taggable="true"  @remove="toggleUnSelectMarket"  :show-labels="false"></multiselect>
            </b-field>
            </div>
        </div>
        <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Loại công việc</label>
        <div class="col-sm-8">
            <b-field>
                <multiselect :options="loai_cv"
                :disabled="cong_viec.trang_thai == 3 && update == true"
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
        <label for="inputPassword3" :disabled="cong_viec.trang_thai == 3 && update == true"   class="col-sm-4 col-form-label" >Nội dung</label>
        <div class="col-sm-8">
            <b-input type="textarea"  minlength="" :disabled="cong_viec.trang_thai == 3 && update == true" 
            maxlength="255" placeholder="Nội dung"  v-model="cong_viec.noi_dung_cv" required  ></b-input>
        </div>
        </div>
        <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
        <div class="col-sm-8">
            <b-input type="text"  minlength=""
            maxlength="255" placeholder="Ghi chú" :disabled="cong_viec.trang_thai == 3 && update == true"  v-model="cong_viec.ghi_chu" required  ></b-input>
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
            <multiselect :disabled="cong_viec.trang_thai == 3 && update == true"   :show-labels="false" v-model="selected_user_tiepnhan" :options="users" label="display_name" track-by="id_nd"></multiselect>
        </div>
        </div>
        
    </div>
    <div class="col-sm-12 col-md-6">
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày tiếp nhận</label>
            <div class="col-sm-8">
            <b-field >
                <b-input type="date" :disabled="cong_viec.trang_thai == 3 && update == true"   style="width: 100%;"  v-model="cong_viec.ngay_tiep_nhan"></b-input>
                
            </b-field>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày giao việc</label>
            <div class="col-sm-8">
            <b-field >
                <b-input type="date" :disabled="cong_viec.trang_thai == 3 && update == true"   style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"></b-input>
                <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"> -->
            </b-field>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày hoàn thành</label>
            <div class="col-sm-8">
                <b-field >
                    <b-input type="date" :disabled="cong_viec.trang_thai == 3 && update == true"   style="width: 100%;"  v-model="cong_viec.ngay_hoan_thanh"></b-input>
                <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_hoan_thanh" data-date-format="dd-mm-yyyy"> -->
                </b-field>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày cam kết</label>
            <div class="col-sm-8">
                <b-field >
                    <b-input type="date" :disabled="cong_viec.trang_thai == 3 && update == true"   style="width: 100%;"  v-model="cong_viec.ngay_cam_ket"></b-input>
                    <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_cam_ket" data-date-format="dd-mm-yyyy"> -->
                </b-field>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tiến độ ({{cong_viec.tien_do}}%)</label>
            <div class="col-sm-3">
                <b-field>
                <b-input  type="number" :disabled="cong_viec.trang_thai == 3 && update == true" v-model="cong_viec.tien_do" required placeholder="Tiến độ" ></b-input>
                </b-field>
            </div>
            <div class="col-sm-5">
                <b-field>
                    <b-slider type="is-success" :disabled="cong_viec.trang_thai == 3 && update == true"   v-model="cong_viec.tien_do" :custom-formatter="val => val + '%'"></b-slider>
                </b-field>
            </div>
        </div>
        <div class="form-group row">        
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Giờ thực hiện</label>
            <div class="col-sm-8">
                <b-field>
                    <b-input type="text" :disabled="cong_viec.trang_thai == 3 && update == true"  v-model="cong_viec.gio_thuc_hien" placeholder="Giờ thực hiện" ></b-input>
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
                <b-input type="text" :disabled="cong_viec.trang_thai == 3 && update == true" v-model="cong_viec.ma_jra" placeholder="Mã JIIRA" ></b-input>
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
                    <b-select v-model="cong_viec.trang_thai" required :disabled="cong_viec.trang_thai == 3 && update == true" >
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
        <div class="col-sm-9">
            <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
            <button type="button" :disabled="!update" class="btn btn-warning btn-form" @click="api_capnhat_congviec()">Cập nhật</button>
            <button type="submit" @click="clear()" class="btn btn-success btn-form">Clear</button>
            <b-button icon-left="close" class="btn btn-close btn-form" @click="close()">Close</b-button>  
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["id_cv_da"],
    data()
    {
        return {
            cong_viec: {}
        }
    },
    methods: {
        api_cv_goc()
        {
            this.axios.get(this.$store.state.config.API_URL + 'cong-viec-goc/'+this.id_cv_da).then((response) => {
                this.cong_viec = response.data
            })
        }
    },
    created()
    {

    }
}
</script>