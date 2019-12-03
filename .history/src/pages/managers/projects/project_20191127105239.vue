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
      <b-navbar class="menu-left" style="height:20px;padding:0">
          <template slot="start">
               <b-navbar-item>
                  <span>DS Nhân viên:</span>
              </b-navbar-item>
             
              <div class="item-card" v-for="i in 5" :key="i">
                <b-navbar-item  class="item-user">
                </b-navbar-item>
                <div class="card card-info-user">
                      <div class="row">
                        <div class="col-sm-4">
                          <div class="avatar item-user" ></div>
                        </div>
                        <div class="col-sm-8">
                          <p>Nguyễn Thái Bình</p>
                          <span>Quản trị dự án</span>
                        </div>
                      </div>
                  </div>
              </div>
               <div class="item-card">
                <b-navbar-item  class="item-user item-user-add">
                 
                    <b-button icon-left="plus" @click="isActiveModalProject = !isActiveModalProject"></b-button>
                      
                </b-navbar-item>
                <!-- <div class="card card-info-user" :class="{active: activeAddUser}">
                    <multiselect v-model="user_selected" :options="users" label="username_nd" track-by="id_nd" :multiple="true" :taggable="true" ></multiselect>
                </div> -->
              </div>
              
          </template>
      </b-navbar>
    </div>
  </div>
  <div class="row" style="margin-top: 50px;">
    <div class="col-3">
      <div class="card card-task">
        <div class="card-title">
          <h3 style="line-height:36px">Danh sách công việc </h3>
        </div>
        <draggable class="list-group" :list="list1" group="people" @change="log" >
          <div
            class="list-group-item"
            v-for="(element, index) in list1"
            :key="index">
           <span>{{element.ten_cv}}</span>
            <b-button icon-left="more" class="btn-more" >
                <ul class="list-action" >
                  <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
                  <li>Gia hạn công việc</li>
                </ul>
            </b-button>
            
             <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value></b-progress>
          </div>
        </draggable>
        <b-field class="add-task" style="margin-top: 15px" >
           <b-button icon-left="plus" @click="isActiveModal = true" class="btn-add-task">Thêm công việc mới</b-button>
        </b-field>
      </div>
    </div>

    <div class="col-3">
      <div class="card card-task">
        <div class="card-title">
          <h3>Công việc đang thực hiện</h3>
        </div>
        <draggable class="list-group" :list="list2" group="people" @change="update_task_2">
           <div
            class="list-group-item"
            v-for="(element, index) in list2"
            :key="index"
          >
            <span>{{element.ten_cv}}</span>
             <b-button icon-left="more" class="btn-more" >
                <ul class="list-action" >
                  <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
                  <li>Gia hạn công việc</li>
                </ul>
            </b-button>
             <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value></b-progress>
          </div>
        </draggable>
      </div>
    </div>
    <div class="col-3">
      <div class="card card-task">
        <div class="card-title">
          <h3>Công việc đang gặp vấn đề</h3>
        </div>
        <draggable class="list-group" :list="list3" group="people" @change="update_task_3">
           <div
            class="list-group-item"
            v-for="(element, index) in list3"
            :key="index"
          >
           <span>{{element.ten_cv}}</span>
             <b-button icon-left="more" class="btn-more" >
                <ul class="list-action" >
                  <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
                  <li>Gia hạn công việc</li>
                </ul>
            </b-button>
             <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value></b-progress>
          </div>
        </draggable>
      </div>
    </div>
    <div class="col-3">
      <div class="card card-task">
        <div class="card-title">
          <h3>Công việc hoàn thành</h3>
        </div>
        <draggable class="list-group" :list="list4" group="people" @change="update_task_4">
            <div
            class="list-group-item"
            v-for="(element, index) in list4"
            :key="index"
          >
           <span>{{element.ten_cv}}</span>
            <b-button icon-left="more" class="btn-more" >
                <ul class="list-action" >
                  <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
                  <li>Gia hạn công việc</li>
                </ul>
            </b-button>
             <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value></b-progress>
          </div>
        </draggable>
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
  <b-modal :active.sync="isActiveModalProject" :width="'900px'" :can-cancel="false">
     <p class="background" style="padding:15px">Danh mục dự án</p>
    <modal-project :selected_project="selected_project" :du_an_selected="du_an_selected" @close="isActiveModalProject = $event" />
  </b-modal>
</div>
</template>
<script>
import draggable from "vuedraggable";
import Multiselect from 'vue-multiselect'
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
    'modal-congviec': () => import('@/components/modals/modalCongViec.vue'),
    'modal-project': () => import('@/components/modals/modalProject.vue'),
    Multiselect
  },
  data() {
    return {
      list1: [

      ],
      list2: [
       
      ],
      list3: [

      ],
      list4: [
        
      ],
      task: {
        disabled: true,
        modal: false
      },
      isActiveModal: false,
      du_an_kh: [],
      du_an_selected: {},
      selected_project: this.$route.query.id_du_an_kh,
      update: false,
      reset: false,
      cong_viec: [],
      cong_viec_edit: {},
      activeAddUser: false,
      users: [],
      user_selected: 0,
      isActiveModalProject: false,

    };
  },
  watch:
  {
    selected_project(newVal)
    {
      
     
      this.api_cong_viec(newVal)
      this.du_an_selected = this.du_an.filter((value,index,array) => {
        return array[index].id_du_an == newVal
      })[0]
      
    },
    reset(newVal)
    {
      if(newVal == true)
      {
        this.reset = false
        this.api_cong_viec(this.selected_project)
      }
    },
    update(newVal)
    { 
      if(newVal == false) {
          this.cong_viec_edit = {}
      }
    }
  },
  methods: {
    
    add_task(){
      this.list1.push({
        name: task,
        id: 10
      })
    },
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log('test',evt);
    },
    update_task_2: function(evt) {
       if(evt.added)
       {
         if(evt.added.element.ngay_cam_ket == null)
         {
           
         }
        console.log(evt.added.element)
        this.axios.post(this.$store.state.config.API_URL + 'cong-viec/'+evt.added.element.id_cv_da+'?api_token='+this.$session.get('token')+'&trang_thai=2').then((response) => {
           console.log(response.data)
         })
       }
    },
    update_task_3: function(evt) {
       if(evt.added)
       {
        this.axios.post(this.$store.state.config.API_URL + 'cong-viec/'+evt.added.element.id_cv_da+'?api_token='+this.$session.get('token')+'&trang_thai=3').then((response) => {
           console.log(response.data)
         })
       }
    },
    update_task_4: function(evt) {
       if(evt.added)
       {
        this.axios.post(this.$store.state.config.API_URL + 'cong-viec/'+evt.added.element.id_cv_da+'?api_token='+this.$session.get('token')+'&trang_thai=4').then((response) => {
           console.log(response.data)
         })
       }
    },
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
    api_cong_viec(id)
    {
    
      const app = this;
      this.axios.get(this.$store.state.config.API_URL + 'cong-viec/'+id+'?api_token='+this.$session.get('token')).then((response) => {
        
        const loadingComponent  = app.$buefy.loading.open();
        // this.du_an_selected = response.data.filter((value,index,array) => {
        //     return array[index].id_du_an == this.$route.query.id_du_an
        // })[0]
        this.cong_viec = response.data
        this.list1 = response.data.filter((value,index,array) => {
          return array[index].trang_thai == 1
        })
        this.list2 = response.data.filter((value,index,array) => {
          return array[index].trang_thai == 2
        })
         this.list3 = response.data.filter((value,index,array) => {
          return array[index].trang_thai == 3
        })
         this.list4 = response.data.filter((value,index,array) => {
          return array[index].trang_thai == 4
        })
        setTimeout(() => {
         loadingComponent.close()
        },500)
       
      })
    },
    open_task(id)
    {
     
      this.cong_viec_edit = this.cong_viec.filter((value,index,array) => {
        return array[index].id_cv_da == id
      })[0]
       this.update = true
      this.isActiveModal = true
      console.log('cv',this.cong_viec.filter((value,index,array) => {
        return array[index].id_cv_da == id
      }), id)
    },
    myChangeEvent(val){
        console.log(val);
    },
    mySelectEvent({id, text}){
        console.log({id, text})
    },
    api_users()
    {
      this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
        this.users = response.data
        console.log(response.data)
      })
    }
  },
  created()
  {
    this.api_du_an_kh()
    this.api_cong_viec(this.$route.query.id_du_an_kh)
    this.api_users()
  }
};
</script>

<style scoped>
.list-group {min-height: 50px;}
.card-task {padding: 10px;}
#page-project {background-image: url('../../../assets/images/banner-project.jpg');height: 100%;background-size: cover;background-repeat: no-repeat}
.menu-left {background: transparent}
.navbar-start {height: 40px;}
.navbar-start>a {color: #fff;}
.navbar-start>a:hover {color: #fff;text-decoration: none;background-color: hsla(0,0%,100%,.3)}
.item-user {width:40px;height:40px;border-radius:50%;background-color: hsla(0,0%,100%,.3);margin: 0 7px;position: relative;}
.card-info-user .avatar {width: 50px;height: 50px;border-radius: 50%;background-color: #3333;margin: auto}
.card-info-user {position: absolute;width: 350px;padding: 10px;display: none}
.item-card:hover .card-info-user,.card-info-user.active {display: block}
.add-task {padding: 7px 15px 5px 15px;border: 1px solid #e2e2e2;cursor: pointer;;}
.btn-add-task {width: 100%;border: none}
.btn-more {float: right;border: none;position: relative;}
.item-user-add button {position: absolute;width: 100%;height: 100%;border-radius: 50%;left: 0}
.list-group-item {position: relative;padding: 10px 5px;}
.list-action {position: absolute;right: -60px;bottom: -60px;z-index: 999;background: #fff;display: none;}
.list-action li {padding: 10px 15px;border: 1px solid #e2e2e2;border-bottom: none;cursor: pointer;}
.list-action li:hover {background-color: #e2e2e2}
.list-action li:last-child() {border-bottom: 1 solid #e2e2e2;}
.btn-more:hover .list-action {display: block;}
</style>