<template>
        <section class="section-data" > 
          <!-- {{setting_modal}}  -->
            <div class="header header-datalist">
                <!-- {{checkedRows.length}} -->
                <ul class="list-action-data top">
                   
                    <li>
                      <b-field>
                        <b-select class="height43" v-model="perPage">
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
                        class="m200"
                        :options="LIST_DUAN" 
                        label="ten_du_an" 
                        track-by="ten_du_an" placeholder="Danh sách dự án"
                        :multiple="false"  :show-labels="false" ></multiselect>
                    </li>
                    <li>
                       <multiselect v-model="selected_du_an_kh" 
                       class="m200"
                        placeholder="Chọn dự án"
                        :options="LIST_DUAN_KH" label="ten_kh" track-by="id_du_an_kh" 
                        :multiple="true" :taggable="true"  :show-labels="false"></multiselect>
                    </li>
                    <li v-if="INFO_USER.id_rule > 0">
                        <multiselect placeholder="Chọn người nhận việc" :show-labels="false"  v-model="selected_user" :options="LIST_USER" label="display_name" track-by="id_nd" ></multiselect>

                    </li>
                    <li>
                       <multiselect :options="GROUP_LCV"
                       class="m200"
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
                      <template slot="header" slot-scope="{ column }">
                          <b-tooltip :label="column.label" dashed>
                              {{ column.label }}
                          </b-tooltip>
                          <br />
                          <input class="from-control" type="text" :style="{width: setting.width}"  v-model="search[index]" @change="search_cv(index, setting.column)" >
                          <!-- <b-input type="text" v-model="search[index]" @input="search_cv(index, setting.column)"></b-input> -->
                      </template> 
                      <!-- {{setting.column}} -->
                        {{setting.column == 'trang_thai' ?
                          (props.row[setting.column] == 1 ? 'Chưa thực hiện' : props.row[setting.column] == 2 ? 'Đang thực hiện' : 'Hoàn thành') : props.row[setting.column] }}
                        <!-- {{props.row[setting.column]}} -->
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
          selected_du_an_kh: null,
          search: []
      }
    },
    computed:{
        ...mapGetters([ "GET_SETTING", "setting_modal", "total_time_cho_tham_dinh", "INFO_USER", "LIST_CONG_VIEC_PHANCONG", "LIST_USER", "GROUP_LCV", "LIST_DUAN_KH", "LIST_DUAN"])
    },
    watch:
    {
      LIST_CONG_VIEC_PHANCONG(CV)
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
        console.log(du_an)
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
          this.$store.dispatch('fetchCongViecPhanCong',this.filter)
      },
      onSort(field, order) {
            this.sortField = field
            this.sortOrder = order
            this.loadAsyncData()
      },
      search_cv(index,column)
      {
        if(this.search[index] == '')
        {
          this.list_cong_viec = this.LIST_CONG_VIEC_PHANCONG
        }
        else
        {
           this.list_cong_viec = this.list_cong_viec.filter((el) => {
            // console.log((el.ten_cv).toLowerCase())
              // console.log(  array[index][column].indexOf(this.search[index]))
              // // console.log(  array[index][column].includes(this.search[index]))
              
              return (el[column]).toLowerCase().indexOf((this.search[index]).toLowerCase()) > -1
          })
        }
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