'use client'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

const PieMapComment = ({ crawlData }: any) => {
    var groupedComments:any=[]
    if(crawlData){
        groupedComments = Object.entries(crawlData?.reduce((acc:any, { feeling_cmt }:any) => {
            acc[feeling_cmt] = acc[feeling_cmt] ? acc[feeling_cmt] + 1 : 1;
            return acc;
        }, {})).map(([feeling, count]) => [feeling, count]);
    }
    const colors = {
        POSITIVE: '#a3e634', // Màu xanh lá
        NEUTRAL: '#60a5fa',   // Màu vàng
        NEGATIVE: '#ef4444'   // Màu đỏ
      };
    
    // Xây dựng options với dữ liệu từ prop crawlData
    const options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Phân tích sắc thái bình luận '
      },
      series: [{
        name: 'Dữ liệu',
        data: groupedComments,
        colors: groupedComments.map(([feeling, count]: any) => colors[feeling])
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
  

export default PieMapComment;