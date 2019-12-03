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
        <div class="col-3">
            <div class="card card-task">
                <div class="card-title">
                    <h3 style="line-height:36px">Danh sách công việc được giao </h3>
                </div>
                <draggable class="list-group" :list="list1" group="people"  >
                  
                    <div
                        class="list-group-item"
                        v-for="(element, index) in list1"
                        :key="index"
                        :class="{coder: element.id_loai_cv == 1, support: element.id_loai_cv == 3}">
                         
                        <span>{{element.ten_cv}}</span>
                        <small>{{element.username_nd}}</p></small>
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
        </div>
    </div>
</div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    components: {
        draggable
    },
    data()
    {
        return {
            du_an_kh: [],
            selected_project: 0,
            list1: []
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
                this.list1 = response.data.filter((value,index,array) => {
                    return array[index].trang_thai == 1
                })
            })
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
</style>