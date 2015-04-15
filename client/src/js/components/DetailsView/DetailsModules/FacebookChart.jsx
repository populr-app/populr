var Chart = require('react-chartjs');
var LineChart = Chart.Line;



var FacebookChart = React.createClass({
  render: function(){
    var demoData = {
      labels: [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      datasets: [
          {
            scaleLabel: "Hours Ago",
            label: "Twitter Score",
            fillColor: "rgba(0,188,212,0.2)",
            strokeColor: "rgba(0,188,212,1)",
            pointColor: "rgba(0,188,212,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,12,10,1,14,10,36,3,7,1]
          }
        ]
    };
    var demoOptions = {
      responsive: true
    }
    return (
      <div>
        <LineChart data={demoData} options={demoOptions}  maxHeight="400"/>
      </div>
    );
  }
});

module.exports = FacebookChart;
