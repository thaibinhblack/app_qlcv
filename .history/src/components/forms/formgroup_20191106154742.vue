<template>
    <form class="form-rule" >
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Mã phòng</label>
            <div class="col-sm-8">
            <b-input v-model="group.CODE_GROUP" type="text" placeholder="Mã quyền"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Tên phòng</label>
            <div class="col-sm-8">
            <b-input v-model="group.NAME_GROUP" type="text"  placeholder="Tên phòng"></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Ghi chú</label>
            <div class="col-sm-8">
            <b-input v-model="group.NOTE_GROUP" type="text" height="180px"  placeholder="Ghi chú"></b-input>
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