<template>
<form style="padding: 15px;">
     <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Loại dự án</label>
        <div class="col-sm-9">
            <b-field>
                <b-select  required>
                    <option value="0"> --Tất cả loại dự án--</option>
                    <option v-for="(lda,index) in loai_du_an" :key="index" :value="lda.id_loai_du_an"> {{lda.ten_loai_du_an}}</option>
                </b-select>
            </b-field>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Tên dự án</label>
        <div class="col-sm-9">
        <b-input type="text"  placeholder="Tên dự án" v-model="du_an.ten_du_an"></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Thanh viên tham gia</label>
        <div class="col-sm-9">
            <multiselect :options="users" label="username_nd" track-by="id_nd" :multiple="true" :taggable="true" ></multiselect>
        </div>
    </div>
    <!-- <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Khách hàng</label>
        <div class="col-sm-9">
            <b-input type="text" v-model="du_an.ten_kh"  placeholder="Nhập khách hàng"></b-input>
            <div class="list-kh card" :class="{active: search}">
                <ul>
                    <li v-for="(kh,index) in khach_hang" :key="index">
                      <div class="field">
                            <b-radio v-model="selected_kh"
                                :value="kh.id_khach_hang"
                                :native-value="kh.id_khach_hang">
                                {{kh.ten_kh}}
                            </b-radio>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div> -->
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Mô tả</label>
        <div class="col-sm-9">
            <b-input type="textarea" v-model="du_an.mo_ta_du_an" minlength=""
            maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Ghi chú</label>
        <div class="col-sm-9">
            <b-input type="text" v-model="du_an.ghi_chu_du_an"  placeholder="Ghi chú"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Trạng thái</label>
        <div class="col-sm-9">
            <b-field>
                <b-select v-model="du_an.trang_thai_du_an">
                    <option value="1" selected>Đang hoạt động</option>
                    <option value="2">Đang bảo trì</option>
                    <option value="3">Ngừng hoạt động</option>
                </b-select>
            </b-field>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-9">
           
            <button type="submit" class="btn btn-primary btn-form" >Cập nhật</button>
            <!-- <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button> -->
        </div>
    </div>
</form>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
    props: ["selected_project", "du_an_selected"],
    components: 
    {
        Multiselect
    },
    data(){
        return {
            du_an: this.du_an_selected,
            users: [],
            loai_du_an: []
        }
    },
    methods: {
        api_users()
        {
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                this.users = response.data
                console.log(response.data)
            })
        },
        api_loai_du_an()
        {
            this.axios.get(this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$session.get('token')).then((response) => {
                this.loai_du_an  = response.data
            })
        },
    },
    created()
    {
        this.api_users()
        this.api_loai_du_an()
    }
}
</script>