<template>
<div id="page-project">
  <div class="row">
    <div class="col-md-7 col-lg-6">
      <b-navbar class="menu-left" style="height:20px;padding:0">
          <template slot="start">
            <b-navbar-item href="/">
                  <b-icon icon="home" size="is-small"></b-icon>
              </b-navbar-item>
             
              <b-navbar-item href="#">
                   <b-field>
                    <b-select v-model="selected_project">
                        <option value="0"> --Tất cả loại dự án--</option>
                        <option v-for="(da,index) in du_an" :key="index" :value="da.id_du_an"> {{da.ten_du_an}}</option>
                    </b-select>
                  </b-field>
              </b-navbar-item>
              
          </template>
      </b-navbar>
      <b-navbar class="menu-left" style="height:20px;padding:0">
          <template slot="start">
               <b-navbar-item>
                  <span>Tên dự án</span>
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
            :key="element.name"
          >
            {{ element.name }} {{ index }}
          </div>
        </draggable>
        <b-field class="add-task" style="margin-top: 15px" >
           <b-button icon-left="plus" @click="isActiveModal = true">Thêm công việc mới</b-button>
        </b-field>
      </div>
    </div>

    <div class="col-3">
      <div class="card card-task">
        <div class="card-title">
          <h3>Công việc đang thực hiện</h3>
        </div>
        <draggable class="list-group" :list="list2" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element, index) in list2"
            :key="element.name"
          >
            {{ element.name }} {{ index }}
          </div>
        </draggable>
      </div>
    </div>
    <div class="col-3">
      <div class="card card-task">
        <div class="card-title">
          <h3>Công việc đang gặp vấn đề</h3>
        </div>
        <draggable class="list-group" :list="list3" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element, index) in list3"
            :key="element.name"
          >
            {{ element.name }} {{ index }}
          </div>
        </draggable>
      </div>
    </div>
    <div class="col-3">
      <div class="card card-task">
        <div class="card-title">
          <h3>Công việc hoàn thành</h3>
        </div>
        <draggable class="list-group" :list="list4" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element, index) in list4"
            :key="element.name"
          >
            {{ element.name }} {{ index }}
          </div>
        </draggable>
      </div>
    </div>
    
  </div>
  <b-modal :active.sync="isActiveModal" :width="'900px'">
     <form action="" style="width:100%;padding:15px;">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
              <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên dự án" ></b-input>
              </div>
            </div>
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Nội dung</label>
              <div class="col-sm-8">
                <b-input type="textarea"  minlength=""
                maxlength="255" placeholder="Mô tả"  ></b-input>
              </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày tiếp nhận</label>
                <div class="col-sm-8">
                  <b-field >
                      <b-datepicker
                          :show-week-number="showWeekNumber"
                          placeholder="Nhập ngày sinh"
                          
                          @date-formatter="formatter(date)"
                          style="z-index:9999"
                          icon="calendar-today">
                      </b-datepicker>
                  </b-field>
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Ngày hoàn thành</label>
                <div class="col-sm-8">
                  <b-field >
                      <b-datepicker
                          :show-week-number="showWeekNumber"
                          placeholder="Nhập ngày sinh"
                          
                          @date-formatter="formatter(date)"
                          style="z-index:9999"
                          icon="calendar-today">
                      </b-datepicker>
                  </b-field>
                </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Người giao việc</label>
              <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên dự án" ></b-input>
              </div>
            </div>
            <div class="form-group row">        
              <label for="inputPassword3" class="col-sm-4 col-form-label" >Người tiếp nhận</label>
              <div class="col-sm-8">
                <b-input type="text"  placeholder="Tên dự án" ></b-input>
              </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái</label>
                  <div class="col-sm-8">
                      <b-field>
                          <b-select v-model="du_an.trang_thai_du_an">
                              <option value="1" selected>Đang hoạt động</option>
                              <option value="2">Đang bảo trì</option>
                              <option value="3">Ngừng hoạt động</option>
                          </b-select>
                      </b-field>
                  </div>
              </div>
            </div>
        </div>
     </form>
  </b-modal>

</div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
    'modal-task': () => import("@/components/modal/modalTask.vue")
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
      du_an: [],
      selected_project: 0
    };
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
      window.console.log(evt);
    },
    api_loai_du_an()
    {
      this.axios.get(this.$store.state.config.API_URL + 'du-an?api_token='+this.$session.get("token")).then((response) => {
        this.du_an = response.data
      })
    }
  },
  created()
  {
    this.api_loai_du_an()
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
.item-card:hover .card-info-user {display: block}
.add-task {padding: 7px 15px 5px 15px;border: 1px solid #e2e2e2;cursor: pointer;;}
</style>