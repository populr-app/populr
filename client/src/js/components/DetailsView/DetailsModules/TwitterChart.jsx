var Chart = require('react-chartjs');
var LineChart = Chart.Line;

var demoData = {

  labels: [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  datasets: [
    {
      label: "Twitter Score",
      fillColor: "RGBA(247, 115, 98, 0.3)",
      strokeColor: "RGBA(247, 115, 98, 1)",
      pointColor: "RGBA(247, 115, 98, 1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "RGBA(247, 115, 98, 1)",
      data: [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    }
  ]
};

var TwitterChart = React.createClass({
  render: function(){
    return (
      <div>
        <LineChart data={demoData}  width="1120" height="400"/>
      </div>
    );
  }
});

module.exports = TwitterChart;
