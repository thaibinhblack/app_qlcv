<template>
        <section>
             <b-table
                :data="data"
                :columns="columns">
            </b-table>
        </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(["getCongViec"])
    }
}
</script>