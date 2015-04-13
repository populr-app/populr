// var rd3 = require('react-d3');
// var LineChart = rd3.LineChart;
var Chart = require('react-chartjs');
var LineChart = Chart.Line;

var demoData = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Test Data",
      fillColor: "rgba(0,188,212,0.2)",
      strokeColor: "rgba(0,188,212,1)",
      pointColor: "rgba(0,188,212,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

var TwitterChart = React.createClass({
  render: function(){
    return (
      <div>
        <LineChart data={demoData}  width="800" height="auto"/>
      </div>
    );
  }
});

module.exports = TwitterChart;
