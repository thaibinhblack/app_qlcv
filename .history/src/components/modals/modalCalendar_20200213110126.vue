<template>
<form style="width:100%;padding:15px;">

    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Tên lịch công tác <span class="color-red">(*)</span></label>
        <div class="col-sm-12">
            <b-field>
                    <b-input type="text" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Thời gian công tác <span class="color-red">(*)</span></label>
         <div class="col-sm-3">
            <input type="number" min="1" max="24" class="tag-time" style="margin-right:5px;"> giờ :
            <input type="number" min="0" max="59" class="tag-time" style="margin-left: 5px;"> phút
        </div>
        <div class="col-sm-3">
            <b-field>
                    <b-input type="date" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
         <div class="col-sm-3">
            <input type="number" min="1" max="24" class="tag-time" style="margin-right:5px;"> giờ :
            <input type="number" min="0" max="59" class="tag-time" style="margin-left: 5px;"> phút
        </div>
        <div class="col-sm-3">
            <b-field>
                    <b-input type="date" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Nội dung công tác <span class="color-red">(*)</span></label>
        <div class="col-sm-12">
            <vue-editor v-model="cong_tac.noi_dung" />
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
                        <img class="avatar" :src="$store.state.config.PUBLIC_URL + user.avatar" alt="">
                    </div>
                    <p>{{user.display_name}}</p>
                </li>
            </ul>
        </div>

    </div>
</form>
</template>
<script>
import Multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
export default {
    components:
    {
        Multiselect
    },
    data()
    {
        return {
            cong_tac: {

            },
            selected_user_cong_tac: []
        }
    },
    computed:
    {
        ...mapGetters(["LIST_USER"])
    },
    created()
    {
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
.avatar {width: 50px;height: 50px;border-radius: 50%;background: #e2e2e2;}
.list-user {width: 100%;}
.list-user>li {display: inline-block;margin: 5px 10px;text-align: center}
</style>

