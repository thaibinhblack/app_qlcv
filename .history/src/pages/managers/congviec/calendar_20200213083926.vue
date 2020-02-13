<template>
    <div>
          <vue-cal  :events="events" />  
    </div>
</template>

<script>
import VueCal from 'vue-cal'
export default {
    components:
    {
         'vue-cal': VueCal
    },
    data()
    {
        return {

        }
    }
}
</script>