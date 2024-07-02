import { getDepth, getTicker, getTrades } from "@/utils/httpClient";
import DepthClient from "./DepthClient";

const DepthServer = async ({
  market,
}: {
  market: string;
}): Promise<JSX.Element> => {
  const depth: Depth = await getDepth(market);
  const bids: [string, string][] = depth.bids.reverse();
  const asks: [string, string][] = depth.asks;

  const ticker: Ticker = await getTicker(market);
  const trades: Trade[] = await getTrades(market);
  const price: string = ticker?.lastPrice || trades[0]?.price;

  return (
    <DepthClient
      market={market}
      initialBids={bids}
      initialAsks={asks}
      initialPrice={price}
    />
  );
};

export default DepthServer;
