<template>
<form @submit.prevent="api_create_thuoctinh()" class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >
            <b-field>
                <b-input v-model="attribute.ten_thongtin" placeholder="Tên thông tin"></b-input>
            </b-field>
        </label>
        <div class="col-sm-8">
          <b-field>
               <b-input v-model="attribute.noi_dung_thongtin" placeholder="Nội dung thông tin"></b-input>
          </b-field>
        </div>
    </div>
</form>
</template>

<script>
export default {
    data()
    {
        return {
            v: {
                ten_thongtin: "",
                noi_dung_thongtin: ""
            }
        }
    }
}
</script>