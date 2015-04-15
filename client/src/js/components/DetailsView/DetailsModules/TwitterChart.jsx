// var rd3 = require('react-d3');
// var LineChart = rd3.LineChart;
var Chart = require('react-chartjs');
var LineChart = Chart.Line;

var demoData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Test Data",
      fillColor: "rgba(181, 161, 236, 0.45)",
      strokeColor: "rgba(181, 161, 236, 1)",
      pointColor: "rgba(181, 161, 236, 1)",
      pointStrokeColor: "rgba(181, 161, 236, 1)",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#fff",
      data: [39, 240, 80, 82, 86, 170, 90, 65, 120, 140, 155, 98]
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
