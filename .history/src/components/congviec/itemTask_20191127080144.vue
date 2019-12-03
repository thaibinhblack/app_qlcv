<template>
<div
    class="list-group-item"
   >
    <span>{{element.ten_cv}}</span>
    <b-button icon-left="more" class="btn-more" >
        <ul class="list-action" >
            <li @click="open_task(element.id_cv_da)">Xem thông tin công việc</li>
            <li>Gia hạn công việc</li>
        </ul>
    </b-button>

        <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value></b-progress>
    </div>
</template>