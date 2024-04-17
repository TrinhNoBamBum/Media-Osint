'use client'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

const PieMap = ({ crawlData }: any) => {
    var data:any=[]
    if(crawlData){
        data=Object.entries(crawlData).map(([key, value]:any) => [key, value?.length])
    }
    
    // Xây dựng options với dữ liệu từ prop crawlData
    const options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Biểu đồ video theo dõi'
      },
      series: [{
        name: 'Dữ liệu',
        data: data
      }]
    };
    // Object.entries(crawlData).map(([key, value]:any) => [key, value?.length])
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    );
  };
  

export default PieMap;