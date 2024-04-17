'use client'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordcloud from 'highcharts/modules/wordcloud';
wordcloud(Highcharts);

const WordMap = () => {
    const options: Highcharts.Options = {
        series: [{
            type: 'wordcloud',
            data: [{
                name: 'Lorem',
                weight: 10
            }, {
                name: 'Ipsum',
                weight: 9
            }, {
                name: 'Dolor',
                weight: 8
            }]
        }],
        title: {
            text: 'Word Map Chart'
        }
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default WordMap;