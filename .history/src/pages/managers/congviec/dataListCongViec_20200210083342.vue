<template>
        <section class="section-data" >  
            <div class="header header-datalist">
                    <button class="btn btn-primary" @click='$store.dispatch("updateModalEdit",true)' >Thêm mới</button>
                  </div>
             <b-table
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
            
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :data="getCongViec">
                 <template slot-scope="props">
                    <b-table-column label="Tên công việc" :width="240">
                        {{props.row.ten_cv}}
                    </b-table-column>
                    <b-table-column label="Avatar" :width="150" centered>
                      <div class="avatar" style="margin:auto">
                        <!-- {{props.row.avatar}} -->
                        <img :src="$store.state.config.PUBLIC_URL + props.row.avatar" alt="">
                      </div>
                      <span>{{props.row.ten_nnv}}</span>
                    </b-table-column>
                    <b-table-column label="Nội dung" centered :width="300">
                        {{props.row.noi_dung_cv}}
                    </b-table-column>
                      <b-table-column label="Ngày tiếp nhận" centered>
                        {{ new Date(props.row.ngay_tiep_nhan).toLocaleDateString() }}
                    </b-table-column>
                      <b-table-column label="Ngày tiếp giao việc" centered>
                        {{ new Date(props.row.ngay_giao_viec).toLocaleDateString() }}
                    </b-table-column>
                      <b-table-column label="Ngày tiếp hoàn thành" centered>
                        {{ new Date(props.row.ngay_hoan_thanh).toLocaleDateString() }}
                    </b-table-column>
                      <b-table-column label="Ngày tiếp cam kết" centered>
                        {{ new Date(props.row.ngay_cam_ket).toLocaleDateString() }}
                    </b-table-column>
                    <b-table-column label="Giờ thực hiện" centered>
                        {{props.row.gio_thuc_hien}}
                    </b-table-column>
                     <b-table-column label="Tiến độ" centered>
                        {{props.row.tien_do}}%
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
    data()
    {
      return {
          isPaginated: true,
          isPaginationSimple: true,
          paginationPosition: 'bottom',
          currentPage: 1,
          perPage: 5
      }
    },
    computed:{
        ...mapGetters(["getCongViec"])
    }
}
</script>
<style scoped>
.btn-action {float: left; margin-left: 5px}
.avatar {width: 50px;height: 50px;border-radius: 50%;background:#e2e2e2;}
.avatar img {width: 100%;border-radius: 50%;height: 50px;}
.header-datalist {padding: 10px;background: #fff;border-radius: 5px; margin-bottom: 5px;}
.section-data {padding: 5px; border-radius: 5px;background: #fff;}
</style>