<template>
        <section>
             <b-table
                :data="getCongViec"
                :columns="columns">
                 <template slot-scope="props">
                       <b-table-column label="Tên công việc">
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
                        {{props.row.tien_do}}
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
            columns: [
                    {
                        field: 'ten_cv',
                        label: 'Tên công việc',
                        width: '240',
                        searchable: true,
                    },
                    {
                        field: 'noi_dung_cv',
                        label: 'Nội dung',
                        searchable: true,
                    },
                    {
                        field: 'ngay_tiep_nhan',
                        label: 'Ngày tiếp nhận',
                        centered: true
                    },
                    {
                        field: 'ngay_giao_viec',
                        label: 'Ngày giao việc',
                        centered: true
                    },
                    {
                        field: 'ngay_hoan_thanh',
                        label: 'Ngày hoàn thành',
                    },
                    {
                        field: 'ngay_cam_ket',
                        label: 'Ngày cam kết',
                    },
                    {
                        field: 'gio_thuc_hien',
                        label: 'Giờ thực hiện',
                    },
                    {
                        field: 'tien_do',
                        label: 'Tiến độ',
                        width: 100,
                        searchable: true,
                    },
                ]
        }
    },
    computed:{
        ...mapGetters(["getCongViec"])
    }
}
</script>