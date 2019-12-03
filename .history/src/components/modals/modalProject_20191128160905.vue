<template>
<form style="padding: 15px;" @submit.prevent="api_update_du_an()">
    <b-tabs>
        <b-tab-item label="Thông tin dự án">
             <div class="form-group row">
                <label for="inputPassword3" class="col-sm-3 col-form-label" >Loại dự án</label>
                <div class="col-sm-9">
                    <b-field>
                        <b-select v-model="du_an_kh.id_du_an"  required>
                            <option value="0"> --Tất cả dự án--</option>
                            <option v-for="(da,index) in du_an" :key="index" :value="da.id_du_an"> {{da.ten_du_an}}</option>
                        </b-select>
                    </b-field>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-3 col-form-label" >Tên dự án</label>
                <div class="col-sm-9">
                <b-input type="text"  placeholder="Tên dự án" v-model="du_an_kh.ten_du_an_kh"></b-input>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-3 col-form-label" >Thanh viên tham gia</label>
                <div class="col-sm-9">
                
                    <multiselect v-model="selected_users" :options="users" label="username_nd" track-by="id_nd" :multiple="true" :taggable="true" ></multiselect>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-3 col-form-label" >Khách hàng</label>
                <div class="col-sm-9">
                    <multiselect
                        placeholder="Khách hàng"
                        v-model="selected_kh" :options="khach_hang"  label="ten_kh" trackBy="id_khach_hang"></multiselect>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-3 col-form-label" >Mô tả</label>
                <div class="col-sm-9">
                    <b-input type="textarea" v-model="du_an_kh.mo_ta_du_an" minlength=""
                    maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-3 col-form-label" >Ghi chú</label>
                <div class="col-sm-9">
                    <b-input type="text" v-model="du_an_kh.ghi_chu_du_an"  placeholder="Ghi chú"  ></b-input>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-3 col-form-label" >Trạng thái</label>
                <div class="col-sm-9">
                    <b-field>
                        <b-select v-model="du_an_kh.trang_thai_du_an">
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
                    <b-button icon-left="close" class="btn btn-close btn-form" @click="close()">Close</b-button>
                    <!-- <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button> -->
                </div>
            </div>
        </b-tab-item>
        <b-tab-item label="Phân quyền dự án">
            <div class="">
                <div class="row">
                    <div class="col-sm-4 col-md-3">
                        <p class="background">DS thành viên</p>
                        <ul class="list-nhanvien-thamgia">
                            <li v-for="(nv,index) in nhanvien_thamgia" :key="index">
                                <b-radio>{{nv.username_nd}}</b-radio>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </b-tab-item>
    </b-tabs>
</form>
</template>
<script>
import Multiselect from 'vue-multiselect'
export default {
    props: ["selected_project", "du_an_selected", "nhanvien_thamgia"],
    components: 
    {
        Multiselect
    },
    data(){
        return {
            du_an_kh: {},
            users: [],
            du_an: [],
            khach_hang: [],
            selected_kh: {},
            selected_users: [],
            array_id_nd: []
        }
    },
    watch:
    {
        selected_kh(newVal)
        {
            this.du_an.id_khach_hang = newVal.id_khach_hang
        },
        selected_users(newVal)
        {
            const array = []
            newVal.forEach(element => {
                array.push(element.id_nd)
            });
            this.array_id_nd = array
        },
        getUser(newVal)
        {
            console.log(newV)
        }
    },
    methods: {
        api_users()
        {
            this.axios.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                this.users = response.data
                this.nhanvien_thamgia.forEach((thanh_vien) => {
                    response.data.forEach((user) => {
                        if(thanh_vien.id_nd == user.id_nd)
                        {
                            this.selected_users.push(user)
                        }
                    })
                })
                console.log(response.data)
            })
        },
        api_du_an()
        {
            this.axios.get(this.$store.state.config.API_URL + 'du-an?api_token='+this.$session.get('token')).then((response) => {
                this.du_an  = response.data
            })
        },
        api_du_an_kh(id)
        {
            this.axios.get(this.$store.state.config.API_URL + 'du-an-kh/'+id+'?api_token='+this.$session.get('token')).then((response) => {
                this.du_an_kh = response.data[0]
                console.log(response.data)
            })
        },
        api_khach_hang()
        {
            this.axios.get(this.$store.state.config.API_URL + 'customers?api_token='+this.$session.get('token')).then((response) => {{
                this.khach_hang = response.data.results
                this.selected_kh = response.data.results.filter((value,index,array) => {
                    return array[index].id_khach_hang == this.du_an_selected.id_khach_hang
                })[0]
            }})
        },
        close()
        {
            this.$emit('close',false)
        },
        api_update_du_an()
        {
            const form_nhanvien = new FormData();
            const array_nhanvien = []
            this.selected_users.forEach((user) => {
                array_nhanvien.push(user.id_nd)
            })
            console.log(array_nhanvien)
            console.log(this.array_id_nd)
        },
    
    },
    created()
    {
        // console.log(this.du_an_selected)
        this.api_khach_hang()
        this.api_users()
        this.api_du_an()
        this.api_du_an_kh(this.selected_project)
        // this.api_get_token()
    }
}
</script>

<style scoped>
.list-nhanvien-thamgia {padding: 15px 0;}
.list-nhanvien-thamgia>li {margin: 15px 0;}
</style>