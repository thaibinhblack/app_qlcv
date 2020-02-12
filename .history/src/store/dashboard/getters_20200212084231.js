export default {
    series_pie_lcv: state => {
        var result = []
        state.pies.forEach((pie) => {
            // console.log('line',line)
            result.push(
                {
                    dataField: pie.ten_loai_cv,
                    symbolType: 'square',
                    labels: {
                        visible: true,
                        backgroundColor: pie.color_status,
                        backgroundOpacity: 0.2,
                        borderColor: '#7FC4EF',
                        borderOpacity: 0.7,
                        padding: { left: 5, right: 5, top: 0, bottom: 0 }
                    }
                }
            )
        })
        return result;
    },
    data_pie_Lcv: state => {
        return state.lines
    }
}