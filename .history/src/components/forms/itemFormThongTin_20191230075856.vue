<template>
<div class="form-group col-sm-12 col-md-6 row" >
             <div class="col-sm-12 col-md-4">
                <b-field>
                    <b-input @click.native="edit_item()" :disabled="disabled" v-model="tt.ten_thongtin" placeholder="Tên thông tin"></b-input>
                </b-field>
            </div>
            <div class="col-sm-12 col-md-8">
                <b-field>
                    <b-input @click.native="edit_item()" :disabled="disabled" v-model="tt.noi_dung_thongtin" placeholder="Nội dung thông tin"></b-input>
                </b-field>
            </div>
        </div>
</template>

<script>
export default {
    props: ["tt", "tt_edit", "update"],
    data()
    {
        return {
            disabled: true
        }
    },
    watch:
    {
        update(val)
        {
            this.disabled = val
        }
    },
    methods:
    {
        edit_item()
        {
            // alert('false')
            this.disabled = false
            this.$emit('edit_item',this.tt)
        }
    }
}
</script>