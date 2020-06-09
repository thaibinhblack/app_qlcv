<template>
 <div class="modal-sub-task" :class="class_active">
    <form  @submit.prevent="createSubTask()">
        <div class="content-modal-sub-task">
            <div class="body-content">
                <div class="form-group row">
                    <div class="col-sm-4 col-form-label">Tên công việc</div>
                    <div class="col-sm-8">                   
                        <b-input  type="text" v-model="cong_viec_subtask.ten_cv"></b-input>
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
                            :disabled="cong_viec.trang_thai_td == 1 || cong_viec.trang_thai_td == 2 ?  true : false"
                            :group-select="false"
                            :show-labels="false"
                            track-by="ten_loai_cv"
                            label="ten_loai_cv"></multiselect>
                        </b-field>
                        <b-field v-else>
                            <multiselect :options="GROUP_LCV"
                            v-model="selected_loai_cv"
                            :multiple="false"
                            :disabled="cong_viec.trang_thai_td == 1 || cong_viec.trang_thai_td == 2 ?  true : false"
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
                    <div class="col-sm-4 col-form-label">Tên người yêu cầu</div>
                    <div class="col-sm-8">                   
                        <b-input  type="text" v-model="cong_viec_subtask.nguoi_yeu_cau"></b-input>
                    </div>
                </div>

                <div class="form-group row">        
                        <label for="inputPassword3"    class="col-sm-4 col-form-label" >Nội dung</label>
                        <div class="col-sm-8">
                        <b-input type="textarea"  minlength=""  
                        maxlength="4000" placeholder="Nội dung"  v-model="cong_viec_subtask.noi_dung_cv"   ></b-input>
                        </div>
                    </div>

                    <div class="form-group row">        
                        <label for="inputPassword3"  class="col-sm-4 col-form-label" >Người nhận việc</label>
                        <div class="col-sm-8">
                        <!-- {{selected_user_tiepnhan}} -->
                        <!-- :disabled="selected_user_tiepnhan && update || my_info.id_rule == 1"  -->
                        <multiselect  :show-labels="false" v-model="selected_user_tiepnhan" :options="LIST_USER" label="display_name" track-by="id_nd"></multiselect>
                        </div>
                </div>
                <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày tiếp nhận</label>
                    <div class="col-sm-8">
                        <b-field >
                        <b-input type="date" :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false" style="width: 100%;"  v-model="cong_viec_subtask.ngay_tiep_nhan"></b-input>
                        
                        </b-field>
                    </div>
                    </div>
                    <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-4 col-form-label" >Hạn hoàn thành</label>
                    <div class="col-sm-8">
                        <b-field >
                        <b-input type="date" :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false" style="width: 100%;"  v-model="cong_viec_subtask.han_hoan_thanh"></b-input>
                        </b-field>
                    </div>
                    </div>
                    <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày giao việc</label>

                    <div class="col-sm-8 group-time" :class="error.time_nhan_viec">
                        <input min="4" max="5" class="item-time" type="text" v-model="cong_viec_subtask.time_nv"  @change="convert_time(1)" />
                        <b-input class="item-time"  type="date" :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false" style="width: 100%;"  v-model="cong_viec.ngay_giao_viec"></b-input>

                    </div>
                    
                    </div>

                    <div class="form-group row">        
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày hoàn thành </label>
                        <div class="col-sm-8 group-time" :class="error.time_hoan_thanh">
                            <input min="4" max="5" class="item-time" type="text" v-model="cong_viec_subtask.time_ht" @change="convert_time(2)" />
                            <b-input class="item-time"  type="date" :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false" style="width: 100%;"  v-model="cong_viec_subtask.ngay_hoan_thanh"></b-input>

                        </div>
                    
                    </div>
                    <div class="form-group row">        
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày cam kết</label>
                        <div class="col-sm-8">
                        <b-field >
                            <b-input type="date" :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false"  style="width: 100%;"  v-model="cong_viec_subtask.ngay_cam_ket"></b-input>
                            <!-- <input type="date" style="width: 100%;"  v-model="cong_viec.ngay_cam_ket" data-date-format="dd-mm-yyyy"> -->
                        </b-field>
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái / Độ ưu tiên <span class="color-warning">(*)</span> </label>
                        <div class="col-sm-4">
                            <b-field>
                                <b-select style="width: 100%;" v-model="cong_viec_subtask.trang_thai" required :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false" @input="selected_trang_thai()" >
                                    <option  value="1" selected>Chưa thực hiện</option>
                                    <option  value="2">Đang thực hiện</option>
                                    <option  value="3">Đã hoàn thành</option>
                                    <option  value="4">Công việc gia hạn</option>
                                </b-select>
                            </b-field>
                        </div>
                        <div class="col-sm-4">
                        <!-- {{cong_viec.do_uu_tien}} -->
                        <b-select :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false" v-model="cong_viec_subtask.do_uu_tien" >
                            <option :value="0">Chưa có độ ưu tiên</option>
                            <option :value="1">Cao</option>
                            <option :value="2">Trung bình</option>
                            <option :value="3">Thấp</option>
                        </b-select>
                        <!-- <b-input   type="number" :disabled="cong_viec.trang_thai_td == 1 || cong_viec.trang_thai_td == 2 ?  true : false" v-model="cong_viec.do_uu_tien" maxlength="1" max="9" min="1" required placeholder="Độ ưu tiên" ></b-input> -->
                        </div>
                    </div>

                    <div class="form-group row">        
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tiến độ <span class="color-warning">(*)</span> ({{cong_viec.tien_do}}%)</label>
                        <div class="col-sm-3">
                        <b-field>
                            <b-input  type="number" :disabled="cong_viec.trang_thai_td == 1 || cong_viec.trang_thai_td == 2 ?  true : false" min="0" max="100"  v-model="cong_viec.tien_do" required placeholder="Tiến độ" ></b-input>
                        </b-field>
                        </div>
                        <div class="col-sm-5">
                            <b-field>
                            <b-slider type="is-success" v-model="cong_viec.tien_do" :custom-formatter="val => val + '%'"></b-slider>
                            </b-field>
                        </div>
                    </div>

                    <div class="form-group row">        
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Thời gian (giờ) <span class="color-warning">(*)</span></label>
                        
                        <div class="col-sm-4">
                            <b-field>
                            <b-input type="text" :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false" v-model="total_phut_gio" placeholder="Phút tính tạm" ></b-input>
                            </b-field>
                        </div>

                        <div class="col-sm-4">
                            <b-field>
                            <b-input type="text" :disabled="cong_viec_subtask.trang_thai_td == 1 || cong_viec_subtask.trang_thai_td == 2 ?  true : false" v-model="cong_viec_subtask.gio_thuc_hien" placeholder="Thời gian thực hiện (giờ)" ></b-input>
                            </b-field>
                        </div>
                    </div>

                    <div class="form-group row">        
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã JIRA</label>
                        <div class="col-sm-8">
                        <b-input type="text" :disabled="cong_viec.trang_thai_td == 1 || cong_viec.trang_thai_td == 2 ?  true : false"  v-model="cong_viec.ma_jira" placeholder="Mã JIIRA" ></b-input>
                        </div>
                    </div>
            </div>
            <div class="footer-content">
                <div class="form-group row">
                    <div class="col-sm-9">
                        <!-- {{Object.entries(this.getTaskEdit).length === 0}} -->
                        <button type="submit"  class="btn btn-primary btn-form">Lưu lại</button>
                        <button  type="submit"  class="btn btn-warning btn-form">Cập nhật</button>
                        <button type="button" class="btn btn-danger btn-form" @click="close()">Đóng</button>  
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapGetters} from 'vuex'
export default {
    components:{
        Multiselect
    },
    props: ["cong_viec", "setting_modal", "openSubTask"],
    data()
    {
        return {
            cong_viec_subtask: {
                id_du_an_kh: this.cong_viec.id_du_an_kh,
                tien_do: 0,
                id_loai_cv: 1,
                trang_thai: 1,
                ngay_tiep_nhan: new Date().toISOString().substr(0,10),
                ngay_giao_viec: new Date().toISOString().substr(0,10),
                ngay_hoan_thanh: new Date().toISOString().substr(0,10),
                ngay_cam_ket: new Date().toISOString().substr(0,10),
                han_hoan_thanh: new Date().toISOString().substring(0,10),
                type: false,
                gio_thuc_hien: 0,
                nguoi_nhan_viec: 0,
                nguoi_giao_viec: 0,
                type_cv: "0",
                do_uu_tien: 1,
                trang_thai_td: 0,
                tham_dinh_tgian: 0,
                thong_bao: false,
                ma_jira: "",
                thong_bao_rieng: false,
                time_nv: '07:00',
                time_ht: '07:00',
                flow: 0,
                parent: this.cong_viec.id_cv_da
            },
            selected_loai_cv: [],
            selected_user_tiepnhan: {},
            error: {

            },
            class_active: '',
            total_phut_gio: 0
        }
    },
    computed: {
        ...mapGetters(["GROUP_LCV", "LIST_USER"])
    },
    watch: {
        openSubTask(boolean)
        {
            this.class_active = boolean == true ? 'active' : ''
            console.log('boolean', boolean)
        },
        selected_loai_cv(select)
        {
            this.cong_viec_subtask.id_loai_cv = select.id_loai_cv
        },
        selected_user_tiepnhan(user)
        {
            this.cong_viec_subtask.id_telegram = this.selected_user_tiepnhan.id_telegram
            this.cong_viec_subtask.sdt_nd = this.selected_user_tiepnhan.sdt_nd
        }
    },
    methods: {
        close()
        {
            this.$emit('close',false)
            this.class_active = ''
        },
        selected_trang_thai()
        {
            if(this.cong_viec_subtask.trang_thai == 3)
            {
                this.cong_viec_subtask.tien_do = 100
            }
        },
        createSubTask()
        {
            this.$store.dispatch("createSubTask",this.cong_viec_subtask)
        }
    },
}
</script>