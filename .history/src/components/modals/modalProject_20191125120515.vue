<template>
<form>
     <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
        <div class="col-sm-8">
        <b-input type="text" v-model="project.ten_du_an" required placeholder="Tên dự án" ></b-input>
        </div>
    </div>
</form>
</template>
<script>
export default {
    data(){
        return {
            project: {}
        }
    }
}
</script>