<template>
    <div>
        <vue-cal  
          :events="events"
          :on-event-click="onEventClick" />  
        <b-modal :active.sync="isModalCalendar"  full-screen :can-cancel="false"  @on-cancel="close()">
        </b-modal>
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
                start: '2020-02-13 10:30',
                end: '2020-02-13 11:30',
                // You can also define event dates with Javascript Date objects:
                // startDate: new Date(2018, 11 - 1, 16, 10, 30),
                // endDate: new Date(2018, 11 - 1, 16, 11, 30),
                title: 'Doctor appointment',
                content: '<i class="v-icon material-icons">local_hospital</i>',
                class: 'health'
                },
            ],
            isModalCalendar: false
        }
    },
    methods:
    {
        onEventClick (event, e) {
            // this.selectedEvent = event
            this.isModalCalendar = true

            // Prevent navigating to narrower view (default vue-cal behavior).
            e.stopPropagation()
        }
    }
}
</script>

<style scoped>
.health {padding: 15px;}
</style>