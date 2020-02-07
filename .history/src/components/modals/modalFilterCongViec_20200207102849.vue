<template>
<div class="card" style="padding:15px;">
    <div class="row">
        <div class="col-sm-12">
                <p class="title" style="font-size:16px;text-align: center; padding: 15px 0;text-transform: uppercase;">Bộ lọc công việc</p>
        </div>
        <div class="col-sm-12 item-filter">
                <b-field>
                <b-select v-model="cannhan_selected" expanded>
                    <option value="0"> --Công việc của dự án--</option>
                    <option value="1"> --Công việc cá nhân--</option>
                    <option value="3" v-if="my_info.id_rule > 0">--Công việc chưa phân công---</option>
                </b-select>
            </b-field>
        </div>
        <div class="col-sm-12 item-filter">
            <b-field>
                <b-select v-model="filter.id_du_an" expanded @input="FilterCongViecDuAn()">  
                    <option value="0"> --Tất cả  dự án--</option>
                    
                    <option v-for="(da,index) in LIST_DUAN" :key="index" :value="da.id_du_an"> {{da.ten_du_an}}</option>
                </b-select>
            </b-field>
        </div>
        <div class="col-sm-12 item-filter">
                <b-field>
                <b-select v-model="filter.id_du_an_kh" expanded :disabled="LIST_DUAN_KH.length == 0" @input="$store.dispatch('FilterCongViec',filter)">
                    <option value="0"> --Tất cả  dự án khách hàng--</option>
                    <option v-for="(da,index) in LIST_DUAN_KH" :key="index" :value="da.id_du_an_kh"> {{da.ten_du_an_kh}}</option>
                </b-select>
            </b-field>
        </div>
        
        <div class="col-sm-12 item-filter">
            <!-- {{LIST_USER}} -->
            <b-field>
                <b-select v-model="filter.nguoi_nhan_viec" v-if="my_info.id_rule > 0" expanded>
                    <option value="0"> --Nhân viên nhận việc--</option>
                    <option v-for="(user,index) in LIST_USER" :key="index" :value="user.id_nd">{{user.display_name}}</option>
                    
                </b-select>
            </b-field>
        </div>
            <div class="col-sm-12 item-filter">
            <b-field>
                    <multiselect :options="GROUP_LCV"
                    v-model="selected_lcv"
                    :multiple="false"
                    group-values="children"
                    group-label="parent"
                    :group-select="false"
                    :show-labels="false"
                    track-by="ten_loai_cv"
                    placeholder="Loại công việc"
                    label="ten_loai_cv">
                </multiselect>
            </b-field>
        </div>
        <div class="col-sm-12 item-filter">
            <b-field>
                <b-select v-model="hinhthuc_loc" expanded>
                    <option value="0"> --Chọn hình thức lọc theo thời gian--</option>
                    <option value="1">--Lọc ngày tiếp nhận--</option>
                    <option value="2">--Lọc ngày giao việc--</option>
                    <option value="3">--Lọc ngày hoàn thành--</option>
                    <option value="4">--Lọc ngày cam kết--</option>
                    
                </b-select>
            </b-field>
        </div>
        <div class="col-sm-12 item-filter" v-if="hinhthuc_loc != 0">
            <b-field>
                <b-input type="date" v-model="time_start"></b-input>
                <b-input type="date" style="margin-left: 7px;" v-model="time_end"></b-input>
                <b-button style="margin-left:7px" @click="filter_date_cv()">Lọc</b-button>
            </b-field>  
        </div>
    </div>
</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex';
export default {
    props: ["hinhthuc_loc", "my_info", "time"],
    components:
    {
        Multiselect
    },
    data()
    {
        return {
            nhanvien_duan: 0,
            duan_selected: 0,
            cannhan_selected: 0,
            selected_project: 0,
            selected_lcv: {},
            filter: {
                id_du_an: 0,
                id_du_an_kh: 0,
                id_loai_cv: 0,
                nguoi_nhan_viec: 0,
                time_start: this.time.time_start,
                time_end: this.time.time_end
            }
        }
    },
    computed: {
        ...mapGetters(["LIST_DUAN", "LIST_DUAN_KH", "GROUP_LCV", "LIST_USER"])
    },
    watch:
    {
        selected_lcv(val)
        {
            this.filter.id_loai_cv = val.id_loai_cv
            this.FilterCongViec(this.filter)
        }
    },
    methods:
    {
        ...mapActions(["FilterCongViec"]),
        FilterCongViecDuAn()
        {
            this.filter.id_du_an_kh = 0
            this.$store.dispatch('fetchDuAnKHById',this.filter.id_du_an);
            // this.time.id_du_an = newVal;
            // this.$store.dispatch('FilterCongViecDuAn',this.time)
            this.$store.dispatch('FilterCongViec',this.filter)
        }
    }
}
</script>