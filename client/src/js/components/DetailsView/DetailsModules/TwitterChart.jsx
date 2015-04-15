var Chart = require('react-chartjs');
var LineChart = Chart.Line;

var demoData = {

  labels: [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  datasets: [
    {
      label: "Twitter Score",
      fillColor: "rgba(0,188,212,0.2)",
      strokeColor: "rgba(0,188,212,1)",
      pointColor: "rgba(0,188,212,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
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
