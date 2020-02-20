export default {
    GET_LICH_CONG_TAC: state =>
    {
        var events = []
        state.LIST_CONG_TAC.forEach((element) => {
            element.time_start = JSON.parse(element.time_start)
            element.time_end = JSON.parse(element.time_end)
            events.push({
                id_lich_ct: element.id_lich_ct,
                start: element.date_start.substr(0,10) + ' ' + element.time_start.HH+':'+element.time_start.mm+':00',
                end: element.date_end.substr(0,10) + ' ' +  element.time_end.HH+':'+element.time_end.mm+':00',
                // You can also define event dates with Javascript Date objects:
                // startDate: new Date(2018, 11 - 1, 16, 10, 30),
                // endDate: new Date(2018, 11 - 1, 16, 11, 30),
                title: element.ten_lich_ct,
                class: 'health'
            })
        })
        return events;
    }
}