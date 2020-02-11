export default {
    series_line_lcv: state => {
        var result = []
        state.lines.forEach((line) => {
            // console.log('line',line)
            result.push(
                {
                    dataField: line.ten_loai_cv,
                    symbolType: 'square',
                    labels: {
                        visible: true,
                        backgroundColor: line.color_status,
                        backgroundOpacity: 0.2,
                        borderColor: '#7FC4EF',
                        borderOpacity: 0.7,
                        padding: { left: 5, right: 5, top: 0, bottom: 0 }
                    }
                }
            )
        })
        return result;
    }
}