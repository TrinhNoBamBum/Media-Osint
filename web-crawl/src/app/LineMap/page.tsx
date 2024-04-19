'use client'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef, useState } from 'react';

const LineMap = ({ data }: any) => {
    const [chartData, setChartData] = useState([
        { name: "POSITIVE", data: Array(12).fill(0) },
        { name: "NEGATIVE", data: Array(12).fill(0) },
        { name: "NEUTRAL", data: Array(12).fill(0) }
    ]);

    // Update chartData whenever data changes
    useEffect(() => {
        if (data) {
            const newChartData = [
                { name: "POSITIVE", data: Array(12).fill(0) },
                { name: "NEGATIVE", data: Array(12).fill(0) },
                { name: "NEUTRAL", data: Array(12).fill(0) }
            ];

            data.forEach((item: any) => {
                const dateParts = item.date.split('-');
                const monthIndex = parseInt(dateParts[1]) - 1;
                switch (item.feeling) {
                    case "POSITIVE":
                        newChartData[0].data[monthIndex]++;
                        break;
                    case "NEGATIVE":
                        newChartData[1].data[monthIndex]++;
                        break;
                    case "NEUTRAL":
                        newChartData[2].data[monthIndex]++;
                        break;
                }
            });

            setChartData(newChartData);
        }
    }, [data]);

    const chartRef = useRef(null);

    const chartOptions = {
        title: {
            text: 'Biểu đồ đánh giá sắc thái tin tức'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: chartData
    };

    useEffect(() => {
        if (chartRef.current) {
            // Access the chart object and perform any additional customization if needed
            // console.log(chartRef.current.chart);
        }
    }, [chartRef]);

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    );
};
export default LineMap