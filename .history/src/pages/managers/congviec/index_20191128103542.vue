<template>
<div id="page-project">
    <div class="row">
        <div class="col-md-7 col-lg-6">
        <b-navbar class="menu-left" style="height:20px;padding:0">
            <template slot="start">
                <b-navbar-item href="/">
                    <b-icon icon="home" size="is-small"></b-icon>
                </b-navbar-item>
                
                <b-navbar-item>
                    <b-field>
                        <b-select v-model="selected_project">
                            <option value="0"> --Tất cả loại dự án--</option>
                            <option v-for="(da,index) in du_an_kh" :key="index" :value="da.id_du_an_kh"> {{da.ten_du_an_kh}}</option>
                        </b-select>
                    </b-field>
                </b-navbar-item>
                
            </template>
        </b-navbar>
        </div>
    </div>
    <div class="row" style="margin-top: 50px;">
        <div :class="zoom">
            <div class="card card-task" :class="{not: zoom == 'col-12'}">
                <div class="card-title">
                    <h3 style="line-height:36px">Danh sách công việc được giao  <b-button @click="zoomLayout()" class="btn-zoom" icon-right="crop-square"></b-button></h3>
                </div>
                <draggable class="list-group" :list="list1" group="people"  >
                  
                    <div
                        class="list-group-item"
                        v-for="(element, index) in list1"
                        :key="index"
                        :class="{coder: element.id_loai_cv == 1, support: element.id_loai_cv == 3, cv_kh: element.type_cv == true}">
                         
                        <span>{{element.ten_cv}}</span> <br/>
                        <small>Người giao việc: {{element.username_nd}} </small>
                        <b-button icon-left="more" class="btn-more" >
                            <ul class="list-action" >
                            <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
                            <li @click="open_gia_han(element.id_cv_da)">Gia hạn công việc</li>
                            </ul>
                        </b-button>
                        <!-- <div class="avatar">
                        <div class="user item-user"></div>
                        <span class="name_user">Nguyễn Thái Bình</span>
                        </div> -->
                        <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value style="margin-top:10px;"></b-progress>
                    </div>
                    </draggable>
                <b-field class="add-task" style="margin-top: 15px" >
                <b-button icon-left="plus" @click="isActiveModal = true" class="btn-add-task">Thêm công việc mới</b-button>
                </b-field>
            </div>
            <div class="card card-form" :class="{zoom: zoom == 'col-12'}">
                <p class="background">Danh sácch công việc</p>
                <JqxGrid ref="myGrid"
                        :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                        :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true">
                </JqxGrid>
            </div>
        </div>
    </div>

    <b-modal :active.sync="isActiveModal" :width="'900px'" :can-cancel="false">
      <p class="background" style="padding:15px;">Danh mục công việc</p>
        <modal-congviec :du_an="du_an_kh" 
        :cong_viec_edit="cong_viec_edit" 
        :update="update"
        @clear="update = $event" 
        :selected_project="selected_project" 
        :isActiveModal="isActiveModal" 
        @create_cong_viec="reset = $event"
        @close="isActiveModal = $event" />
    </b-modal >
</div>

</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
import draggable from "vuedraggable";
export default {
    components: {
        draggable,
        JqxGrid,
        'modal-congviec': () => import('@/components/modals/modalCongViec.vue'),
    },
    data()
    {
        return {
            du_an_kh: [],
            selected_project: 0,
            list1: [],
            update: false,
            cong_viec_edit: {},
            cong_viec: [],
            isActiveModal: false,
            selected_project: 0,
            zoom: 'col-3',
            columns: [
                {text: 'ID_CV_DA', datafield: 'ID_CV_DA', hidden: true},
                {text: 'Tên công việc', datafield: 'TEN_CV', width: 240},
                {text: 'Loại công việc', datafield: 'TEN_LOAI_CV', width: 140},
                {text: 'Người giao việc', datafield: 'username_nd', width: 240},
                {text: 'Nội dung công việc', datafield: 'NOI_DUNG_CV', width: 240},
                {text: 'Ngày tiếp nhận', datafield: 'NGAY_TIEP_NHAN', width: 240},
                {text: 'Ngày giao việc', datafield: 'NGAY_GIAO_VIEC', width: 240},
                {text: 'Ngày hoàn thành', datafield: 'NGAY_HOAN_THANH', width: 240},
                {text: 'Ngày cam kết', datafield: 'NGAY_CAM_KET', width: 240},
                {text: 'Giờ thực hiện', datafield: 'GIO_THUC_HIEN', width: 50},
                {text: 'Độ ưu tiên', datafield: 'DO_UU_TIEN', width: 50},
                {text: 'Mã JIRA', datafield: 'MA_JIRA', width: 240},
                {text: 'Tiên độ', datafield: 'TIEN_DO', width: 50},
                {text: 'Ghi chú', datafield: 'GHI_CHU', width: 240},
            ],
        }
    },
    methods: {
        api_du_an_kh()
        {
            this.axios.get(this.$store.state.config.API_URL + 'du-an-kh?api_token='+this.$session.get("token")).then((response) => {
                this.du_an_kh = response.data
                this.du_an_selected = response.data.filter((value,index,array) => {
                return array[index].id_du_an_kh == this.$route.query.id_du_an_kh
                })[0]
                console.log('test',this.du_an_selected);
                    // this.cong_viec = response.data
            })
        },
        api_cong_viec()
        {
            this.axios.get(this.$store.state.config.API_URL + 'cong-viec?api_token='+this.$session.get('token')).then((response) => {
                console.log(response.data)
                this.cong_viec = response.data
                this.list1 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 1
                })
            })
        },
        open_task(id)
        {
            
            this.cong_viec_edit = this.cong_viec.filter((value,index,array) => {
                return array[index].id_cv_da == id
            })[0]
            this.update = true
            this.isActiveModal = true
            console.log('cv',this.cong_viec_edit, id)
        },
        open_gia_han(id)
        {
            this.cong_viec_edit = this.cong_viec.filter((value,index,array) => {
                return array[index].id_cv_da == id
            })[0]
            
            this.isActiveModalGiaHan = true
            console.log('cv',this.cong_viec_edit, id)
        },
        zoomLayout()
        {
           this.zoom =  this.zoom == 'col-3' ? 'col-12' : 'col-3'
        }
    },
    beforeCreate()
    {
         this.source = {
            datatype: "json",
            datafields: [
                { name: 'ID_CV_DA', type: 'number'},
                { name: 'TEN_CV' , type: 'string' },
                { name: 'TEN_LOAI_CV' , type: 'string' },
                { name: 'username_nd', type: 'string' },
                { name: 'NOI_DUNG_CV' ,type: 'string'},
                { name: 'NGAY_TIEP_NHAN' ,type: 'date'},
                { name: 'NGAY_GIAO_VIEC', type: 'date' },
                { name: 'NGAY_HOAN_THANH', type: 'date' },
                { name: 'NGAY_CAM_KET', type: 'date' },
                { name: 'GIO_THUC_HIEN' ,type: 'number'},
                { name: 'DO_UU_TIEN', type: 'number'},
                { name: 'MA_JIRA', type: 'string'},
                { name: 'TIEN_DO', type: 'number'},
                { name: 'GHI_CHU', type: 'string'}
            ],
            url: this.$store.state.config.API_URL + 'cong-viec?trang_thai=1&api_token='+this.$session.get('token'),
            }
    },
    created()
    {
        this.api_du_an_kh()
        this.api_cong_viec()
    }
}
</script>

<style scoped>
.list-group-item.cv_kh {border-left: 7px solid #209cee;}
.list-group {min-height: 50px;}
.card-task {padding: 10px;}
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
.list-group-item {position: relative;padding: 20px 5px;margin-top: 15px;}
.list-group-item::after{content: ''; position: absolute;width: 40px;left: 5px;top: 5px;border: 1px solid #e2e2e2; background: #e2e2e2;border-radius: 5px;height: 10px;}
.list-group-item.coder::after {background: #209CEE}
.list-group-item.support::after {background: #218838;}
.list-action {position: absolute;right: 0px;bottom: -60px;z-index: 9999;background: #fff;display: none;}
.list-action li {padding: 10px 15px;border: 1px solid #e2e2e2;border-bottom: none;cursor: pointer;}
.list-action li:hover {background-color: #e2e2e2}
.list-action li:last-child() {border-bottom: 1 solid #e2e2e2;}
.btn-more:hover .list-action {display: block;font-size: 13px;}
.name_user,.item-user.user {float: left;margin-bottom: 10px;}
.name_user {line-height: 60px;}
.btn-zoom {float: right; }
.card-task.not,.card-form {display: none}
.card-form.zoom {display: block;}
</style>