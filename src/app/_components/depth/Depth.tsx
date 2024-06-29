"use client";

import { getDepth, getTicker, getTrades } from "@/utils/httpClient";
import { useEffect, useState } from "react";
import AskTable from "./AskTable";
import BidTable from "./BidTable";

const Depth = ({ market }: { market: string }): JSX.Element => {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    (async () => {
      const depth: Depth = await getDepth(market);
      setBids(depth.bids.reverse());
      setAsks(depth.asks);

      const ticker: Ticker = await getTicker(market);
      setPrice(ticker.lastPrice);

      const trades: Trade[] = await getTrades(market);
      setPrice(trades[0].price);
    })();
  }, [market]);

  return (
    <div>
      <div className="flex justify-between text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Size</div>
        <div className="text-slate-500">Total</div>
      </div>
      {asks && <AskTable asks={asks} />}
      {price && <div>{price}</div>}
      {bids && <BidTable bids={bids} />}
    </div>
  );
};

export default Depth;
