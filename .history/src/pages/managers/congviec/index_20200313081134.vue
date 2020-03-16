<template>
<div id="page-project" class="layout-task">
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <ul class="list-filter">
                
                <li><a href="/dashboard"><b-button icon-left="home" size="6"></b-button></a></li>
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
    <b-tabs v-model="activeTab">
        <b-tab-item label="TASK" >
            <div class="row layout-task" >
                <item-task :list_congviec="list1" :title="'Công việc chưa phân công'" :status="1" />
                <item-task :list_congviec="list2" :title="'Công việc đang làm'" :status="2" />
                <item-task :list_congviec="list3" :title="'Công việc đã hoàn thành'" :status="3" />
                <item-task :list_congviec="list4" :title="'Công việc gia hạn'" :status="4" />
            </div>  
        </b-tab-item>
        <b-tab-item label="LIST" active>
            <data-list-congviec :time="time" />
        </b-tab-item>
        <b-tab-item label="CHỜ THẨM ĐỊNH">
            <data-list-cho-tham-dinh :time="time" />
        </b-tab-item>
        <b-tab-item label="ĐÃ THẨM ĐỊNH">
            <data-list-da-tham-dinh :time="time" />
        </b-tab-item>
        <b-tab-item label="CÔNG VIỆC ĐÃ PHÂN CÔNG">
            <data-list-phan-cong :time="time" />
        </b-tab-item>
         <b-tab-item label="CÁC CÔNG VIỆC THÊM TRONG NGÀY">
           <data-list-trong-ngay :time="time" />
        </b-tab-item>
    </b-tabs>

    <b-modal :active.sync="isModalEdit" :width="'100%'" full-screen :can-cancel="false"  @on-cancel="close()">
      <p class="background" >Danh mục công việc <b-button icon-left="close" class="btn btn-close btn-form" @click="close()" ></b-button></p>
        <modal-congviec @submit="check_submit = $event" :isActiveModal="isActiveModal" :time="time" @close="isActiveModal = $event" />
    </b-modal >
    <b-modal :active.sync="isModalBaoCao" :width="'800px'" :can-cancel="false">
        <p class="background">Danh mục báo cáo <b-button icon-left="close" class="btn btn-close btn-form" @click="$store.dispatch('updateModalBaoCao',false)" ></b-button></p>
        <modal-baocao  />
    </b-modal>
    <b-modal :active.sync="isActiveModalGiaHan">
        <modal-gia-han :cong_viec_edit="cong_viec_edit"  @close="isActiveModalGiaHan = false" />
    </b-modal>
    <b-modal :active.sync="isModalTime" :width="'500px'" :can-cancel="false">
        <div class="card" >
            <p class="background">Thời gian công việc  <b-button icon-left="close" class="btn btn-close btn-form" @click="close_modal_time()" ></b-button>   </p>
             
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
    <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>

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
        'model-filter-cv': () => import('@/components/modals/modalFilterCongViec.vue'),
        'data-list-congviec': () => import('./dataListCongViec.vue'),
        'data-list-cho-tham-dinh': () => import('./dataChoThamDinh.vue'),
        'data-list-da-tham-dinh': () => import('./dataListDaThamDinh'),
        'data-list-trong-ngay': () => import('./dataCongViecTrongNgay'),
        'data-list-phan-cong': () => import('./dataCongViecPhanCong')
    },
    data()
    {
        return {
            update: false,
            cong_viec_edit: {},
            isActiveModal: false,
            isActiveModalGiaHan: false,
            isModalFilter: false,
            isModalTime: false,
            my_info: {},
            hinhthuc_loc: 0,
            time_start: null,
            time_end: null,
            time: {
                time_start: new Date(new Date().getFullYear(),new Date().getMonth() ,1).toISOString().substr(0,10),
                time_end: new Date().toISOString().substr(0,10)
            },
            list1: [],
            list2: [],
            list3: [],
            list4: [],
            activeTab: 1,
            check_submit: false
        }
    },
    computed:
    {
        ...mapGetters(["getTaskEdit", "getTaskEdit", "getCongViecByStatus1", "getCongViecByStatus2", "getCongViecByStatus3",
         "getCongViecByStatus4", "isModalEdit", "INFO_USER", "isModalGiaHan", "isModalBaoCao", "isLoading"])
    },
    watch:{
        activeTab(tab)
        {
            // console.log(tab)
        },
        isModalBaoCao(val)
        {
            if(val == false)
            {
                this.search_congviec()
            }
        },
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
        INFO_USER(val)
        {
            if(Object.entries(val).length > 0)
            {
                this.my_info = val
                this.$store.dispatch('fetchUsers');
                this.$store.dispatch('fetchDuAn');
                this.$store.dispatch('fetchLCV')
            }
        },
        check_submit(boolean)
        {
            // console.log('boolean',boolean)
            if(boolean == true)
            {
                // console.log('reset')
                this.$store.dispatch('fetchCongViec',null)
                this.$store.dispatch("fetchCongViecTD",{
                    time: this.time,
                    P_TRANG_THAI_TD: 1
                })
                 this.$store.dispatch("fetchCongViecTD",{
                    time: this.time,
                    P_TRANG_THAI_TD: 2
                })
                 this.check_submit = false
            }
           
        }

    },
    methods: {
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
        },
        close()
        {
            this.$store.dispatch("updateModalEdit",false)
            this.$store.dispatch("resetCongViecEdit")
        },
        close_modal_time()
        {
            
            this.isModalTime = false
        }
    },
    created()
    {
        axios.defaults.params.api_token = this.$cookies.get('token');
        if(!this.$cookies.isKey('token'))
        {
            this.$router.push('/login')
        }
        else
        {
            this.axios.get(this.$store.state.config.API_URL + 'token?api_token='+this.$cookies.get('token')).then((response) => {
                    // this.user = response.data[0]
                    
                    // console.log(Object.entries(response.data).length)
                    if(Object.entries(response.data).length === 0)
                    {
                        this.$cookies.remove('token')
                        this.$router.push('/login')
                    }
                    else
                    {
                        this.$store.dispatch('fetchCongViec',null)
                    }
            })
        }
        this.$store.dispatch('GET_INFO_USER');  
             
    }
}
</script>

<style>
.height43 {height: 43px;}
.height43 select {height: 43px;}
.list-action-data {display: flex}
.list-group-item.cv_kh {border-left: 7px solid #209cee;}
.list-group {min-height: 50px;max-height: 420px;overflow: hidden;overflow-y: scroll;height: 420px;padding: 5px;}
.card-title {padding: 5px; background: #209cee;color: #fff; line-height: 35px}
/* .card-task {padding: 10px;} */
#page-project {background-image: url('../../../assets/images/bacground-login.jpg');min-height: 100%;background-size: cover;background-repeat: no-repeat}
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

.list-group-item.error {border-left: 7px solid red;}
.list-action {position: absolute;right: 0px;top: 0;z-index: 9999;background: #fff;display: none;}
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
.btn-close {background: transparent !important;color: #fff;float: right;border: none}
</style>