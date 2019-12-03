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
                        <!-- <option v-for="(da,index) in du_an_kh" :key="index" :value="da.id_du_an_kh"> {{da.ten_du_an_kh}}</option> -->
                    </b-select>
                  </b-field>
              </b-navbar-item>
              
          </template>
      </b-navbar>
    </div>
  </div>
</div>
</template>

<style scoped>
.list-group {min-height: 50px;}
.card-task {padding: 10px;}
#page-project {background-image: url('../../../assets/images/banner-project.jpg');height: 100%;background-size: cover;background-repeat: no-repeat}
.menu-left {background: transparent}
</style>