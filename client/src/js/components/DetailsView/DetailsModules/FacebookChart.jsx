var Chart = require('react-chartjs');
var LineChart = Chart.Line;

var FacebookChart = React.createClass({
  render: function(){
    var demoData = {
      labels: this.props.timeAgo.reverse(),
      datasets: [
          {
            scaleLabel: "Hours Ago",
            label: "Facebook Score",
            fillColor: "rgba(228, 130, 99, 0.15)",
            strokeColor: "rgba(228, 130, 99, 1)",
            pointColor: "rgba(228, 130, 99, 1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(228, 130, 99, 1)",
            data: [1,20,25,30,25,40,70,30,25,18,20,23,28,15,12,10,1,14,10,36,8,17,10]
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
