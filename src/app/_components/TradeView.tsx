"use clfent";
import ChartManager from "@/utils/Chartmanager";
import { useEffect, useRef } from "react";

const TradeView = ({ klines }: { klines: Kline[] }): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartManagerRef.current) chartManagerRef.current.destroy();
      const chartManager = new ChartManager(
        chartRef.current,
        klines
          .map(
            (
              x: Kline,
            ): {
              close: number;
              high: number;
              low: number;
              open: number;
              timestamp: Date;
            } => ({
              close: parseFloat(x.close),
              high: parseFloat(x.high),
              low: parseFloat(x.low),
              open: parseFloat(x.open),
              timestamp: new Date(x.end),
            }),
          )
          .sort(
            (
              x: {
                close: number;
                high: number;
                low: number;
                open: number;
                timestamp: Date;
              },
              y: {
                close: number;
                high: number;
                low: number;
                open: number;
                timestamp: Date;
              },
            ): 1 | -1 => (x.timestamp < y.timestamp ? -1 : 1),
          ),
        {
          background: "#0e0f14",
          color: "white",
        },
      );
      //@ts-ignore
      chartManagerRef.current = chartManager;
    }
  }, [klines]);

  return (
    <div
      ref={chartRef}
      style={{ height: "520px", width: "100%", marginTop: 4 }}
    ></div>
  );
};

export default TradeView;
