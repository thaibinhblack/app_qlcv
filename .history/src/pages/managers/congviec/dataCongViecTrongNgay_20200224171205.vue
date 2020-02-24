<template>
        <section class="section-data" > 

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
                              {{JSON.parse(props.row['time_hoan_thanh']).HH + ':'+JSON.parse(props.row['time_hoan_thanh']).mm+':00 ,'}} {{props.row[setting.column].substr(0,10)}}
                            </span>
                            <span v-if="setting.column == 'ngay_tiep_nhan'">
                              {{props.row[setting.column].substr(0,10)}}
                            </span>
                            <span v-if="setting.column == 'ngay_giao_viec'">
                              {{JSON.parse(props.row['time_nhan_viec']).HH + ':'+JSON.parse(props.row['time_nhan_viec']).mm+':00 ,'}} {{props.row[setting.column].substr(0,10)}}
                            </span>
                            <span v-if="setting.column == 'ngay_cam_ket'">
                              {{props.row[setting.column].substr(0,10)}}
                            </span>
                        </span>
                        <span v-else>
                            {{setting.column == 'trang_thai' ?
                            (props.row[setting.column] == 1 ? 'Chưa thực hiện' : props.row[setting.column] == 2 ? 'Đang thực hiện' : 'Hoàn thành') :
                            (setting.column == 'gio_thuc_hien' ? 1 > props.row[setting.column]  ? '0'+props.row[setting.column] : props.row[setting.column] 
                            : props.row[setting.column]) }}
                        </span>
                        <!-- {{props.row[setting.column]}} -->
                    </b-table-column>
                    <!-- <b-table-column label="Thời gian thẩm định" v-if="INFO_USER.id_rule > 0"> 
                      <input v-model="props.row['tham_dinh_tgian']" type="number">
                    </b-table-column> -->
                     <b-table-column width="200">
                        <b-button class="btn-action" icon-left="pen"  @click="$store.dispatch('openTask',props.row.id_cv_da)"></b-button>
                        <b-button class="btn-action" icon-left="update"  @click="$store.dispatch('openBaoCao',props.row.id_cv_da)"></b-button>
                    </b-table-column>
                 </template>
            </b-table>
        </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    components: {
      'modal-setting': () => import('@/components/settings/modalSettingDataCV.vue'),
      'button-export-excel': () => import('./exportExcel.vue')
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
          search: []
      }
    },
    computed:{
        ...mapGetters(["getCongViec", "GET_SETTING", "LIST_DUAN", "LIST_DUAN_KH", "setting_modal", "total_time_cong_viec", "INFO_USER"])
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
      }
    },
    methods:
    {
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
      this.$store.dispatch("fetchCongViecTrongNgay")
    //   this.$store.dispatch('SELECT_SETTING_MODAL_CV')
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

</style> 