"use client";
import ChartManager from "@/utils/Chartmanager";
import { getKlines } from "@/utils/httpClient";
import { useEffect, useRef } from "react";

const TradeView = ({ market }: { market: string }): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);

  useEffect(() => {
    (async () => {
      let kline: Kline[] = [];
      try {
        kline = await getKlines(
          market,
          "1h",
          Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000),
          Math.floor(new Date().getTime() / 1000),
        );
      } catch (e) {}
      if (chartRef) {
        if (chartManagerRef.current) chartManagerRef.current.destroy();
        const chartManager = new ChartManager(
          chartRef.current,
          [
            ...kline?.map(
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
            ),
          ].sort(
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
          ) || [],
          {
            background: "#0e0f14",
            color: "white",
          },
        );
        //@ts-ignore
        chartManagerRef.current = chartManager;
      }
    })();
  }, [market, chartRef]);
  return (
    <>
      <div
        ref={chartRef}
        style={{ height: "520px", width: "100%", marginTop: 4 }}
      ></div>
    </>
  );
};

export default TradeView;
