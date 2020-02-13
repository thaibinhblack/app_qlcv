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
            events: [
                {
                start: '2018-11-16 10:30',
                end: '2018-11-16 11:30',
                // You can also define event dates with Javascript Date objects:
                // startDate: new Date(2018, 11 - 1, 16, 10, 30),
                // endDate: new Date(2018, 11 - 1, 16, 11, 30),
                title: 'Doctor appointment',
                content: '<i class="v-icon material-icons">local_hospital</i>',
                class: 'health'
                },
            ]
        }
    }
}
</script>