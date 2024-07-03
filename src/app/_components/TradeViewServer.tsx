import { getKlines } from "@/utils/httpClient";
import TradeViewClient from "./TradeViewClient";

const fetchKlinesData = async (market: string): Promise<Kline[]> => {
  try {
    const klines: Kline[] = await getKlines(
      market,
      "1h",
      Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000),
      Math.floor(new Date().getTime() / 1000),
    );
    return klines;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const TradeViewServer = async ({
  market,
}: {
  market: string;
}): Promise<JSX.Element> => {
  const klines: Kline[] = await fetchKlinesData(market);
  return (
    <div>
      <TradeViewClient klines={klines} />
    </div>
  );
};

export default TradeViewServer;
