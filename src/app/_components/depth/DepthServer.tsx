import { getDepth, getTicker, getTrades } from "@/utils/httpClient";
import DepthClient from "./DepthClient";

const DepthServer = async ({
  market,
}: {
  market: string;
}): Promise<JSX.Element> => {
  const initialDepth: Depth = await getDepth(market);
  const initialBids: [string, string][] = initialDepth.bids.reverse();
  const initialAsks: [string, string][] = initialDepth.asks;

  const initialTicker: Ticker = await getTicker(market);
  const initialTrades: Trade[] = await getTrades(market);
  const initialPrice: string =
    initialTicker?.lastPrice || initialTrades[0]?.price;

  return (
    <DepthClient
      market={market}
      initialBids={initialBids}
      initialAsks={initialAsks}
      initialPrice={initialPrice}
    />
  );
};

export default DepthServer;
