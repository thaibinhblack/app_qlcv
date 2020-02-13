<template>
        <section class="section-data" > 
          <!-- {{setting_modal}}  -->
            <div class="header header-datalist">
                {{checkedRows}}
                <ul class="list-action-data">
                    <li><b-button class="btn btn-add" @click='$store.dispatch("updateModalEdit",true)' >Thêm mới</b-button></li>
                    <li>
                      <b-field>
                        <b-select v-model="perPage">
                          <option :value="10">10</option>
                          <option :value="20">20</option>
                          <option :value="50">50</option>
                          <option :value="100">100</option>
                        </b-select>
                      </b-field>
                    </li>
                    <li class="filter-duan-kh">
                      <b-field style="width: 200px;">
                          <b-select v-model="filter.id_du_an" expanded @input="FilterCongViecDuAn()">  
                              <option value="0"> --Tất cả  dự án--</option>
                              
                              <option v-for="(da,index) in Object.entries(setting_modal.selected_du_an_setting).length > 0 ?  setting_modal.selected_du_an_setting : LIST_DUAN" :key="index" :value="da.id_du_an"> {{da.ten_du_an}}</option>
                          </b-select>
                      </b-field>
                    </li>
                    <li>
                      <b-field>
                          <b-select v-model="filter.id_du_an_kh" expanded :disabled="LIST_DUAN_KH.length == 0" @input="$store.dispatch('FilterCongViec',filter)">
                              <option value="0"> --Tất cả  dự án khách hàng--</option>
                              <option v-for="(da,index) in LIST_DUAN_KH" :key="index" :value="da.id_du_an_kh"> {{da.ten_du_an_kh}}</option>
                          </b-select>
                      </b-field>
                    </li>
                    <li>
                      <b-field>
                        <b-select v-model="filter_trang_thai">
                          <option value="0">Trạng Thái</option>
                          <option value="1">Chưa thực hiện</option>
                          <option value="2">Đang thực hiện</option>
                          <option value="3">Hoàn thành</option>
                          <option value="4">Gia hạn</option>
                        </b-select>
                      </b-field>
                    </li>
                   
                    <li class="right"><b-button icon-left="settings" @click="isModalSetting = true"></b-button></li>
                    <li > <button-export-excel /></li>
                </ul>
                <div class="col-sm-12" style="margin-top: 15px;">
                  <span>Tổng số giờ làm việc: <strong>{{total_time_cong_viec}} giờ</strong> </span>
                </div>
            </div>

            <b-modal :active.sync="isModalSetting" :width="'100%'" full-screen>
                <modal-setting />
            </b-modal>

             <b-table
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :is-row-checkable="(row) => row.trang_thai != 3"
                checkable
                :checked-rows.sync="checkedRows"
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :data="list_cong_viec">
                 <template slot-scope="props">
                   
                    <b-table-column  v-for="(setting,index) in GET_SETTING" :key="index" :label="setting.label" >
                      <!-- {{setting.column}} -->
                        {{setting.column == 'trang_thai' ?
                          (props.row[setting.column] == 1 ? 'Chưa thực hiện' : props.row[setting.column] == 2 ? 'Đang thực hiện' : 'Hoàn thành') :
                          (setting.column == 'gio_thuc_hien' ? 1 > props.row[setting.column]  ? '0'+props.row[setting.column] : props.row[setting.column] 
                          : props.row[setting.column]) }}
                        <!-- {{props.row[setting.column]}} -->
                    </b-table-column>
                     <b-table-column width="120">
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
          checkedRows: []
      }
    },
    computed:{
        ...mapGetters(["getCongViec", "GET_SETTING", "LIST_DUAN", "LIST_DUAN_KH", "setting_modal", "total_time_cong_viec"])
    },
    watch:
    {
      getCongViec(val)
      {
        // this.filter = {
        //     id_du_an: 0,
        //     id_du_an_kh: 0,
        //     id_loai_cv: 0,
        //     nguoi_nhan_viec: 0,
        //     time_start: this.time.time_start,
        //     time_end: this.time.time_end
        // }
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
    },
    created()
    {
      this.$store.dispatch("SELECT_SETTING")
      this.$store.dispatch('SELECT_SETTING_MODAL_CV')
    }
}
</script>
<style scoped>
.section-data {font-size: 12px;}
.btn-action {float: left; margin-left: 5px}
.avatar {width: 50px;height: 50px;border-radius: 50%;background:#e2e2e2;}
.avatar img {width: 100%;border-radius: 50%;height: 50px;}
.header-datalist {padding: 10px;background: #fff;border-radius: 5px; margin-bottom: 5px;}
.section-data {padding: 5px; border-radius: 5px;background: #fff;}
.btn-add {border: 1px solid #e2e2e2;}
.btn-add:hover {background: #209cee;color: #fff;}
.list-action-data {width: 100%;}
.list-action-data>li {display: inline-block; margin: 0 5px;}
.list-action-data>li:last-child, li.right {float: right}
.filter-duan-kh>.filed {width: 200px !important;;}
</style> 