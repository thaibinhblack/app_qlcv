<template>
    <form class="form-rule" >
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Tên phòng</label>
            <div class="col-sm-8">
            <b-input v-model="group.NAME_GROUP" type="text"  placeholder="Tên phòng"></b-input>
            </div>
        </div>
         <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Ghi chú</label>
            <div class="col-sm-8">
            <b-input type="textarea" minlength="10"
                maxlength="255" placeholder="Mô tả phòng ban"  v-model="group.MO_TA_CN" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Ghi chú</label>
            <div class="col-sm-8">
            <b-input v-model="group.NOTE_GROUP" type="text" height="180px"  placeholder="Ghi chú"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
            <div class="col-sm-8">
                <b-field>
                    <b-select v-model="group.TINH_TRANG_NHOM" placeholder="Danh sách phòng ban">
                       
                        <option value="1" selected>Đang hoạt động</option>
                        <option value="2">Đang bảo trì</option>
                        <option value="3">Ngừng hoạt động</option>
                    </b-select>
                </b-field>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-8">
            <button type="button" class="btn btn-primary btn-form" @click="addGroup()">Thêm</button>
            <button type="submit" class="btn btn-warning btn-form">Sửa</button>
            <button type="submit" class="btn btn-danger btn-form">Xóa</button>
            </div>
            
        </div>
    </form>
</template>

<script>
export default {
    data()
    {
        return {
            group: {

            }
        }
    },
    methods: {
        addGroup()
        {
            const group = new FormData()
            group.append("CODE_GROUP",this.group.CODE_GROUP)
            group.append("NAME_GROUP",this.group.NAME_GROUP)
            group.append("NOTE_GROUP",this.group.NOTE_GROUP)
            this.axios.post(this.$store.state.config.API_URL + 'group',group).then((response) => {
                this.group = {}
                this.$emit('addgroup',true)
            })
        }
    }
}
</script>
<style scoped>
.btn-form {margin-left: 10px;}
.form-rule {padding: 15px;}
</style>