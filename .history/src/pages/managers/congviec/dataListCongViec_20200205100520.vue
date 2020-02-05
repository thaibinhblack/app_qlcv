<template>
        <section>
             <b-table
                :data="getCongViec">
                 <template slot-scope="props">
                       <b-table-column label="Tên công việc" :width="220">
                        {{props.row.ten_cv}}
                    </b-table-column>
                      <b-table-column label="Nội dung" centered>
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
                    <b-table-column>
                        <b-button icon-left="pen"  @click="$store.dispatch('openTask',props.row.id_cv_da)"></b-button>
                        <b-button icon-left="update"  @click="$store.dispatch('openGiaHan',element.id_cv_da)"></b-button>
                    </b-table-column>
                 </template>
            </b-table>
        </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

    computed:{
        ...mapGetters(["getCongViec"])
    }
}
</script>