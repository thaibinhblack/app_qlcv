export default {
    series_line_lcv: state => {
        var result = []
        state.lines.forEach((line) => {
        
            result.push(
                {
                    dataField: line.TEN_LOAI_CV,
                    symbolType: 'square',
                    labels: {
                        visible: true,
                        backgroundColor: line.COLOR_STATUS,
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