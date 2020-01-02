<template>
<form @submit.prevent="api_create_thuoctinh()" class="form-rule" style="padding: 15px;">
    <div class="row">
        <div class="form-group col-sm-12 col-md-6 row">
            <div class="col-sm-12 col-md-4">
                <b-field>
                    <b-input v-model="attribute.ten_thongtin" placeholder="Tên thông tin"></b-input>
                </b-field>
            </div>
            <div class="col-sm-12 col-md-8">
            <b-field>
                <b-input v-model="attribute.noi_dung_thongtin" placeholder="Nội dung thông tin"></b-input>
            </b-field>
            </div>
        </div>
    </div>
</form>
</template>

<script>
export default {
    data()
    {
        return {
            attribute: {
                ten_thongtin: "",
                noi_dung_thongtin: ""
            }
        }
    }
}
</script>