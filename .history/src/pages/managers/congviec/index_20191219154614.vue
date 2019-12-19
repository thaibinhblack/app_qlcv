<template>
<div id="page-project" class="layout-task">
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <ul class="list-filter">
                
                <li><a href="/"><b-button icon-left="home" size="6"></b-button></a></li>
                <li><b-field>
                        <b-button icon-left="update" @click="reset_cong_viec()">

                        </b-button>
                    </b-field></li>
                <li>
                    <b-field>
                        <b-select v-model="cannhan_selected">
                            <option value="0"> --Công việc của dự án--</option>
                            <option value="1"> --Công việc cá nhân--</option>
                            <option value="3" v-if="my_info.id_rule > 0">--Công việc chưa phân công---</option>
                        </b-select>
                    </b-field>
                </li>
                  <li>
                    <b-field>
                        <b-select v-model="duan_selected">
                            <option value="0"> --Tất cả  dự án--</option>
                          
                            <option v-for="(da,index) in du_an" :key="index" :value="da.id_du_an"> {{da.ten_du_an}}</option>
                        </b-select>
                    </b-field>
                </li>
                <li>
                    <b-field>
                        <b-select v-model="selected_project">
                            <option value="0"> --Tất cả  dự án khách hàng--</option>
                            <option v-for="(da,index) in du_an_kh" :key="index" :value="da.id_du_an_kh"> {{da.ten_du_an_kh}}</option>
                        </b-select>
                    </b-field>
                </li>
                <li>
                    <b-field>
                            <multiselect :options="loai_cv"
                            v-model="selected_lcv"
                            :multiple="false"
                            group-values="children"
                            group-label="parent"
                            :group-select="false"
                            :show-labels="false"
                            track-by="ten_loai_cv"
                            placeholder="Loại công việc"
                            label="ten_loai_cv">
                        </multiselect>
                    </b-field>
                </li>
                <li>
                    <b-field>
                        <b-select v-model="nhanvien_duan" v-if="my_info.id_rule > 0">
                            <option value="0"> --Nhân viên nhận việc--</option>
                            <option v-for="(user,index) in users" :key="index" :value="user.id_nd">{{user.display_name}}</option>
                           
                        </b-select>
                    </b-field>
                </li>
                 <li>
                    <b-field>
                        <b-select v-model="hinhthuc_loc">
                            <option value="0"> --Chọn hình thức lọc theo thời gian--</option>
                            <option value="1">--Lọc ngày tiếp nhận--</option>
                            <option value="2">--Lọc ngày giao việc--</option>
                            <option value="3">--Lọc ngày hoàn thành--</option>
                            <option value="4">--Lọc ngày cam kết--</option>
                           
                        </b-select>
                    </b-field>
                </li>
                 <li v-if="hinhthuc_loc != 0">
                    <b-field>
                        <b-input type="date" v-model="time_start"></b-input>
                        <b-input type="date" style="margin-left: 7px;" v-model="time_end"></b-input>
                        <b-button style="margin-left:7px" @click="filter_date_cv()">Lọc</b-button>
                    </b-field>  
                </li>
            </ul>
        </div>
    </div>
    <div class="row layout-task" style="margin-top: 10px;">
        <div class="col-4 col-md-4 col-sm-6 col-lg-3 col-xl-3 item-group-task">
            <div class="card card-task" :class="{not: zoom == 'col-12'}">
                <div class="card-title">
                    <h3 style="line-height:36px">Công việc được giao ({{list1.length}})  <b-button @click="zoomLayout()" class="btn-zoom" icon-right="plus"></b-button></h3>
                </div>
                <div class="search-task">
                     <b-input v-model="search_list1" type="text" placeholder="Tìm kiếm công việc" ></b-input>
                </div>
                <draggable class="list-group" :list="list1" group="people"  >
                  
                    <div
                        class="list-group-item"
                        v-for="(element, index) in list1"
                        :key="index"
                        @click="open_task_bottom(element.id_cv_da)"
                        :class="{coder: element.id_loai_cv == 1, support: element.id_loai_cv == 3, cv_kh: element.type_cv == true, error: new Date(element.ngay_hoan_thanh).getDate() - new Date().getDate()  <= 1}">
                         
                      
                        <b-button icon-left="more" class="btn-more" >
                            <ul class="list-action" >
                            <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
                            <li @click="open_gia_han(element.id_cv_da)">Gia hạn công việc</li>
                             <li @click="baocao_tien_do(element.id_cv_da)">Báo cáo tiến độ</li>
                            </ul>
                        </b-button>
                        <div class="row">
                           <div class="col-md-12">
                               <small>{{element.display_name}}</small>
                           </div>
                            <div class="col-sm-4 col-md-3">
                                <div class="avatar">
                                    <img :src="$store.state.config.PUBLIC_URL + element.avatar" style="width:50px;height:50px;border-radius:50%;">
                                    
                                </div>
                            </div>
                            <div class="col-sm-8 col-md-9">
                                <span class="ten_cv">{{element.ten_cv}} <span v-if="element.ten_du_an_kh"> - {{element.ten_du_an_kh}} </span> </span>  <br/>
                                <div class="bottom" v-if="open == element.id_cv_da">
                                    <!-- <small>Người giao việc: {{element.username_nd}} </small> - <small>{{element.type_cv == 1? '#khyc': '#tunhap'}}</small><br/> -->
                                    <small>{{element.ngay_hoan_thanh}}</small>
                                </div>
                            </div>
                        </div>
                         <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value style="margin-top:10px;"></b-progress>
                    </div>
                    </draggable>
                <b-field class="add-task" style="margin-top: 15px" >
                <b-button icon-left="plus" @click="isActiveModal = true" class="btn-add-task">Thêm công việc mới</b-button>
                </b-field>
            </div>
            <div class="card card-form" :class="{zoom: zoom == 'col-12'}">
                <p class="background"> <b-button class="btn-munus"  @click="zoomLayout()" icon-right="minus"></b-button> Danh sácch công việc</p>
                <JqxGrid ref="myGrid"
                        :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                        :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true">
                </JqxGrid>
            </div>
        </div>
        <div class="col-4 col-md-4 col-sm-6 col-lg-3 col-xl-3 item-group-task">
            <div class="card card-task" :class="{not: zoom == 'col-12'}">
                <div class="card-title">
                    <h3 style="line-height:36px">Công việc đang nhận ({{list2.length}}) <b-button @click="zoomLayout()" class="btn-zoom" icon-right="plus"></b-button></h3>
                </div>
                 <div class="search-task">
                     <b-input v-model="search_list2" type="text" placeholder="Tìm kiếm công việc" ></b-input>
                </div>
                <draggable class="list-group" :list="list2" group="people"  @change="update_task_2">
                  
                    <div
                        class="list-group-item"
                        v-for="(element, index) in list2"
                        :key="index"
                        @click="open_task_bottom(element.id_cv_da)"
                        :class="{coder: element.id_loai_cv == 1, support: element.id_loai_cv == 3, cv_kh: element.type_cv == true, error: new Date(element.ngay_hoan_thanh).getDate() - new Date().getDate()  <= 1}">
                         
                      
                        <b-button icon-left="more" class="btn-more" >
                            <ul class="list-action" >
                            <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
                            <li @click="open_gia_han(element.id_cv_da)">Gia hạn công việc</li>
                            <li @click="baocao_tien_do(element.id_cv_da)">Báo cáo tiến độ</li>
                            </ul>
                        </b-button>
                        <div class="row">
                           <div class="col-md-12">
                               <small>{{element.display_name}}</small>
                           </div>
                            <div class="col-sm-4 col-md-3">
                                <div class="avatar">
                                    <img :src="$store.state.config.PUBLIC_URL + element.avatar" style="width:50px;height:50px;border-radius:50%;">
                                    
                                </div>
                            </div>
                            <div class="col-sm-8 col-md-9">
                                <span class="ten_cv">{{element.ten_cv}} <span v-if="element.ten_du_an_kh"> - {{element.ten_du_an_kh}} </span> </span>  <br/>
                                <div class="bottom" v-if="open == element.id_cv_da">
                                    <!-- <small>Người giao việc: {{element.username_nd}} </small> - <small>{{element.type_cv == 1? '#khyc': '#tunhap'}}</small><br/> -->
                                    <small>{{element.ngay_hoan_thanh}}</small>
                                </div>
                            </div>
                        </div>
                         <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value style="margin-top:10px;"></b-progress>
                    </div>
                    </draggable>
                <b-field class="add-task" style="margin-top: 15px" >
                <b-button icon-left="plus" @click="isActiveModal = true" class="btn-add-task">Thêm công việc mới</b-button>
                </b-field>
            </div>
           
        </div>
         <div class="col-4 col-md-4 col-sm-6 col-lg-3 col-xl-3 item-group-task">
            <div class="card card-task" :class="{not: zoom == 'col-12'}">
                <div class="card-title">
                    <h3 style="line-height:36px">Công việc hoàn thành ({{list3.length}})  <b-button @click="zoomLayout()" class="btn-zoom" icon-right="plus"></b-button></h3>
                </div>
                 <div class="search-task">
                     <b-input v-model="search_list3" type="text" placeholder="Tìm kiếm công việc" ></b-input>
                </div>
                <draggable class="list-group" :list="list3" group="people"  @change="update_task_3">
                  
                    <div
                        class="list-group-item"
                        v-for="(element, index) in list3"
                        :key="index"
                        @click="open_task_bottom(element.id_cv_da)"
                        :class="{coder: element.id_loai_cv == 1, support: element.id_loai_cv == 3, cv_kh: element.type_cv == true, error: new Date(element.ngay_hoan_thanh).getDate() - new Date().getDate()  <= 1}">
                         
                      
                        <b-button icon-left="more" class="btn-more" >
                            <ul class="list-action" >
                                <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
                                <li @click="open_gia_han(element.id_cv_da)">Gia hạn công việc</li>
                                 <li @click="baocao_tien_do(element.id_cv_da)">Báo cáo tiến độ</li>
                            </ul>
                        </b-button>
                        <div class="row">
                           <div class="col-md-12">
                               <small>{{element.display_name}}</small>
                           </div>
                            <div class="col-sm-4 col-md-3">
                                <div class="avatar">
                                    <img :src="$store.state.config.PUBLIC_URL + element.avatar" style="width:50px;height:50px;border-radius:50%;">
                                    
                                </div>
                            </div>
                            <div class="col-sm-8 col-md-9">
                                <span class="ten_cv">{{element.ten_cv}} <span v-if="element.ten_du_an_kh"> - {{element.ten_du_an_kh}} </span> </span>  <br/>
                                <div class="bottom" v-if="open == element.id_cv_da">
                                    <!-- <small>Người giao việc: {{element.username_nd}} </small> - <small>{{element.type_cv == 1? '#khyc': '#tunhap'}}</small><br/> -->
                                    <small>{{element.ngay_hoan_thanh}}</small>
                                </div>
                            </div>
                        </div>
                         <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value style="margin-top:10px;"></b-progress>
                    </div>
                    </draggable>
                <b-field class="add-task" style="margin-top: 15px" >
                <b-button icon-left="plus" @click="isActiveModal = true" class="btn-add-task">Thêm công việc mới</b-button>
                </b-field>
            </div>
           
        </div>
    </div>

    <b-modal :active.sync="isActiveModal" :width="'1100px'" :can-cancel="false">
      <p class="background" style="padding:15px;">Danh mục công việc</p>
        <modal-congviec :du_an_kh="du_an_kh" 
        :du_an="du_an"
        :cong_viec_edit="cong_viec_edit" 
        :update="update"
        @clear="update = $event" 
        :selected_project="selected_project" 
        :isActiveModal="isActiveModal" 
        @create_cong_viec="reset = $event"
        @close="isActiveModal = $event"
        :loai_cv="loai_cv"
        :ca_nhan="true" />
    </b-modal >
    <b-modal :active.sync="isModalBaoCao" :width="'800px'" :can-cancel="false">
        <modal-baocao :cong_viec_edit="cong_viec_edit" :my_info="my_info" @close="isModalBaoCao = false" />
    </b-modal>
</div>

</template>

<script>
import Multiselect from 'vue-multiselect'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
import draggable from "vuedraggable";
export default {
    components: {
        draggable,
        JqxGrid,
        'modal-congviec': () => import('@/components/modals/modalCongViec.vue'),
        'modal-baocao': () => import('@/components/modals/modalBaocao.vue'),
        Multiselect
    },
    data()
    {
        return {
            month_selected: 0,
            cannhan_selected: 0,
            du_an: [],
            duan_selected: 0,
            du_an_kh: [],
            du_an_kh_tmp: [],
            selected_project: 0,
            list1: [],
            list1_tmp: [],
            list2: [],
            list2_tmp: [],
            list3: [],
            list3_tmp: [],
            update: false,
            cong_viec_edit: {},
            cong_viec: [],
            isActiveModal: false,
            isModalBaoCao: false,
            zoom: 'col-3',
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_CV_DA', datafield: 'ID_CV_DA', hidden: true},
                {text: 'Tên công việc', datafield: 'ten_cv', width: 240},
                {text: 'Loại công việc', datafield: 'ten_loai_cv', width: 140},
                {text: 'Người giao việc', datafield: 'username_nd', width: 240},
                {text: 'Nội dung công việc', datafield: 'noi_dung_cv', width: 240},
                {text: 'Ngày tiếp nhận', datafield: 'ngay_tiep_nhan', width: 240},
                {text: 'Ngày giao việc', datafield: 'ngay_giao_viec', width: 240},
                {text: 'Ngày hoàn thành', datafield: 'ngay_hoan_thanh', width: 240},
                {text: 'Ngày cam kết', datafield: 'ngay_cam_ket', width: 240},
                {text: 'Giờ thực hiện', datafield: 'gio_thuc_hien', width: 50},
                {text: 'Độ ưu tiên', datafield: 'do_uu_tien', width: 50},
                {text: 'Mã JIRA', datafield: 'ma_jra', width: 240},
                {text: 'Tiên độ', datafield: 'tien_do', width: 50},
                {text: 'Ghi chú', datafield: 'ghi_chu', width: 240},
            ],
            open: 0,
            loai_cv: [],
            selected_lcv: null,
            nhanvien_duan: 0,
            users: [],
            my_info: {},
            search_list1: "",
            search_list2: "",
            search_list3: "",
            hinhthuc_loc: 0,
            time_start: null,
            time_end: null
        }
    },
    watch:{
        search_list1(val)
        {
            const search = this.list1_tmp.filter((value,index,array) => {
                return array[index].ten_cv.includes(val)
            })
            this.list1 = search
        },
        search_list2(val)
        {
            const search = this.list2_tmp.filter((value,index,array) => {
                return array[index].ten_cv.includes(val)
            })
            this.list2 = search
        },
        search_list3(val)
        {
            const search = this.list3_tmp.filter((value,index,array) => {
                return array[index].ten_cv.includes(val)
            })
            this.list3 = search
        },
        month_selected(newVal)
        {
            if(newVal != 0)
            {

                const cong_viec = this.cong_viec.filter((value,index,array) => {
                    return array[index].ngay_tiep_nhan.slice(5,7) == newVal
                })
                this.list1 = this.list2 = this.list3 = []
                this.list1_tmp = this.list1 =  cong_viec.filter((value,index,array) => {
                    return array[index].trang_thai == 1
                })
                this.list2_tmp = this.list2 = cong_viec.filter((value,index,array) => {
                    return array[index].trang_thai == 2
                })
                this.list3_tmp = this.list3 = cong_viec.filter((value,index,array) => {
                    return array[index].trang_thai == 3
                })
            }
            else
            {
                const cong_viec = this.cong_viec
                this.list1_tmp = this.list1 = this.list2 = this.list3 = []
                this.list1 =  cong_viec.filter((value,index,array) => {
                    return array[index].trang_thai == 1
                })
                this.list2_tmp = this.list2 = cong_viec.filter((value,index,array) => {
                    return array[index].trang_thai == 2
                })
                this.list3_tmp = this.list3 = cong_viec.filter((value,index,array) => {
                    return array[index].trang_thai == 3
                })
            }
            
        },
        nhanvien_duan(newVal)
        {
            if(newVal != 0)
            {
                this.api_cong_viec_by_id(newVal)
            }
            else
            {
                if(this.my_info.id_rule > 0)
                {
                    this.api_cong_viec(this.selected_project,this.duan_selected)    
                }
                else
                {
                    this.api_cong_viec_by_id(this.my_info.id_nd)
                }
                
            }
           

        },
        cannhan_selected(newVal)
        {
            if(newVal == 0)
            {
                if(this.my_info.id_rule > 0)
                {
                    if(this.nhanvien_duan == 0)
                    {
                        this.api_cong_viec(this.selected_project,this.duan_selected)
                    }
                    else
                    {
                        this.api_cong_viec_by_id(this.nhanvien_duan)
                    }
                    
                }
                else
                {
                    this.api_cong_viec_by_id(this.my_info.id_nd)
                }
                
            }
            else if(newVal == 3)
            {
                this.api_cong_viec_chua_phan_cong()
            }
            else
            {
                this.api_cong_viec_by_id(this.my_info.id_nd)
            }
        },
        duan_selected(newVal)
        {
            this.du_an_kh = this.du_an_kh_tmp.filter((value,index,array) => {
                return array[index].id_du_an == newVal
            })
            this.selected_project = 0
            this.api_cong_viec(0,newVal)
        },
        isActiveModal(newVal)
        {
            if(newVal == false)
            {
                this.cong_viec_edit = {}
                if(this.cannhan_selected != 3)
                {
                    if(this.my_info.id_rule == 0)
                    {
                        this.api_cong_viec_by_id(this.my_info.id_nd)
                    }
                    else
                    {
                        this.api_cong_viec( this.cannhan_selected, this.duan_selected)
                    }
                    
                }
                else
                {
                    this.api_cong_viec_chua_phan_cong()
                }
            }
            // this.api_cong_viec()
        },
        isModalBaoCao(newVal)
        {
            if(newVal == false)
            {
                this.cong_viec_edit = {}
                if(this.cannhan_selected != 3)
                {
                    if(this.my_info.id_rule == 0)
                    {
                        this.api_cong_viec_by_id(this.my_info.id_nd)
                    }
                    else
                    {
                        this.api_cong_viec( this.cannhan_selected, this.duan_selected)
                    }
                }
                else
                {
                    this.api_cong_viec_chua_phan_cong()
                }
            }
           
        },
        selected_project(newVal)
        {
            this.api_cong_viec(newVal,this.duan_selected)
        },
        selected_lcv(newVal)
        {
            this.api_fileter_loai_cv(newVal.id_loai_cv)
        }
    },
    methods: {
        api_du_an()
        {
            this.axios.get(this.$store.state.config.API_URL + 'du-an?api_token='+this.$cookies.get("token")).then((response) => {
                this.du_an = response.data
                
            })
        },
        api_du_an_kh()
        {
            this.axios.get(this.$store.state.config.API_URL + 'du-an-kh?api_token='+this.$cookies.get("token")).then((response) => {
                this.du_an_kh = response.data
                this.du_an_kh_tmp = response.data
                this.du_an_selected = response.data.filter((value,index,array) => {
                return array[index].id_du_an_kh == this.$route.query.id_du_an_kh
                })[0]
                    // this.cong_viec = response.data
            })
        },
        api_cong_viec(ID,id_du_an)
        {
            this.axios.get(this.$store.state.config.API_URL + 'cong-viec/'+ID+'/'+id_du_an+'?api_token='+this.$cookies.get('token')).then((response) => {
                this.cong_viec = response.data
                this.list1 = this.list2 = this.list3 = []
                this.list1_tmp = this.list1 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 1
                })
                this.list2_tmp = this.list2 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 2
                })
                this.list3_tmp = this.list3 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 3
                })
            })
        },
        api_cong_viec_by_id(id_nd)
        {
            this.axios.get(this.$store.state.config.API_URL + 'cong-viec?api_token='+this.$cookies.get('token')+'&ID_ND='+id_nd).then((response) => {
                this.cong_viec = response.data
                this.list1 = this.list2 = this.list3 = []
                this.list1_tmp = this.list1 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 1
                })
                this.list2_tmp = this.list2 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 2
                })
                this.list3_tmp =  this.list3 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 3
                })
            })
        },
        open_task(id)
        {
            
            this.cong_viec_edit = this.cong_viec.filter((value,index,array) => {
                return array[index].id_cv_da == id
            })[0]
            this.cong_viec_edit.ngay_tiep_nhan = this.cong_viec_edit.ngay_tiep_nhan != null ?  this.cong_viec_edit.ngay_tiep_nhan.slice(0,10) : null
            this.cong_viec_edit.ngay_giao_viec =  this.cong_viec_edit.ngay_giao_viec != null ? this.cong_viec_edit.ngay_giao_viec.slice(0,10) : null
            this.cong_viec_edit.ngay_hoan_thanh =  this.cong_viec_edit.ngay_hoan_thanh != null ? this.cong_viec_edit.ngay_hoan_thanh.slice(0,10) : null
            this.cong_viec_edit.ngay_cam_ket =   this.cong_viec_edit.ngay_cam_ket != null ? this.cong_viec_edit.ngay_cam_ket.slice(0,10) : null
            this.update = true
            this.isActiveModal = true
        },
        open_gia_han(id)
        {
            this.cong_viec_edit = this.cong_viec.filter((value,index,array) => {
                return array[index].id_cv_da == id
            })[0]
            
            this.isActiveModalGiaHan = true
        },
        zoomLayout()
        {
           this.zoom =  this.zoom == 'col-3' ? 'col-12' : 'col-3'
        },
        open_task_bottom(id)
        {
            if(this.open == 0)
            {
                this.open = id;
            }
            else
            {
                this.open = 0;
            }
        },
        update_task_2: function(evt) {
            if(evt.added)
            {
                const app = this;
                if(evt.added.element.trang_thai > 2)
                {
                     app.$buefy.notification.open({
                        duration: 2500,
                        message: 'Không cập nhật được về trạng thái này',
                        position: 'is-bottom-right',
                        type: 'is-warning',
                        hasIcon: true
                    })
                }
                else
                {
                    if(evt.added.element.ngay_cam_ket == null)
                    {
                    
                        app.$buefy.notification.open({
                            duration: 2500,
                            message: 'Chưa nhập ngày cam kết thực hiện',
                            position: 'is-bottom-right',
                            type: 'is-warning',
                            hasIcon: true
                        })
                        // app.api_cong_viec()
                    }
                    this.axios.post(this.$store.state.config.API_URL + 'cong-viec/'+evt.added.element.id_cv_da+'?api_token='+this.$cookies.get('token')+'&trang_thai=2').then(() => {
                    })
                }
               
            }
        },
        update_task_3: function(evt) {
            if(evt.added)
            {
                this.axios.post(this.$store.state.config.API_URL + 'cong-viec/'+evt.added.element.id_cv_da+'?api_token='+this.$cookies.get('token')+'&trang_thai=3').then(() => {
                })
            }
        },
        update_task_4: function(evt) {
            if(evt.added)
            {
                this.axios.post(this.$store.state.config.API_URL + 'cong-viec/'+evt.added.element.id_cv_da+'?api_token='+this.$cookies.get('token')+'&trang_thai=4').then(() => {
                })
            }
        },
        api_loai_cv()
        {
          this.axios.get(this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$cookies.get('token')).then((response) => {
            
            const object_loai_cv = []
            response.data.forEach((parent) => {
                var tmp = {}
                if(parent.parent == 0)
                {
                    tmp.parent = parent.ten_loai_cv
                    tmp.children = []
                }
                response.data.forEach((children) => {
                   if(children.parent == parent.id_loai_cv)
                   {
                       children.ten_loai_cv = '___'+children.ten_loai_cv
                       tmp.children.push(children)
                   }

                })
                if(parent.parent == 0)
                {
                    object_loai_cv.push(tmp)
                }
                
            })
            this.loai_cv = object_loai_cv
          })
        },
        api_nhanvien()
        {   
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$cookies.get('token')).then((response) => {
                this.users = response.data
            })
        },
        baocao_tien_do(id)
        {
            this.cong_viec_edit = this.cong_viec.filter((value,index,array) => {
                return array[index].id_cv_da == id
            })[0]
            this.isModalBaoCao = true
        },
        api_cong_viec_chua_phan_cong()
        {
            this.axios.get(this.$store.state.config.API_URL + 'cong-viec-chua-phan-cong?api_token='+this.$cookies.get('token')).then((response) => {
                 this.cong_viec = response.data
                this.list1 = this.list2 = this.list3 = []
                this.list1_tmp = this.list1 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 1
                })
                this.list2_tmp = this.list2 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 2
                })
                this.list3_tmp = this.list3 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 3
                })
            })
        },
        filter_date_cv()
        {
            if(this.time_start && this.time_end)
            {
                if(this.time_end < this.time_start)
                {
                    const app = this;

                     app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Thời gian cuối không được nhỏ hơn thời gian đầu',
                        position: 'is-bottom-right',
                        type: 'is-warning',
                        hasIcon: true
                    })
                }
                else
                {
                    this.axios.get(this.$store.state.config.API_URL + 'cong-viec?api_token='+this.$cookies.get('token')+'&time_start='+this.time_start+'&time_end='+this.time_end+'&status='+this.hinhthuc_loc)
                    .then((response) => {
                        this.cong_viec = response.data
                        this.list1 = this.list2 = this.list3 = []
                        this.list1_tmp = this.list1 = response.data.filter((value,index,array) => {
                            return array[index].trang_thai == 1
                        })
                        this.list2_tmp = this.list2 = response.data.filter((value,index,array) => {
                            return array[index].trang_thai == 2
                        })
                        this.list3_tmp = this.list3 = response.data.filter((value,index,array) => {
                            return array[index].trang_thai == 3
                        })
                    })
                }
            }
        },
        api_fileter_loai_cv(id)
        {
            this.axios.get(this.$store.state.config.API_URL +'cong-viec?api_token='+this.$cookies.get('token')+'&id_loai_cv='+id).then((response) => {
                this.cong_viec = response.data
                this.list1 = this.list2 = this.list3 = []
                this.list1_tmp = this.list1 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 1
                })
                this.list2_tmp = this.list2 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 2
                })
                this.list3_tmp = this.list3 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 3
                })
            })
        },
        reset_cong_viec()
        {   if(this.my_info.id_rule > 0)
            { 
            
            this.api_cong_viec(0,0)
            
            }
            else
            {
                this.api_cong_viec_by_id(this.my_info.id_nd)

            }
            this.hinhthuc_loc = 0
            this.selected_lcv = null

        }
    },
    beforeCreate()
    {
         this.source = {
            datatype: "json",
            datafields: [
                { name: 'ID_CV_DA', type: 'number'},
                { name: 'ten_cv' , type: 'string' },
                { name: 'ten_loai_cv' , type: 'string' },
                { name: 'username_nd', type: 'string' },
                { name: 'noi_dung_cv' ,type: 'string'},
                { name: 'ngay_tiep_nhan' ,type: 'date'},
                { name: 'ngay_giao_viec', type: 'date' },
                { name: 'ngay_hoan_thanh', type: 'date' },
                { name: 'ngay_cam_ket', type: 'date' },
                { name: 'gio_thuc_hien' ,type: 'number'},
                { name: 'do_uu-tien', type: 'number'},
                { name: 'ma_jara', type: 'string'},
                { name: 'tien_do', type: 'number'},
                { name: 'ghi_chu', type: 'string'}
            ],
            url: this.$store.state.config.API_URL + 'cong-viec?api_token='+this.$cookies.get('token'),
        }
    
    },
    created()
    {
         this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$cookies.get('token')).then((response) => {
          if(response.data.length == 0)
          {
            this.$cookies.remove('token')
            this.$router.push('/')
          }
          else
          {
              this.my_info = response.data[0]
              if(response.data[0].id_rule > 0)
              { 
                
                this.api_cong_viec(0,0)
               
              }
              else
              {
                  this.api_cong_viec_by_id(response.data[0].id_nd)

              }
                this.api_nhanvien()
                this.api_du_an()
                this.api_loai_cv()
                this.api_du_an_kh()
          }
          
        })
        
    }
}
</script>

<style scoped>
.list-group-item.cv_kh {border-left: 7px solid #209cee;}
.list-group {min-height: 50px;max-height: 360px;overflow: hidden;overflow-y: scroll;height: 360px;padding: 5px;}
.card-title {padding: 5px; background: #209cee;color: #fff;}
/* .card-task {padding: 10px;} */
#page-project {background-image: url('../../../assets/images/banner-project.jpg');height: 100%;background-size: cover;background-repeat: no-repeat}
.menu-left {background: transparent}
.navbar-start {height: 40px;}
.navbar-start>a {color: #fff;}
.navbar-start>a:hover {color: #fff;text-decoration: none;background-color: hsla(0,0%,100%,.3)}
.btn-add-task {width: 100%;border: none}
.menu-left {background: transparent}
.navbar-start {height: 40px;}
.navbar-start>a {color: #fff;}
.navbar-start>a:hover {color: #fff;text-decoration: none;background-color: hsla(0,0%,100%,.3)}
.item-user {width:40px;height:40px;border-radius:50%;background-color: hsla(0,0%,100%,.3);margin: 0 7px;position: relative;border: 1px solid #e2e2e2;margin-top: 10px;}
.card-info-user .avatar {width: 50px;height: 50px;border-radius: 50%;background-color: #3333;margin: auto}
.card-info-user {position: absolute;width: 350px;padding: 10px;display: none}
.item-card:hover .card-info-user,.card-info-user.active {display: block}
.add-task {padding: 7px 15px 5px 15px;border: 1px solid #e2e2e2;cursor: pointer;;}
.btn-add-task {width: 100%;border: none}
.btn-more {float: right;border: none;position: absolute;top: 0;right: 0;}
.item-user-add button {position: absolute;width: 100%;height: 100%;border-radius: 50%;left: 0}
.list-group-item {position: relative;padding: 20px 5px 0 5px;;margin-top: 15px;}
.list-group-item::after{content: ''; position: absolute;width: 40px;left: 5px;top: 5px;border: 1px solid #e2e2e2; background: #e2e2e2;border-radius: 5px;height: 10px;}
.list-group-item.coder::after {background: #209CEE}
.list-group-item.support::after {background: #218838;}
.list-group-item.error {border-left: 7px solid red;}
.list-action {position: absolute;right: 0px;bottom: -60px;z-index: 9999;background: #fff;display: none;}
.list-action li {padding: 10px 15px;border: 1px solid #e2e2e2;border-bottom: none;cursor: pointer;}
.list-action li:hover {background-color: #e2e2e2}
.list-action li:last-child() {border-bottom: 1px solid #e2e2e2;}
.btn-more:hover .list-action {display: block;font-size: 13px;}
.name_user,.item-user.user {float: left;margin-bottom: 10px;}
.name_user {line-height: 60px;}
.btn-zoom {float: right; }
.card-task.not,.card-form {display: none}
.card-form.zoom {display: block;}
.btn-munus {border:none; background: transparent;color: #fff;font-size: 18px;height: 20px; margin-right: 10px;;}
.ten_cv {width: 90%;display: inline-block; font-size: 12.5px;}
.list-filter>li {display: inline-block;margin-left: 5px;margin-top: 5px;font-size: 12.5px;}
.list-filter {font-size: 12.5px;}
.time_filter {height: 36px;padding: 5px;;}
.item-group-task {margin: 10px 0;}
.layout-task {min-width: 1200px;}
</style>