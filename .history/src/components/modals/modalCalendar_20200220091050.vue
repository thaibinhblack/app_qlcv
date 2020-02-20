<template>
<form style="width:100%;padding:15px;" @submit.prevent="submit_lich_cong_tac()">
    <!-- {{cong_tac_edit}} -->
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Tên lịch công tác <span class="color-red">(*)</span></label>
        <div class="col-sm-12">
            <b-field>
                    <b-input  v-model="cong_tac.ten_lich_ct" type="text" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Thời gian công tác <span class="color-red">(*)</span></label>
         <div class="col-sm-3">
            <input   v-model="cong_tac.time_start.HH" type="number" min="1" max="24" class="tag-time" style="margin-right:5px;"> giờ :
            <input v-model="cong_tac.time_start.mm" type="number" min="0" max="59" class="tag-time" style="margin-left: 5px;"> phút
        </div>
        <div class="col-sm-3">
            <b-field>
                    <b-input v-model="cong_tac.date_start" type="date" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
         <div class="col-sm-3">
            <input v-model="cong_tac.time_end.HH" type="number" min="1" max="24" class="tag-time" style="margin-right:5px;"> giờ :
            <input v-model="cong_tac.time_end.mm" type="number" min="0" max="59" class="tag-time" style="margin-left: 5px;"> phút
        </div>
        <div class="col-sm-3">
            <b-field>
                    <b-input v-model="cong_tac.date_end" type="date" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Nội dung công tác <span class="color-red">(*)</span></label>
        <div class="col-sm-12">
            <vue-editor v-model="cong_tac.noi_dung_lich_ct" />
        </div>
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Người đi công tác <span class="color-red">(*)</span></label>
        <div class="col-sm-12">
             <multiselect v-model="selected_user_cong_tac" 
                :options="LIST_USER" 
                label="display_name" 
                track-by="id_nd" placeholder="Danh sách dự án"
                :multiple="true"  :show-labels="true" ></multiselect>
        </div>
        <div class="col-sm-12">
            <ul class="list-user">
                <li v-for="(user,index) in selected_user_cong_tac" :key="index">
                    <div class="avatar">
                            <img v-if="user.avatar != null" :src="$store.state.config.PUBLIC_URL + user.avatar" style="width:50px;height:50px;border-radius:50%;">
                    </div>
                    <p>{{user.display_name}}</p>
                </li>
            </ul>
        </div>
        <div class="col-sm-12" style="margin-top: 50px;">
            <!-- {{Object.entries(this.getTaskEdit).length === 0}} -->
            <button type="submit" class="btn btn-primary btn-form" style="margin-left: 0;">Lưu lại</button>
            <button type="submit" class="btn btn-warning btn-form">Cập nhật</button>
            <button type="button" class="btn btn-success btn-form">Clear</button>
            <button type="button" class="btn btn-danger btn-form" >Close</button>  
        </div>
    </div>
</form>
</template>
<script>
import Multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
export default {
    props:["cong_tac_edit"],
    components:
    {
        Multiselect
    },
    data()
    {
        return {
            cong_tac: {
                ten_lich_ct: "",
                time_start: {
                    HH: "07",
                    mm: "00"
                },
                date_start: new Date().toISOString().substring(0,10),
                time_end:{
                    HH: "07",
                    mm: "00"
                },
                date_end: new Date().toISOString().substring(0,10),
                noi_dung_lich_ct: ""

            },
            selected_user_cong_tac: []
        }
    },
    computed:
    {
        ...mapGetters(["LIST_USER"])
    },
    watch:
    {
        cong_tac_edit(val)
        {
            // console.log(val)
            this.cong_tac = val
        }
    },
    methods:
    {
        submit_lich_cong_tac()
        {   var app = this;
            this.$store.dispatch("create_LICH_CONG_TAC",this.cong_tac).then((response) => {
                
                 if(response.success == true)
                 {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: response.message,
                        position: 'is-bottom-left',
                        type: 'is-success',
                        hasIcon: true
                    })
                    this.cong_tac = {
                        ten_lich_ct: "",
                        time_start: {
                            HH: "07",
                            mm: "00"
                        },
                        date_start: new Date().toISOString().substring(0,10),
                        time_end:{
                            HH: "07",
                            mm: "00"
                        },
                        date_end: new Date().toISOString().substring(0,10),
                        noi_dung_lich_ct: ""

                    }
                    this.selected_user_cong_tac = []
                 }
                 else
                 {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: response.message,
                        position: 'is-bottom-left',
                        type: 'is-warning',
                        hasIcon: true
                    })
                 }
             }).catch(() => {
                app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Lỗi server!',
                    position: 'is-bottom-left',
                    type: 'is-danger',
                    hasIcon: true
                })
             })
        }
    },
    created()
    {   
        this.cong_tac = this.cong_tac_edit
        this.cong_tac.time_start = new Date(this.cong_tac.time_start).toISOString().substr(0,10);
        this.$store.dispatch('fetchUsers')
    }
}
</script>
<style scoped>

.tag-time {    padding: 3px;
    line-height: unsetpx;
    line-height: 36px;
    height: 36px;
    width: 45px;
    text-align: center;}
.avatar {width: 50px;height: 50px;border-radius: 50%;background: #e2e2e2;margin: auto}
.list-user {width: 100%;}
.list-user>li {display: inline-block;margin: 5px 10px;text-align: center}
</style>

