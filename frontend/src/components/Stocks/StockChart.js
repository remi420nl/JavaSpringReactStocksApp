/* eslint-disable no-class-assign */
import React, {Component}from "react";
import PropTypes from "prop-types";
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

import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  OHLCTooltip,
  MovingAverageTooltip,
  RSITooltip,
  SingleValueTooltip,
} from "react-stockcharts/lib/tooltip";
import { ema, rsi, sma } from "react-stockcharts/lib/indicator";
import {
  BarSeries,
  AreaSeries,
  CandlestickSeries,
  LineSeries,
  RSISeries,
} from "react-stockcharts/lib/series";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { timeFormat } from "d3-time-format";
import { render } from "react-dom";

 let StockChart = React.forwardRef (({ type, stockdata, width, ratio }, ref) =>{
  


  const ema55 = ema()
    .id(0)
    .options({ windowSize: 55 })
    .merge((d, c) => {
      d.ema55 = c;
    })
    .accessor((d) => d.ema55);

  const ema20 = ema()
    .id(1)
    .options({ windowSize: 20 })
    .merge((d, c) => {
      d.ema20 = c;
    })
    .accessor((d) => d.ema20);


    const smaVolume50 = sma()
    .id(3)
    .options({ windowSize: 50, sourcePath: "volume" })
    .merge((d, c) => {
      d.smaVolume50 = c;
    })
    .accessor((d) => d.smaVolume50);


  const rsiCalculator = rsi()
    .options({ windowSize: 14 })
    .merge((d, c) => {
      d.rsi = c;
    })
    .accessor((d) => d.rsi);

  const calculatedData = ema55(
    ema20(rsiCalculator(smaVolume50(stockdata)))
  );
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    calculatedData
  );

  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [start, end];


  return (
   
    <ChartCanvas
    ref={ref}
      height={600}
      width={width}
      ratio={ratio}
      margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
      type={type}
      seriesName="MSFT"
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart
        id={1}
        height={300}
        yExtents={[(d) => [d.high, d.low], ema55.accessor(), ema20.accessor()]}
        padding={{ top: 10, bottom: 20 }}
      >
        <XAxis
          axisAt="bottom"
          orient="bottom"
          showTicks={false}
          outerTickSize={0}
        />
        <YAxis axisAt="right" orient="right" ticks={5} />

        <MouseCoordinateY
          at="right"
          orient="right"
          displayFormat={format(".2f")}
        />

        <CandlestickSeries />
        <LineSeries yAccessor={ema55.accessor()} stroke={ema55.stroke()} />
        <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} />

        <CurrentCoordinate yAccessor={ema55.accessor()} fill={ema55.stroke()} />
        <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />

        <EdgeIndicator
          itemType="last"
          orient="right"
          edgeAt="right"
          yAccessor={(d) => d.close}
          fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
        />

        <OHLCTooltip origin={[-40, 0]} />

        <MovingAverageTooltip
          onClick={(e) => console.log(e)}
          origin={[-38, 15]}
          options={[
            {
              yAccessor: ema55.accessor(),
              type: "EMA",
              stroke: ema55.stroke(),
              windowSize: ema55.options().windowSize,
            },
            {
              yAccessor: ema20.accessor(),
              type: "EMA",
              stroke: ema20.stroke(),
              windowSize: ema20.options().windowSize,
            },
          ]}
        />
      </Chart>
      <Chart
        id={2}
        height={150}
        yExtents={[(d) => d.volume, smaVolume50.accessor()]}
        origin={(w, h) => [0, h - 400]}
      >
        <YAxis
          axisAt="left"
          orient="left"
          ticks={5}
          tickFormat={format(".2s")}
        />

        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format(".4s")}
        />

        <BarSeries
          yAccessor={(d) => d.volume}
          fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
        />
        <AreaSeries
          yAccessor={smaVolume50.accessor()}
          stroke={smaVolume50.stroke()}
          fill={smaVolume50.fill()}
        />
      </Chart>
        <Chart
          id={3}
          yExtents={[0, 100]}
          height={125}
          origin={(w, h) => [0, h - 250]}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            showTicks={false}
            outerTickSize={0}
          />
          <YAxis axisAt="right" orient="right" tickValues={[30, 50, 70]} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <RSISeries yAccessor={(d) => d.rsi} />

          <RSITooltip
            origin={[-38, 15]}
            yAccessor={(d) => d.rsi}
            options={rsiCalculator.options()}
          />
        </Chart>
      
      <CrossHairCursor />
    </ChartCanvas>
   
  );
});

StockChart.prototype  = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

StockChart.defaultProps = {
  type: "svg",
};

StockChart = fitWidth(StockChart);
StockChart.displayName ="StockChart"

export default StockChart;
