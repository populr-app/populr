var Chart = require('react-chartjs');
var LineChart = Chart.Line;

var TwitterChart = React.createClass({
  getInitialState: function(){
    return {
      scores: this.props.twitter.scorehour,
      data: {
      labels: [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      datasets: [
          {
            label: "Twitter Score",
            fillColor: "rgba(228, 130, 99, 0.25)",
            strokeColor: "rgba(228, 130, 99, 1)",
            pointColor: "rgba(228, 130, 99, 1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(228, 130, 99, 1))",
            data: this.props.twitter.scorehour || [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          }
        ]
    }
    }
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
      scores: nextProps.twitter.scorehour,
      data: {
      labels: [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      datasets: [
          {
            label: "Twitter Score",
            fillColor: "rgba(228, 130, 99, 0.25)",
            strokeColor: "rgba(228, 130, 99, 1)",
            pointColor: "rgba(228, 130, 99, 1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(228, 130, 99, 1))",
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
        <LineChart data={this.state.data} options={demoOptions}  maxHeight="400"/>
      </div>
    );
  }
});

module.exports = TwitterChart;
