<template>
        <section>
             <b-table
                :data="getCongViec"
                :columns="columns">
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
                        width: '120',
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
                    }
                ]
        }
    },
    computed:{
        ...mapGetters(["getCongViec"])
    }
}
</script>