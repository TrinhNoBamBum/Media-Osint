import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

// Kích hoạt module Highcharts More cho Packed Bubble Chart
HighchartsMore(Highcharts);

const OverMap = ({dataMap}:any) => {
  
  dataMap?.forEach((comment:any) => {
    switch (comment.name) {
        case "NEUTRAL":
            comment.color = "rgb(44 175 252)";
            break;
        case "POSITIVE":
            comment.color = "rgb(0 226 114)";
            
            break;
        case "NEGATIVE":
            comment.color = "rgb(254, 106, 53)";
            break;
        default:
            break;
    }
});
    const options = {
      chart: {
        type: 'packedbubble',
        height: '100%'
      },
      accessibility: {
        enabled: false // Vô hiệu hóa tính năng truy cập
      },
      title: {
        text: 'Từ xuất hiện nhiều ở các bình luận',
        align: 'center'
      },
      tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}'
      },
      plotOptions: {
        packedbubble: {
          minSize: '30%',
          maxSize: '120%',
          zMin: 0,
          zMax: 5,
          layoutAlgorithm: {
            splitSeries: false,
            gravitationalConstant: 0.02
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            filter: {
              property: 'y',
              operator: '>',
              value: 2
            },
            style: {
              color: 'black',
              fontSize:'12px',
              textOutline: 'none'
            }
          }
        }
      },
      series: dataMap
    };
  
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  };
  
export default OverMap;
// [
//   {
//     name: 'Tiêu cực',
//     data: [{ name: 'Hạnhn Phúc', value: 767.1 }, { name: 'Bình an', value: 20.7 }, { name: 'Belgium', value: 97.2 }, { name: 'Czech Republic', value: 111.7 }, { name: 'Netherlands', value: 158.1 }, { name: 'Spain', value: 241.6 }, { name: 'Ukraine', value: 249.1 }, { name: 'Poland', value: 298.1 }, { name: 'France', value: 323.7 }, { name: 'Romania', value: 78.3 }, { name: 'United Kingdom', value: 415.4 }, { name: 'Turkey', value: 353.2 }, { name: 'Italy', value: 337.6 }, { name: 'Greece', value: 71.1 }, { name: 'Austria', value: 69.8 }, { name: 'Belarus', value: 67.7 }, { name: 'Serbia', value: 59.3 }, { name: 'Finland', value: 54.8 }, { name: 'Bulgaria', value: 51.2 }, { name: 'Portugal', value: 48.3 }, { name: 'Norway', value: 44.4 }, { name: 'Sweden', value: 44.3 }, { name: 'Hungary', value: 43.7 }, { name: 'Switzerland', value: 40.2 }, { name: 'Denmark', value: 40 }, { name: 'Slovakia', value: 34.7 }, { name: 'Ireland', value: 34.6 }, { name: 'Croatia', value: 20.7 }, { name: 'Estonia', value: 19.4 }, { name: 'Slovenia', value: 16.7 }, { name: 'Lithuania', value: 12.3 }, { name: 'Luxembourg', value: 10.4 }, { name: 'Macedonia', value: 9.5 }, { name: 'Moldova', value: 7.8 }, { name: 'Latvia', value: 7.5 }, { name: 'Cyprus', value: 7.2 }],
//     color:"rgb(254, 106, 53)"
//   },
//   {
//     name: 'Tích cực',
//     data: [{ name: 'Germany', value: 767.1 }, { name: 'Croatia', value: 20.7 }, { name: 'Belgium', value: 97.2 }, { name: 'Czech Republic', value: 111.7 }, { name: 'Netherlands', value: 158.1 }, { name: 'Spain', value: 241.6 }, { name: 'Ukraine', value: 249.1 }, { name: 'Poland', value: 298.1 }, { name: 'France', value: 323.7 }, { name: 'Romania', value: 78.3 }, { name: 'United Kingdom', value: 415.4 }, { name: 'Turkey', value: 353.2 }, { name: 'Italy', value: 337.6 }, { name: 'Greece', value: 71.1 }, { name: 'Austria', value: 69.8 }, { name: 'Belarus', value: 67.7 }, { name: 'Serbia', value: 59.3 }, { name: 'Finland', value: 54.8 }, { name: 'Bulgaria', value: 51.2 }, { name: 'Portugal', value: 48.3 }, { name: 'Norway', value: 44.4 }, { name: 'Sweden', value: 44.3 }, { name: 'Hungary', value: 43.7 }, { name: 'Switzerland', value: 40.2 }, { name: 'Denmark', value: 40 }, { name: 'Slovakia', value: 34.7 }, { name: 'Ireland', value: 34.6 }, { name: 'Croatia', value: 20.7 }, { name: 'Estonia', value: 19.4 }, { name: 'Slovenia', value: 16.7 }, { name: 'Lithuania', value: 12.3 }, { name: 'Luxembourg', value: 10.4 }, { name: 'Macedonia', value: 9.5 }, { name: 'Moldova', value: 7.8 }, { name: 'Latvia', value: 7.5 }, { name: 'Cyprus', value: 7.2 }]
//   },
//   {
//     name: 'Trung tính',
//     data: [{ name: 'Germany', value: 767.1 }, { name: 'Croatia', value: 20.7 }, { name: 'Belgium', value: 97.2 }, { name: 'Czech Republic', value: 111.7 }, { name: 'Netherlands', value: 158.1 }, { name: 'Spain', value: 241.6 }, { name: 'Ukraine', value: 249.1 }, { name: 'Poland', value: 298.1 }, { name: 'France', value: 323.7 }, { name: 'Romania', value: 78.3 }, { name: 'United Kingdom', value: 415.4 }, { name: 'Turkey', value: 353.2 }, { name: 'Italy', value: 337.6 }, { name: 'Greece', value: 71.1 }, { name: 'Austria', value: 69.8 }, { name: 'Belarus', value: 67.7 }, { name: 'Serbia', value: 59.3 }, { name: 'Finland', value: 54.8 }, { name: 'Bulgaria', value: 51.2 }, { name: 'Portugal', value: 48.3 }, { name: 'Norway', value: 44.4 }, { name: 'Sweden', value: 44.3 }, { name: 'Hungary', value: 43.7 }, { name: 'Switzerland', value: 40.2 }, { name: 'Denmark', value: 40 }, { name: 'Slovakia', value: 34.7 }, { name: 'Ireland', value: 34.6 }, { name: 'Croatia', value: 20.7 }, { name: 'Estonia', value: 19.4 }, { name: 'Slovenia', value: 16.7 }, { name: 'Lithuania', value: 12.3 }, { name: 'Luxembourg', value: 10.4 }, { name: 'Macedonia', value: 9.5 }, { name: 'Moldova', value: 7.8 }, { name: 'Latvia', value: 7.5 }, { name: 'Cyprus', value: 7.2 }]
//   }
// ]