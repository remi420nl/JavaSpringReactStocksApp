import React from "react";
import { timeParse } from "d3-time-format";

export function ConvertData({ data }) {
  const returnarray = objectToArray(data);
  console.log("returnarray! ", returnarray);
  return returnarray;
}

const parseDate = timeParse("%Y-%m-%d");

function objectToArray(data) {
  const timeSeries = data;
  let rows = [];

  for (var key in timeSeries) {
    if (timeSeries.hasOwnProperty(key)) {
      const finData = timeSeries[key];

      const open = finData["1. open"];
      const high = finData["2. high"];
      const low = finData["3. low"];
      //this one is being parsed since we need it for further use
      const close = parseFloat(finData["4. close"]);
      const volume = finData["6. volume"];

      rows.push({
        date: parseDate(key),
        open,
        high,
        low,
        close,
        volume,
      });
    }
  }
  const stockdata = {
    data: rows,
    latestclose: rows[0].close,
  };
  return stockdata;
}

//   //key = date
//   /*
//     for (var key in timeSeries){

//         if (timeSeries.hasOwnProperty(key)){
//             const finData = timeSeries[key];

//             const open = finData['1. open'];
//             const high = finData['2. high'];
//             const low = finData['3. low'];
//             const close = finData['4. close'];

//             rows.push({
//                 date: key,
//                 open,
//                 high,
//                 low,
//                 close
//             });
//         }

//     }

//     console.log(rows);

//     const symbol = data['Meta Data']['2. Symbol'];
//     const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
//     const timeZone = data['Meta Data']['5. Time Zone'];
//  */

//   if (ChartData !== undefined) {
//     return (
//       <div className="stockchart">
//         <h3>{stockdata.name}</h3>

//         <LineChart
//           width={600}
//           height={300}
//           data={ChartData}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <XAxis reversed={true} dataKey="date" />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dot={false}
//             dataKey="open"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//           <Line type="monotone" dot={false} dataKey="close" stroke="yellow" />
//           <Line type="monotone" dot={false} dataKey="high" stroke="#82ca9d" />
//           <Line type="monotone" dot={false} dataKey="low" stroke="red" />
//         </LineChart>
//         <div>Stock Latest close price {latestClosing}</div>
//       </div>
//     );
//   }
//   return <div>nothing to show</div>;
// };

// export default StockInfo;

/////////

import PropTypes from "prop-types";

import { format } from "d3-format";


import { ChartCanvas, Chart } from "react-stockcharts";
import {
  BarSeries,
  CandlestickSeries,
  LineSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, GroupTooltip } from "react-stockcharts/lib/tooltip";
import {
  ema,
  stochasticOscillator,
  bollingerBand,
} from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { timeFormat } from "d3-time-format";

export class StockChart extends React.Component {
  render() {
    const height = 750;
    const { stockdata } = this.props;

	const margin = { left: 70, right: 70, top: 20, bottom: 30 };

	const gridHeight = height - margin.top - margin.bottom;
	const gridWidth = 750 - margin.left - margin.right;

	const showGrid = true;
	const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
	const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

	const ema20 = ema()
		.id(0)
		.options({ windowSize: 20 })
		.merge((d, c) => {d.ema20 = c;})
		.accessor(d => d.ema20);

	const ema50 = ema()
		.id(2)
		.options({ windowSize: 50 })
		.merge((d, c) => {d.ema50 = c;})
		.accessor(d => d.ema50);


	const calculatedData = ema20(ema50((stockdata)));
	const xScaleProvider = discontinuousTimeScaleProvider
		.inputDateAccessor(d => d.date);
	const {
		data,
		xScale,
		xAccessor,
		displayXAccessor,
	} = xScaleProvider(calculatedData);

	const start = xAccessor(last(data));
	const end = xAccessor(data[Math.max(0, data.length - 150)]);
	const xExtents = [start, end];


	return (
		<ChartCanvas height={750}
			width={500}
			ratio={8}
			margin={margin}
		
			seriesName="MSFT"
			data={data}
			xScale={xScale}
			xAccessor={xAccessor}
			displayXAccessor={displayXAccessor}
			xExtents={xExtents}
		>


			<Chart id={1} height={325}
				yExtents={[d => [d.high, d.low], ema20.accessor(), ema50.accessor()]}
				padding={{ top: 10, bottom: 20 }}
			>
				<YAxis axisAt="right" orient="right" ticks={5} {...yGrid} inverted={true}
					tickStroke="#FFFFFF" />
				<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0}
					stroke="#FFFFFF" opacity={0.5} />

				<MouseCoordinateY
					at="right"
					orient="right"
					displayFormat={format(".2f")} />

				<CandlestickSeries
					stroke={d => d.close > d.open ? "#6BA583" : "#DB0000"}
					wickStroke={d => d.close > d.open ? "#6BA583" : "#DB0000"}
					fill={d => d.close > d.open ? "#6BA583" : "#DB0000"} />

				<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
				<LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>

				
				<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
				<CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />

				<EdgeIndicator itemType="last" orient="right" edgeAt="right"
					yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#DB0000"}/>

				<OHLCTooltip origin={[-40, -10]}/>
				
				<GroupTooltip
					layout="vertical"
					origin={[-38, 15]}
					verticalSize={20}
					onClick={e => console.log(e)}
					options={[
						{
							yAccessor: ema20.accessor(),
							yLabel: `${ema20.type()}(${ema20.options().windowSize})`,
							valueFill: ema20.stroke(),
							withShape: true,
						},
						{
							yAccessor: ema50.accessor(),
							yLabel: `${ema50.type()}(${ema50.options().windowSize})`,
							valueFill: ema50.stroke(),
							withShape: true,
						},
					]}
				/>
			
			</Chart>
			<Chart id={2}
				yExtents={d => d.volume}
				height={100} origin={(w, h) => [0, h - 475]}
			>
				<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}
					tickStroke="#FFFFFF" />
				<BarSeries
					yAccessor={d => d.volume}
					fill={d => d.close > d.open ? "#6BA583" : "#DB0000"} />
			</Chart>
			<Chart id={3}
				yExtents={[0, 100]}
				height={125} origin={(w, h) => [0, h - 375]} padding={{ top: 10, bottom: 10 }}
			>
				<XAxis axisAt="bottom" orient="bottom"
					showTicks={false}
					outerTickSize={0}
					stroke="#FFFFFF" opacity={0.5} />
				<YAxis axisAt="right" orient="right"
					tickValues={[20, 50, 80]}
					tickStroke="#FFFFFF"/>
				<MouseCoordinateY
					at="right"
					orient="right"
					displayFormat={format(".2f")} />

		</Chart>
			<Chart id={5}
				yExtents={[0, 100]}
				height={125}
				origin={(w, h) => [0, h - 125]}
				padding={{ top: 10, bottom: 10 }}
			>
				<XAxis axisAt="bottom" orient="bottom"
					{...xGrid}
					tickStroke="#FFFFFF"
					stroke="#FFFFFF" />
				<YAxis axisAt="right" orient="right"
					tickValues={[20, 50, 80]}
					tickStroke="#FFFFFF"/>

				<MouseCoordinateX
					at="bottom"
					orient="bottom"
					displayFormat={timeFormat("%Y-%m-%d")} />
				<MouseCoordinateY
					at="right"
					orient="right"
					displayFormat={format(".2f")} />

			</Chart>
			<CrossHairCursor stroke="#FFFFFF" />
		</ChartCanvas>
    );
  }
}

StockChart.defaultProps = {
  type: "svg",
};


