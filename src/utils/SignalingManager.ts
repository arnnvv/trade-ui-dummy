export const EXCHANGE_URL: string = "wss://ws.backpack.exchange/";

type Message = any;

interface BufferedMessage {
  message: Message;
  id: number;
}

type BufferedMessages = BufferedMessage[];

type CallbackFunc = (data: Data | Partial<Ticker>) => void;

interface Callback {
  callback: CallbackFunc;
  id: string;
}

class SignalingManager {
  private ws: WebSocket;
  private static instance: SignalingManager;
  private bufferedMessages: BufferedMessages = [];
  private callbacks: { [type: string]: Callback[] } = {};
  private id: number;
  private initialized: boolean = false;

  private constructor() {
    this.ws = new WebSocket(EXCHANGE_URL);
    this.bufferedMessages = [];
    this.id = 1;
    this.init();
  }

  public static getInstance(): SignalingManager {
    if (!this.instance) this.instance = new SignalingManager();
    return this.instance;
  }

  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach((message: BufferedMessage) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };
    this.ws.onmessage = (event: MessageEvent<any>) => {
      const message = JSON.parse(event.data);
      const type = message.data.e;
      if (this.callbacks[type]) {
        this.callbacks[type].forEach(({ callback }: Callback) => {
          if (type === "ticker") {
            const newTicker: Partial<Ticker> = {
              lastPrice: message.data.c,
              high: message.data.h,
              low: message.data.l,
              volume: message.data.v,
              quoteVolume: message.data.V,
              symbol: message.data.s,
            };

            callback(newTicker);
          }
          if (type === "depth") {
            const updatedBids: [string, string][] = message.data.b;
            const updatedAsks: [string, string][] = message.data.a;
            callback({ bids: updatedBids, asks: updatedAsks });
          }
        });
      }
    };
  }

  sendMessage(message: Message) {
    const messageToSend: BufferedMessage = {
      ...message,
      id: this.id++,
    };
    if (!this.initialized) {
      this.bufferedMessages.push(messageToSend);
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }

  async registerCallback(type: string, callback: CallbackFunc, id: string) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });
  }

  async deRegisterCallback(type: string, id: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex(
        (callback: Callback): boolean => callback.id === id,
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}

export default SignalingManager;
