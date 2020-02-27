<template>
        <section class="section-data" > 
          <!-- {{setting_modal}}  -->
            <div class="header header-datalist">
                <!-- {{checkedRows.length}} -->
                <ul class="list-action-data top">
                    <li v-if="INFO_USER.id_rule > 0"><b-button :disabled="checkedRows.length > 0 ? false : true" class="btn btn-add" @click="gui_tham_dinh()" >{{filter_tham_dinh == 0 ? 'Gửi thẩm định' : 'Hủy thẩm định'}}</b-button></li>
                    <li v-if="INFO_USER.id_rule > 0"><b-button :disabled="checkedRows.length > 0 ? false : true" class="btn btn-add" @click="tham_dinh()" >Thẩm định</b-button></li>
                    <!-- {{filter}} -->
                    <li>
                      <b-field>
                        <b-select v-model="perPage">
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
                  <span style="float:right">Tổng số giờ làm việc: <strong>{{total_time_cho_tham_dinh.toFixed(2)}} giờ</strong> </span>
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
                   
                    <b-table-column  v-for="(setting,index) in GET_SETTING" :key="index" :label="setting.label"  >
                      <!-- {{setting.column}} -->
                        {{setting.column == 'trang_thai' ?
                          (props.row[setting.column] == 1 ? 'Chưa thực hiện' : props.row[setting.column] == 2 ? 'Đang thực hiện' : 'Hoàn thành') : props.row[setting.column] }}
                        <!-- {{props.row[setting.column]}} -->
                    </b-table-column>
                    <b-table-column label="Thời gian thẩm định" v-if="INFO_USER.id_rule > 0"> 
                      <input v-model="props.row['tham_dinh_tgian']" type="number">
                    </b-table-column>
                     <b-table-column width="120">
                        <b-button class="btn-action" icon-left="pen"  @click="$store.dispatch('openTaskTD',props.row.id_cv_da)"></b-button>
                        <b-button class="btn-action" icon-left="update"  @click="$store.dispatch('openBaoCao',props.row.id_cv_da)"></b-button>
                    </b-table-column>
                 </template>
            </b-table>
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
              time_end: this.time.time_end,
              trang_thai_td: 1
          },
          list_cong_viec: this.LIST_CONG_VIEC_CTD,
          list_cong_viec_tmp: this.LIST_CONG_VIEC_CTD,
          filter_trang_thai: 0,
          checkedRows: [],
          filter_tham_dinh: 1,
          defaultSortOrder: 'desc',
          sortField: "gio_thuc_hien",
          sortOrder: 'desc',
          selected_user: null,
          selected_loai_cv: null,
          selected_du_an: null,
          selected_du_an_kh: null
      }
    },
    computed:{
        ...mapGetters([ "GET_SETTING", "setting_modal", "total_time_cho_tham_dinh", "INFO_USER", "LIST_CONG_VIEC_CTD", "LIST_USER", "GROUP_LCV", "LIST_DUAN_KH", "LIST_DUAN"])
    },
    watch:
    {
      LIST_CONG_VIEC_CTD(CV)
      {
        this.list_cong_viec = CV
      },
      selected_user(user)
      {
        if(user != null)
        {
          this.filter.nguoi_nhan_viec = user.id_nd
        }
      },
      selected_loai_cv(lcv)
      {
        if(lcv != null)
        {
          this.filter.id_loai_cv = lcv.id_loai_cv
        }
        else
        {
          this.filter.id_loai_cv = 0
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
      }
    },
    methods:
    {
      FilterCongViecDuAn()
      {
          this.$store.dispatch('FilterCongViecTD',this.filter)
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
      tham_dinh()
      {
        var array_list = []
        var array_tgian = []
        this.checkedRows.forEach((element) => {
          array_list.push(element.id_cv_da)
          array_tgian.push(element.tham_dinh_tgian)
        })
        this.$store.dispatch("createThamDinhListCV",{
          array_list: array_list,
          array_tgian: array_tgian
        }).then(() => {

             this.$buefy.notification.open({
                  duration: 1500,
                  message: 'Thẩm định công việc thành công!' ,
                  position: 'is-bottom-left',
                  type: 'is-success',
                  hasIcon: true
              })
            this.$store.dispatch("fetchCongViecTD",{
                time: this.time,
                P_TRANG_THAI_TD: 1
            })
             this.$store.dispatch("fetchCongViecTD",{
                time: this.time,
                P_TRANG_THAI_TD: 2
            })
        })
        .catch(() => {
           this.$buefy.notification.open({
                  duration: 1500,
                  message: 'Lỗi server!' ,
                  position: 'is-bottom-left',
                  type: 'is-danger',
                  hasIcon: true
              })
        })
      }
    },
    created()
    {
        this.$store.dispatch('fetchCongViecPhanCong',this.filter)
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

</style> 