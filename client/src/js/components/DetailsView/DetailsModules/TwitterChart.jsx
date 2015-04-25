var Chart = require('react-chartjs');
var LineChart = Chart.Line;

var TwitterChart = React.createClass({
  getInitialState: function(){
    return {
      data: {
      labels: this.props.timeAgo || [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      datasets: [
          {
            label: "Twitter Score",
            fillColor: "rgba(228, 130, 99, 0.15)",
            strokeColor: "rgba(228, 130, 99, 1)",
            pointColor: "rgba(228, 130, 99, 1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(228, 130, 99, 1)",
            data: this.props.twitter.scorehour || [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          }
        ]
    }
    }
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
      data: {
      labels: this.props.timeAgo,
      datasets: [
          {
            label: "Twitter Score",
            fillColor: "rgba(228, 130, 99, 0.15)",
            strokeColor: "rgba(228, 130, 99, 1)",
            pointColor: "#fff",
            pointStrokeColor: "rgba(228, 130, 99, 1)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(228, 130, 99, 1)",
            data: nextProps.twitter.scorehour
          }
        ]
    }
    })
  },
  render: function(){
    var demoOptions = {
      responsive: true
    };
    return (
      <div>
        <LineChart data={this.state.data} options={demoOptions} width="1140" height="300"/>
      </div>
    );
  }
});

module.exports = TwitterChart;
