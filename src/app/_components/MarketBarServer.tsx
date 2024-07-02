import { getTicker } from "@/utils/httpClient";
import MarketBarClient from "./MarketBarClient";

const MarketBarServer = async ({
  market,
}: {
  market: string;
}): Promise<JSX.Element> => {
  const initialTicker: Ticker = await getTicker(market);
  return <MarketBarClient market={market} initialTicker={initialTicker} />;
};

export default MarketBarServer;
