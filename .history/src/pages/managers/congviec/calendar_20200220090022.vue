<template>
    <div class="row">
        <div class="col-sm-12">
            <p class="background">QUẢN LÍ LỊCH CÔNG TÁC</p>
            <b-button class="btn btn-add" @click="isModalCalendar = !isModalCalendar">Thêm mới</b-button>
            {{GET_LICH_CONG_TAC}}
        </div>
        <div class="col-sm-12">
            <vue-cal  
          :events="GET_LICH_CONG_TAC"
           hide-weekends
            events-count-on-year-view
          :on-event-click="onEventClick" />
        </div>  
        <b-modal :active.sync="isModalCalendar"  :width="'80%'" :can-cancel="false"  @on-cancel="close()">
            <p class="background" >{{Object.entries(data_event).length > 0 ? data_event.title : 'THÊM MỚI LỊCH CÔNG TÁC'}} <b-button icon-left="close" class="btn btn-close btn-form" @click="close()" ></b-button></p>  
            <modal-calendar :cong_tac_edit="cong_tac" />
        </b-modal>
    </div>
</template>

<script>
import VueCal from 'vue-cal'
import { mapGetters } from 'vuex'
export default {
    components:
    {
         'vue-cal': VueCal,
         'modal-calendar': () => import('@/components/modals/modalCalendar.vue')
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
            isModalCalendar: false,
            data_event: {},
            cong_tac: []
        }
    },
    computed:
    {
      ...mapGetters(["GET_LICH_CONG_TAC"])
    },
    methods:
    {
        onEventClick (event, e) {
            // this.selectedEvent = event
            this.data_event = event
            this.isModalCalendar = true
            console.log(event)
            // Prevent navigating to narrower view (default vue-cal behavior).
            e.stopPropagation()
        },
        close()
        {
            this.isModalCalendar = false
        }
    },
    created()
    {
      this.$store.dispatch("fetch_LICH_CONG_TAC")
    }
}
</script>

<style>
.health {padding: 15px;}
.vuecal__event {cursor: pointer;}

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}
/* Dash indicator */
.vuecal__cell-events-count {
  width: 18px;
  height: 2px;
  color: transparent;
}
.vuecal__event.health.vuecal__event--focus,.vuecal__event.health{

  min-height: 25px;
  height: 85px !important;
  font-size: 12px;;
}
.vuecal--day-view .vuecal__event.health:nth-child(2) {left: 21% !important;}
.vuecal--day-view .vuecal__event.health:nth-child(3) {left: 42% !important;}
.vuecal--day-view .vuecal__event.health:nth-child(4) {left: 63% !important;}
.vuecal--day-view .vuecal__event.health:nth-child(4) {left: 84% !important;}

.vuecal--day-view .vuecal__event.health 
{
    display: inline-block;
    float: left;
    max-width: 20% !important;
}
/* Dot indicator */
.vuecal__cell-events-count {
  width: 4px;
  min-width: 0;
  height: 4px;
  padding: 0;
  color: transparent;
}

/* Cell background indicator */
.vuecal__cell--has-events {background-color: #fffacd;}
.vuecal__cell-events-count {display: none;}
.btn-close {background: transparent !important;color: #fff;float: right;border: none}
.btn-add {margin: 15px 0;}
</style>