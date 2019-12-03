<template>
 <b-modal :active.sync="modal_task">
    <p class="image is-4by3">
        <img src="/static/img/placeholder-1280x960.png">
    </p>
</b-modal>
</template>

<script>
export default {
    props: ["modal_task"]
}
</script>