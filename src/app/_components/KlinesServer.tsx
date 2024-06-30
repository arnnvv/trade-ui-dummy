import { getKlines } from "@/utils/httpClient";
import TradeView from "./TradeView";

const fetchKlinesData = async (market: string): Promise<Kline[]> => {
  try {
    const klines = await getKlines(
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

const KlinesServer = async ({
  market,
}: {
  market: string;
}): Promise<JSX.Element> => {
  const klines: Kline[] = await fetchKlinesData(market);
  return (
    <div>
      <TradeView klines={klines} />
    </div>
  );
};

export default KlinesServer;
