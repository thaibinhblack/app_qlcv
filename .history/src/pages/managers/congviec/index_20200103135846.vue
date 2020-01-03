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
                <li><b-field>
                        <b-button icon-left="filter" @click="isModalFilter = true"></b-button>
                    </b-field>
                </li>
                 <li><b-field>
                        <b-button icon-left="calendar" @click="isModalTime = true"></b-button>
                    </b-field>
                </li>
            </ul>
        </div>
    </div>
    <b-modal :active.sync="isModalFilter" :width="'500px'" > 
        <model-filter-cv :hinhthuc_loc="hinhthuc_loc" :my_info="my_info" :time="time"/>
    </b-modal>
    <div class="row layout-task" style="margin-top: 10px;">
        <item-task :list_congviec="list1" :title="'Công việc chưa phân công'" />
        <item-task :list_congviec="list2" :title="'Công việc đang làm'" />
        <item-task :list_congviec="list3" :title="'Công việc đã hoàn thành'" />
        <item-task :list_congviec="list4" :title="'Công việc gia hạn'" />
    </div>

    <b-modal :active.sync="isActiveModal" :width="'1100px'" :can-cancel="false">
      <p class="background" style="padding:15px;">Danh mục công việc</p>
        <modal-congviec 
        :cong_viec_edit="cong_viec_edit" 
        @clear="update = $event" 
        :isActiveModal="isActiveModal" 
        @create_cong_viec="reset = $event"
        @close="isActiveModal = $event"
        :ca_nhan="true" />
    </b-modal >
    <b-modal :active.sync="isModalBaoCao" :width="'800px'" :can-cancel="false">
        <modal-baocao :cong_viec_edit="cong_viec_edit" :my_info="my_info" @close="isModalBaoCao = false" />
    </b-modal>
    <b-modal :active.sync="isActiveModalGiaHan">
        <modal-gia-han :cong_viec_edit="cong_viec_edit"  @close="isActiveModalGiaHan = false" />
    </b-modal>
    <b-modal :active.sync="isModalTime" :width="'500px'" :can-cancel="false">
        <div class="card" >
            <p class="background">Thời gian công việc</p>
            <form class="form-rule" style="padding:15px;" @submit.prevent="search_congviec()">
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label" >Thời gian bắt đầu</label>
                    <div class="col-sm-8">
                        <b-field>
                        <b-input type="date" v-model="time.time_start"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label" >Thời gian kết thúc</label>
                    <div class="col-sm-8">
                        <b-field>
                        <b-input type="date" v-model="time.time_end"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="col-sm-8">
                    <button style="margin-left: 0" type="submit" class="btn btn-primary btn-form">Tìm kiếm</button>
                </div>
            </form>
        </div>
    </b-modal>
</div>

</template>

<script>
import axios from '@/axios'
import { mapGetters } from 'vuex';
export default {
    components: {
        'modal-congviec': () => import('@/components/modals/modalCongViec.vue'),
        'modal-baocao': () => import('@/components/modals/modalBaocao.vue'),
        'modal-gia-han': () => import('@/components/modals/modalGiaHanThoiGian.vue'),
        'item-task': () => import('@/components/congviec/itemCongViec.vue'),
        'model-filter-cv': () => import('@/components/modals/modalFilterCongViec.vue')
    },
    data()
    {
        return {
            update: false,
            cong_viec_edit: {},
            isActiveModal: false,
            isModalBaoCao: false,
            isActiveModalGiaHan: false,
            isModalFilter: false,
            isModalTime: true,
            my_info: {},
            hinhthuc_loc: 0,
            time_start: null,
            time_end: null,
            time: {
                time_start: new Date().toISOString().substr(0,10),
                time_end: new Date().toISOString().substr(0,10)
            },
            list1: [],
            list2: [],
            list3: [],
            list4: []
        }
    },
    computed:
    {
        ...mapGetters(["getTaskEdit", "getTaskEdit", "getCongViecByStatus1", "getCongViecByStatus2", "getCongViecByStatus3",
         "getCongViecByStatus4"])
    },
    watch:{
        getCongViecByStatus1(val)
        {
            this.list1 = val
        },
        getCongViecByStatus2(val)
        {
            this.list2 = val
        },
        getCongViecByStatus3(val)
        {
            this.list3 = val
        },
        getCongViecByStatus4(val)
        {
            this.list4 = val
        },
        getTaskEdit(val)
        {
            this.isActiveModal = val
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
        // selected_lcv(newVal)
        // {
        //     this.api_fileter_loai_cv(newVal.id_loai_cv)
        // }
    },
    methods: {
        open_gia_han(id)
        {
            this.cong_viec_edit = this.cong_viec.filter((value,index,array) => {
                return array[index].id_cv_da == id
            })[0]
            
            this.isActiveModalGiaHan = true
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
                 this.list4_tmp =  this.list4 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 4
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
                        this.list4_tmp =  this.list4 = response.data.filter((value,index,array) => {
                            return array[index].trang_thai == 4
                        })
                    })
                }
            }
        },
        reset_cong_viec()
        {   
            this.$store.dispatch('FilterCongViecDuAn',this.time)
            this.hinhthuc_loc = 0
            this.selected_lcv = null

        },
        search_congviec()
        {
            this.$store.dispatch('fetchCongViec',this.time)
            this.isModalTime = false
        }
    },
    created()
    {
        axios.defaults.params.api_token = this.$cookies.get('token');
         this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$cookies.get('token')).then((response) => {
          if(response.data.length == 0)
          {
            this.$cookies.remove('token')
            this.$router.push('/')
          }
          else
          {
              this.my_info = response.data[0]
                this.$store.dispatch('fetchUsers');
                this.$store.dispatch('fetchDuAn');
                this.$store.dispatch('fetchLCV')
          }
          
        })
        // this.$store.dispatch('fetchCongViec',null);
        
    }
}
</script>

<style>
.list-group-item.cv_kh {border-left: 7px solid #209cee;}
.list-group {min-height: 50px;max-height: 420px;overflow: hidden;overflow-y: scroll;height: 420px;padding: 5px;}
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
.item-filter {margin: 7px 0;}
.item-filter * {width: 100% !important;}
.item-filter span.select, .item-filter span.select select {width: 100% !important;}
</style>