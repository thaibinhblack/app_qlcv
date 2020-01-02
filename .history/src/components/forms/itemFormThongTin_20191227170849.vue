<template>
<div class="form-group col-sm-12 col-md-4 row" >
             <div class="col-sm-12 col-md-6">
                <b-field>
                    <b-input v-model="tt.ten_thongtin" placeholder="Tên thông tin"></b-input>
                </b-field>
            </div>
            <div class="col-sm-12 col-md-8">
                <b-field>
                    <b-input v-model="tt.noi_dung_thongtin" placeholder="Nội dung thông tin"></b-input>
                </b-field>
            </div>
        </div>
</template>

<script>
export default {
    props: ["tt"]
}
</script>