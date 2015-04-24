var Chart = require('react-chartjs');
var LineChart = Chart.Line;

var FacebookChart = React.createClass({
  render: function(){
    var demoData = {
      labels: this.props.timeAgo,
      datasets: [
          {
            scaleLabel: "Hours Ago",
            label: "Facebook Score",
            fillColor: "rgba(228, 130, 99, 0.15)",
            strokeColor: "rgba(228, 130, 99, 1)",
            pointColor: "#fff",
            pointStrokeColor: "rgba(228, 130, 99, 1))",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(228, 130, 99, 1))",
            data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,12,10,1,14,10,36,3,7,1]
          }
        ]
    };
    var demoOptions = {
      responsive: true
    }
    return (
      <div>
        <LineChart data={demoData} options={demoOptions}  width="1140" height="300"/>
      </div>
    );
  }
});

module.exports = FacebookChart;
