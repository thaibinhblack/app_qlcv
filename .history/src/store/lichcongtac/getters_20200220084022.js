export default {
    GET_LICH_CONG_TAC: state =>
    {
        var events = []
        state.LIST_CONG_TAC.forEach((element) => {
            events.push({
                id_lich_ct: element.id_lich_ct,
                start: element.date_start.substr(0,10) + ' ' + element.time_start,
                end: element.date_end.substr(0,10) + ' ' + element.time_end,
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