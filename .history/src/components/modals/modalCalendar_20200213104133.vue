<template>
<form style="width:100%;padding:15px;">

    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Tên lịch công tác <span class="color-red">(*)</span></label>
        <div class="col-sm-9">
            <b-field>
                    <b-input type="text" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
        <label for="inputPassword3" class="col-sm-3 col-form-label" >Tgian bắt đầu  công tác <span class="color-red">(*)</span></label>
         <div class="col-sm-6">
            <input type="number" min="1" max="24" class="tag-time" style="margin-right:5px;"> giờ :
            <input type="number" min="0" max="59" class="tag-time" style="margin-left: 5px;"> phút
        </div>
        <div class="col-sm-3">
            <b-field>
                    <b-input type="date" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
    </div>
</form>
</template>

