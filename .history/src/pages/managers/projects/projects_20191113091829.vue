<template>
<div id="page-project">
  <div class="row">
    <div class="col-md-5 col-lg-4">
      <b-navbar class="menu-left">
          <template slot="start">
              <b-navbar-item href="/">
                  <b-icon icon="home" size="is-small"></b-icon>
              </b-navbar-item>
              <b-navbar-item href="#">
                  <b-icon icon="bookmarks" size="is-small"></b-icon> Dự án
              </b-navbar-item>
              
          </template>
      </b-navbar>
    </div>
  </div>
  <div class="row">
    <div class="col-3">
      <div class="card card-task">
        <div class="card-title">
          <h3 style="line-height:36px">Danh sách công việc </h3>
        </div>
        <draggable class="list-group" :list="list1" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element, index) in list1"
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
</div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
       
      ],
      list3: [

      ],
      list4: [
        
      ]
    };
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
.card-task {padding: 10px;}
#page-project {background-image: url('../../../assets/images/banner-project.jpg');height: 100%;background-size: cover;background-repeat: no-repeat}
.menu-left {background: transparent}
.navbar-start {height: 40px;}
.navbar-start>a {color: #fff;}
.navbar-start>a:hover {color: #fff;text-decoration: none;background-color: hsla(0,0%,100%,.3)}
</style>