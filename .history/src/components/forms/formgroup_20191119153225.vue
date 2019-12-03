<template>
    <form class="form-rule" >
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Trung Tâm</label>
            <div class="col-sm-8">
                <b-field>
                    <b-select v-model="group.id_tt" required placeholder="Danh sách trung tâm">
                       
                        <option v-for="(tt,index) in trung_tams" :key="index" :value="tt.id_tt"> {{tt.ten_tt}}</option>
                    </b-select>
                </b-field>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Tên phòng</label>
            <div class="col-sm-8">
            <b-input v-model="group.ten_nhom" type="text"  placeholder="Tên phòng"></b-input>
            </div>
        </div>
         <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Mô tả</label>
            <div class="col-sm-8">
            <b-input type="textarea" minlength="10"
                maxlength="255" placeholder="Mô tả phòng ban"  v-model="group.mo_ta_nhom"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Ghi chú</label>
            <div class="col-sm-8">
            <b-input v-model="group.ghi_chu_nhom" type="text" height="180px"  placeholder="Ghi chú"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
            <div class="col-sm-8">
                <b-field>
                    <b-select v-model="group.trang_thai_nhom" placeholder="Danh sách phòng ban">
                       
                        <option value="1" selected>Đang hoạt động</option>
                        <option value="2">Đang bảo trì</option>
                        <option value="3">Ngừng hoạt động</option>
                    </b-select>
                </b-field>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-8">
            <button type="button" :disabled="updatePhongBan" class="btn btn-primary btn-form" @click="addGroup()">Thêm</button>
            <button type="button" :disabled="!updatePhongBan" class="btn btn-warning btn-form" @click="update_group()">Cập nhật</button>
            <button type="submit" :disabled="!updatePhongBan" class="btn btn-danger btn-form">Xóa</button>
            <button type="button" v-if="updatePhongBan == true" class="btn btn-warning btn-form" @click="$emit('rollback',false)">Clear</button>
            </div>
            
        </div>
    </form>
</template>

<script>
export default {
    props: ["trung_tams", "phong_ban_edit", "updatePhongBan"],
    data()
    {
        return {
            group: {
                TRANG_THAI_NHOM: 1
            },
        }
    },
    watch: {
        phong_ban_edit(newVal)
        {
            this.updatePhongBan = false
            this.group = newVal
        }
    },
    methods: {
       
        addGroup()
        {
            const group = new FormData()
            group.append("ID_TT",this.group.id_tt)
            group.append("TEN_NHOM",this.group.ten_nhom)
            group.append("MO_TA_NHOM",this.group.mo_ta_nhom)
            group.append("GHI_CHU_NHOM",this.group.ghi_chu_nhom)
            group.append("TRANG_THAI_NHOM",this.group.trang_thai_nhom)
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'group_user',group).then((response) => {
                app.group = {
                    TINH_TRANG_NHOM: 1
                }
                app.$buefy.notification.open({
                    duration: 1500,
                    message: `Thêm phòng ban mới thành công`,
                    position: 'is-bottom-right',
                    type: 'is-success',
                    hasIcon: true
                })
                app.$emit('create_pb',true)
            }).catch(() => {
                 app.$buefy.notification.open({
                    duration: 1500,
                    message: `Thêm phòng ban mới thất bại`,
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true
                })
            })
        },
        update_group()
        {
            const group = new FormData()
            group.append("ID_TT",this.group.id_tt)
            group.append("TEN_NHOM",this.group.ten_nhom)
            group.append("MO_TA_NHOM",this.group.mo_ta_nhom)
            group.append("GHI_CHU_NHOM",this.group.ghi_chu_nhom)
            group.append("TRANG_THAI_NHOM",this.group.trang_thai_nhom)
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'group_user/'+this.group.id_nhom+'?api_token='+this.$session.get('token'),group).then((response) => {
                app.group = {
                    TINH_TRANG_NHOM: 1
                }
                app.$buefy.notification.open({
                    duration: 1500,
                    message: `Thêm phòng ban mới thành công`,
                    position: 'is-bottom-right',
                    type: 'is-success',
                    hasIcon: true
                })
                app.$emit('create_pb',true)
            }).catch(() => {
                 app.$buefy.notification.open({
                    duration: 1500,
                    message: `Thêm phòng ban mới thất bại`,
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true
                })
            })
        }
    },
}
</script>
<style scoped>
.btn-form {margin-left: 10px;color: #fff;}
.form-rule {padding: 15px;}
</style>