import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = (props) => {
  const maxVal = Math.max(...props.dataPoints.map((dp) => dp.value));
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          value={dataPoint.value}
          max={maxVal}
          label={dataPoint.label}
          key={dataPoint.label}
        ></ChartBar>
      ))}
    </div>
  );
};
export default Chart;
