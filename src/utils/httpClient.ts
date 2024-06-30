import axios from "axios";

const BASE_URL: string = "https://exchange-proxy.100xdevs.com/api/v1";

export const getTickers = async (): Promise<Ticker[]> =>
  (await axios.get(`${BASE_URL}/tickers`)).data;

export const getTicker = async (market: string): Promise<Ticker> => {
  const tickers: Ticker[] = await getTickers();
  const ticker: Ticker | undefined = tickers.find(
    (t: Ticker): boolean => t.symbol === market,
  );
  if (!ticker) {
    throw new Error(`No ticker found for ${market}`);
  }
  return ticker;
};

export const getDepth = async (market: string): Promise<Depth> =>
  (await axios.get(`${BASE_URL}/depth?symbol=${market}`)).data;

export const getTrades = async (market: string): Promise<Trade[]> =>
  (await axios.get(`${BASE_URL}/trades?symbol=${market}`)).data;

export const getKlines = async (
  market: string,
  interval: string,
  startTime: number,
  endTime: number,
): Promise<Kline[]> =>
  (
    await axios.get(
      `${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`,
    )
  ).data.sort((x: Kline, y: Kline): 1 | -1 =>
    Number(x.end) < Number(y.end) ? -1 : 1,
  );
