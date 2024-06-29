import axios from "axios";

const getURL = (): string => {
  const baseURL: string | undefined = process.env.BASE_URL;
  if (!baseURL || baseURL.length === 0)
    throw new Error("BASE_URL is not defined");
  return baseURL;
};

export const getTickers = async (): Promise<Ticker[]> =>
  (await axios.get(`${getURL()}/tickers`)).data;

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
  (await axios.get(`${getURL()}/depth?symbol=${market}`)).data;

export const getTrades = async (market: string): Promise<Trade[]> =>
  (await axios.get(`${getURL()}/trades?symbol=${market}`)).data;

export const getKlines = async (
  market: string,
  interval: string,
  startTime: number,
  endTime: number,
): Promise<Kline[]> =>
  (
    await axios.get(
      `${getURL()}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`,
    )
  ).data.sort((x: Kline, y: Kline): 1 | -1 =>
    Number(x.end) < Number(y.end) ? -1 : 1,
  );
