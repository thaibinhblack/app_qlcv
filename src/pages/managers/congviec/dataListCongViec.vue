<template>
        <section class="section-data" > 
          <!-- {{setting_modal}}  -->
            <div class="header header-datalist">
                <!-- {{checkedRows.length}} -->
                
                <ul class="list-action-data top">
                    <li><b-button class="btn btn-add" @click='$store.dispatch("updateModalEdit",true)' >Thêm mới</b-button></li>
                    <li><b-button :disabled="checkedRows.length > 0 ? false : true" class="btn btn-add" @click="gui_tham_dinh()" >{{filter_tham_dinh == 0 ? 'Gửi thẩm định' : 'Hủy thẩm định'}}</b-button></li>
                      <b-field>
                        <b-select v-model="perPage" class="height43">
                          <option :value="10">10</option>
                          <option :value="20">20</option>
                          <option :value="50">50</option>
                          <option :value="100">100</option>
                          <option :value="200">200</option>
                          <option :value="300">300</option>
                          <option :value="400">400</option>
                          <option :value="500">500</option>
                          <option :value="1000">1000</option>
                        </b-select>
                      </b-field>
                    </li>
                    <li>
                       <multiselect v-model="selected_du_an" 
      
                        :options="LIST_DUAN" 
                        label="ten_du_an" 
                        track-by="ten_du_an" placeholder="Danh sách dự án"
                        :multiple="false"  :show-labels="false" ></multiselect>
                    </li>
                    <li>
                       <multiselect v-model="selected_du_an_kh" 
                        placeholder="Chọn dự án"
                        :options="LIST_DUAN_KH" label="ten_kh" track-by="id_du_an_kh" 
                        :multiple="true" :taggable="true"  :show-labels="false"></multiselect>
                    </li>
                    <li v-if="INFO_USER.id_rule > 0">
                        <multiselect placeholder="Chọn người nhận việc" :show-labels="false"  v-model="selected_user" :options="LIST_USER" label="display_name" track-by="id_nd" ></multiselect>

                    </li>
                    <li>
                       <multiselect :options="GROUP_LCV"
                          v-model="selected_loai_cv"
                          placeholder="Chọn loại công việc"
                          :multiple="false"
                          :group-values="'children'"
                          :group-label="'parent'"
                          :group-select="false"
                          :show-labels="false"
                          track-by="ten_loai_cv"
                          label="ten_loai_cv"></multiselect>
                    </li>
                    <li class="right"><b-button icon-left="settings" @click="isModalSetting = true"></b-button></li>
                    <li > <button-export-excel :list_cong_viec="list_cong_viec" /></li>
                </ul>
                <ul class="list-action-data">
                   <li>
                      <b-field>
                        <b-input v-model="filter.time_start" type="date"></b-input>
                      </b-field>
                    </li>
                    <li>
                      <b-field>
                        <b-input v-model="filter.time_end" type="date"></b-input>
                      </b-field>
                    </li>
                    <li>
                      <b-button style="margin-bottom: 5px;vertical-align: unset !importtant;" icon-left="arrow-right"
                        @click="FilterCongViecDuAn()"></b-button>
                    </li>
                </ul>
                <div class="col-sm-12" style="margin-top: 15px;">
                  <span style="float:right">Tổng số giờ làm việc: <strong>{{total_time_cong_viec.toFixed(2)}} giờ</strong> </span>
                  <!-- {{list_cong_viec}} -->
                </div>
            </div>

            <b-modal :active.sync="isModalSetting" :width="'100%'" full-screen>
                <modal-setting />
            </b-modal>

             <b-table
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :checked-rows.sync="checkedRows"
                :is-row-checkable="(row) => row.trang_thai == 3"
                checkable
                class="table-data-cv"
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :data="list_cong_viec">
                 <template slot-scope="props">
                    
                    <b-table-column  v-for="(setting,index) in GET_SETTING" :key="index" :label="setting.label" :width="setting.width" >
                      <!-- {{setting.column}} -->
                       <template slot="header" slot-scope="{ column }">
                          <b-tooltip :label="column.label" dashed>
                              {{ column.label }}
                          </b-tooltip>
                          <br />
                          <input class="from-control" type="text" :style="{width: setting.width}"  v-model="search[index]" @change="search_cv(index, setting.column)" >
                          <!-- <b-input type="text" v-model="search[index]" @input="search_cv(index, setting.column)"></b-input> -->
                      </template> 
                          <span v-if="setting.column == 'ngay_tiep_nhan' || setting.column == 'ngay_giao_viec' || setting.column == 'ngay_hoan_thanh' || setting.column == 'ngay_cam_ket'">
                           
                            <span v-if="setting.column == 'ngay_hoan_thanh'">
                              {{props.row[setting.column]}}
                            </span>
                            <span v-if="setting.column == 'ngay_tiep_nhan'">
                              {{props.row[setting.column].substr(0,10)}}
                            </span>
                            <span v-if="setting.column == 'ngay_giao_viec'">
                             {{props.row[setting.column]}}
                            </span>
                            <span v-if="setting.column == 'ngay_cam_ket'">
                              {{props.row[setting.column]}}
                            </span>
                        </span>
                        <span class="ten_cv" v-else-if="setting.column == 'ten_cv'"  @click="$store.dispatch('openTask',props.row.id_cv_da)">
                           {{props.row[setting.column]}}
                        </span>
                        <span v-else-if="setting.column == 'noi_dung_cv'" >
                           {{(props.row[setting.column]) != null ? (props.row[setting.column]).slice(0,50) +'...' : props.row[setting.column]  }}
                        </span>
                        <span v-else>
                              {{setting.column == 'trang_thai' ?
                          (props.row[setting.column] == 1 ? 'Chưa thực hiện' : props.row[setting.column] == 2 ? 'Đang thực hiện' : 'Hoàn thành') : props.row[setting.column] }}
                        </span>
                        <!-- {{props.row[setting.column]}} -->
                    </b-table-column>
                    <!-- <b-table-column label="Thời gian thẩm định" v-if="INFO_USER.id_rule > 0"> 
                      <input v-model="props.row['tham_dinh_tgian']" type="number">
                    </b-table-column> -->
                     <b-table-column width="200" style="display:flex">
                        <b-button class="btn-action" icon-left="pen"  @click="$store.dispatch('openTask',props.row.id_cv_da)"></b-button>
                        <b-button class="btn-action" icon-left="delete"  @click="deleteCongViec(props.row.id_cv_da)"></b-button>
                        <b-button class="btn-action" icon-left="update"  @click="$store.dispatch('openBaoCao',props.row.id_cv_da)"></b-button>
                    </b-table-column>
                    
                  </template>
            </b-table>
            <b-modal :active.sync="isModalDelete" :width="'300px'" :can-cancel="false">
                <div class="warnning" >
                    <p class="background">Bạn có chắc xóa công việc này? <b-button @click="isModalDelete = false" icon-left="close" class="btn btn-close"></b-button></p>
                  <div class="group-button" style="padding:15px;text-align: center;">
                        <b-button color="primary" type="is-warning" class="success" @click="success_delete()">Chấp nhận</b-button>
                        <b-button color="warning"  type="is-success" style="margin-left:10px;" @click="isModalDelete = false"> Hủy bỏ</b-button>
                  </div>
                </div>
            </b-modal>
        </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'
export default {
    components: {
      'modal-setting': () => import('@/components/settings/modalSettingDataCV.vue'),
      'button-export-excel': () => import('./exportExcel.vue'),
      Multiselect
    },
    props:["time"],
    data()
    {
      return {
          isModalDelete:false,
          isPaginated: true,
          isPaginationSimple: true,
          paginationPosition: 'bottom',
          currentPage: 1,
          perPage: 10,
          isModalSetting: false,
          filter: {
              id_du_an: 0,
              id_du_an_kh: 0,
              id_loai_cv: 0,
              nguoi_nhan_viec: 0,
              time_start: this.time.time_start,
              time_end: this.time.time_end
          },
          list_cong_viec: this.getCongViec,
          list_cong_viec_tmp: this.getCongViec,
          filter_trang_thai: 0,
          checkedRows: [],
          filter_tham_dinh: 0,
          defaultSortOrder: 'desc',
          sortField: "gio_thuc_hien",
          sortOrder: 'desc',
          search: [],
          selected_loai_cv: null,
          selected_du_an: null,
          selected_du_an_kh: null,
          selected_user: null
      }
    },
    computed:{
        ...mapGetters(["LIST_USER", "GROUP_LCV","getCongViec", "GET_SETTING", "LIST_DUAN", "LIST_DUAN_KH", "setting_modal", "total_time_cong_viec", "INFO_USER"])
    },
    watch:
    {
      getCongViec(val)
      {

        this.list_cong_viec_tmp = this.list_cong_viec = val
        this.filter_trang_thai = 0
      },
      filter_trang_thai(val)
      {
        if(val != 0)
        {
          this.list_cong_viec = this.list_cong_viec_tmp.filter((value,index,array) => {
            return array[index].trang_thai == val
          })
        }
        else
        {
          this.list_cong_viec = this.list_cong_viec_tmp
        }
      },
      filter_tham_dinh(val)
      {
        if(val != 0)
        {
          this.list_cong_viec = this.list_cong_viec_tmp.filter((value,index,array) => {
            if(val == 1)
            {
              array[index].tham_dinh_tgian = array[index].gio_thuc_hien
            }
            return array[index].trang_thai_td == val
          })
        }
        else
        {
          this.list_cong_viec = this.list_cong_viec_tmp
        }
      },
      selected_du_an(du_an)
      {
          if(du_an != null)
          {
             this.$store.dispatch('fetchDuAnKHById',du_an.id_du_an);
            this.filter.id_du_an = du_an.id_du_an
          }
          else
          {
            this.filter.id_du_an = 0
          }
      },
      selected_du_an_kh(du_an)
      {
        if(du_an != null)
        {
          this.filter.id_du_an_kh = du_an.id_du_an_kh
        }
        else
        {
          this.filter.id_du_an_kh = 0
        }
      },
      selected_user(user)
      {
        if(user != null)
        {
          this.filter.nguoi_nhan_viec = user.id_nd
        }
      },
    },
    methods:
    {
      deleteCongViec($id)
      {
          this.isModalDelete = true
          this.ID_CV_DA = $id
      },
      success_delete()
      {
          this.$store.dispatch('deleteCongViec',this.ID_CV_DA).then(() => {
              this.isModalDelete = false
              this.$buefy.notification.open({
                  duration: 1500,
                  message: 'Bạn vừa xóa công việc',
                  position: 'is-bottom-left',
                  type: 'is-success',
                  hasIcon: true
              })
          }).catch(() => {
              this.$buefy.notification.open({
                  duration: 1500,
                  message: 'Lỗi! Xin vui lòng thử lại',
                  position: 'is-bottom-left',
                  type: 'is-danger',
                  hasIcon: true
              })
          })
      },
      FilterCongViecDuAn()
      {
          this.filter.id_du_an_kh = 0
          this.$store.dispatch('fetchDuAnKHById',this.filter.id_du_an);
          // this.time.id_du_an = newVal;
          // this.$store.dispatch('FilterCongViecDuAn',this.time)
          this.$store.dispatch('FilterCongViec',this.filter)
      },
      onSort(field, order) {
            this.sortField = field
            this.sortOrder = order
            this.loadAsyncData()
      },
      gui_tham_dinh()
      {
        var app = this;
        this.$store.dispatch("sendThamDinh",{
          list_cv: this.checkedRows,
          tham_dinh: this.filter_tham_dinh})
        .then(() => {
          this.checkedRows = []
          app.$buefy.notification.open({
              duration: 1500,
              message: this.filter_tham_dinh == 0 ? 'Gửi thẩm định thành công': 'Hủy thẩm định thành công',
              position: 'is-bottom-left',
              type: 'is-success',
              hasIcon: true
          })
          this.filter_tham_dinh = 0
          this.list_cong_viec = this.getCongViec
          
        })
        .catch(() => {
          app.$buefy.notification.open({
              duration: 1500,
              message: 'Lỗi server! xin vui lòng thử lại!' ,
              position: 'is-bottom-left',
              type: 'is-success',
              hasIcon: true
          })
        })
      },
      search_cv(index,column)
      {
          // console.log(this.search[index])
          this.list_cong_viec = this.getCongViec.filter((el) => {
            // console.log((el.ten_cv).toLowerCase())
              // console.log(  array[index][column].indexOf(this.search[index]))
              // // console.log(  array[index][column].includes(this.search[index]))
              
              return (el[column]).toLowerCase().indexOf((this.search[index]).toLowerCase()) > -1
          })
      }
    },
    created()
    {
      this.$store.dispatch("SELECT_SETTING")
      this.$store.dispatch('SELECT_SETTING_MODAL_CV')
    }
}
</script>
<style>
.section-data {font-size: 12px;}
.btn-action {float: left; margin-left: 5px}
.avatar {width: 50px;height: 50px;border-radius: 50%;background:#e2e2e2;}
.avatar img {width: 100%;border-radius: 50%;height: 50px;}
.header-datalist {padding: 10px;background: #fff;border-radius: 5px; margin-bottom: 5px;}
.section-data {padding: 5px; border-radius: 5px;background: #fff;}
.btn-add {border: 1px solid #e2e2e2;}
.btn-add:hover {background: #209cee;color: #fff;}
.list-action-data {width: 100%;}
.list-action-data>li {display: inline-block; margin: 5px;}
.list-action-data.top {margin-bottom: 10px;}
.list-action-data.top>li:last-child, li.right {float: right}
.filter-duan-kh>.filed {width: 200px !important;;}
.table-data-cv {max-width: 100%;overflow: scroll; width: 100%;overflow-y: hidden}
.table-data-cv table tr:nth-child(even) {background: #e2e2e2;}
table td{
  border: 1px solid #ddd;
  padding: 5px;
  line-height: 36px;
}

table tr:nth-child(even){background-color: #f2f2f2 !important;}

table tr:hover {background-color: #ddd;}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: white;
}
.m200 {max-width: 200px;}
</style> 