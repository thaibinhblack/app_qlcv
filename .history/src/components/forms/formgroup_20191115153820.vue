<template>
    <form class="form-rule" >
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Tên phòng</label>
            <div class="col-sm-8">
            <b-input v-model="group.TEN_NHOM" type="text"  placeholder="Tên phòng"></b-input>
            </div>
        </div>
         <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Mô tả</label>
            <div class="col-sm-8">
            <b-input type="textarea" minlength="10"
                maxlength="255" placeholder="Mô tả phòng ban"  v-model="group.MO_TA_NHOM" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Ghi chú</label>
            <div class="col-sm-8">
            <b-input v-model="group.GHI_CHU_NHOM" type="text" height="180px"  placeholder="Ghi chú"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
            <div class="col-sm-8">
                <b-field>
                    <b-select v-model="group.TRANG_THAI_NHOM" placeholder="Danh sách phòng ban">
                       
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
                TRANG_THAI_NHOM: 1
            }
        }
    },
    methods: {
        addGroup()
        {
            const group = new FormData()
            group.append("TEN_NHOM",this.group.TEN_NHOM)
            group.append("MO_TA_NHOM",this.group.MO_TA_NHOM)
            group.append("GHI_CHU_NHOM",this.group.GHI_CHU_NHOM)
            group.append("TRANG_THAI_NHOM",this.group.TRANG_THAI_NHOM)
            this.axios.post(this.$store.state.config.API_URL + 'group_user',group).then((response) => {
                this.group = {
                    TINH_TRANG_NHOM: 1
                }
               console.log(response.data)
            })
        }
    }
}
</script>
<style scoped>
.btn-form {margin-left: 10px;}
.form-rule {padding: 15px;}
</style>