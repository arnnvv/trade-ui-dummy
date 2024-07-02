import { getDepth, getTicker } from "@/utils/httpClient";
import AskTable from "./AskTable";
import BidTable from "./BidTable";

const DepthServer = async ({
  market,
}: {
  market: string;
}): Promise<JSX.Element> => {
  const depth: Depth = await getDepth(market);
  const bids: [string, string][] = depth.bids.reverse();
  const asks: [string, string][] = depth.asks;

  const ticker: Ticker = await getTicker(market);
  const price: string = ticker.lastPrice;

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

export default DepthServer;
