'use client'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef, useState } from 'react';

const LineMap = () => {
    const chartRef = useRef(null);
    const [chartOptions, setChartOptions] = useState({
        title: {
            text: 'Biểu đồ đánh giá tin tức'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
            name: 'Tích cực',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'Tiêu cực',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
            color:'red'
        }, {
            name: 'Trung tính',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }]
    });

    useEffect(() => {
        if (chartRef.current) {
            // Access the chart object and perform any additional customization if needed
            console.log(chartRef.current.chart);
        }
    }, [chartRef]);

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    );
};

export default LineMap;