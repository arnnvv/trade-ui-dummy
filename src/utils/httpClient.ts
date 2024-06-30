const BASE_URL: string = "https://exchange-proxy.100xdevs.com/api/v1";

export const getTickers = async (): Promise<Ticker[]> => {
  const response = await fetch(`${BASE_URL}/tickers`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tickers: ${response.statusText}`);
  }
  return response.json();
};

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

export const getDepth = async (market: string): Promise<Depth> => {
  const response = await fetch(`${BASE_URL}/depth?symbol=${market}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch depth: ${response.statusText}`);
  }
  return response.json();
};

export const getTrades = async (market: string): Promise<Trade[]> => {
  const response = await fetch(`${BASE_URL}/trades?symbol=${market}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch trades: ${response.statusText}`);
  }
  return response.json();
};

export const getKlines = async (
  market: string,
  interval: string,
  startTime: number,
  endTime: number,
): Promise<Kline[]> => {
  const response = await fetch(
    `${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch klines: ${response.statusText}`);
  }
  const data = await response.json();
  return data.sort((x: Kline, y: Kline): 1 | -1 =>
    Number(x.end) < Number(y.end) ? -1 : 1,
  );
};
