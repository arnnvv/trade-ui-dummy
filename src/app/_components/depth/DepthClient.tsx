"use client";
import SignalingManager from "@/utils/SignalingManager";
import { FC, useEffect, useState } from "react";
import AskTable from "./AskTable";
import BidTable from "./BidTable";

const DepthClient: FC<DepthClientProps> = ({
  market,
  initialBids,
  initialAsks,
  initialPrice,
}: DepthClientProps): JSX.Element => {
  const [bids, setBids] = useState<[string, string][]>(initialBids);
  const [asks, setAsks] = useState<[string, string][]>(initialAsks);

  useEffect(() => {
    const signalingManager = SignalingManager.getInstance();
    const callbackId = `DEPTH-${market}`;

    const handleDepthUpdate = (data: Data) => {
      setBids((originalBids: [string, string][]): [string, string][] => {
        const bidsAfterUpdate = [...(originalBids || [])];

        for (let i = 0; i < bidsAfterUpdate.length; i++)
          for (let j = 0; j < data.bids.length; j++)
            if (bidsAfterUpdate[i][0] === data.bids[j][0]) {
              bidsAfterUpdate[i][1] = data.bids[j][1];
              break;
            }
        return bidsAfterUpdate;
      });

      setAsks((originalAsks: [string, string][]): [string, string][] => {
        const asksAfterUpdate = [...(originalAsks || [])];

        for (let i = 0; i < asksAfterUpdate.length; i++) {
          for (let j = 0; j < data.asks.length; j++) {
            if (asksAfterUpdate[i][0] === data.asks[j][0]) {
              asksAfterUpdate[i][1] = data.asks[j][1];
              break;
            }
          }
        }
        return asksAfterUpdate;
      });
    };

    signalingManager.registerCallback("depth", handleDepthUpdate, callbackId);
    signalingManager.sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.${market}`],
    });

    return () => {
      signalingManager.sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.${market}`],
      });
      signalingManager.deRegisterCallback("depth", callbackId);
    };
  }, [market]);

  return (
    <div>
      <div className="flex justify-between text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Size</div>
        <div className="text-slate-500">Total</div>
      </div>
      {asks && <AskTable asks={asks} />}
      {initialPrice && <div>{initialPrice}</div>}
      {bids && <BidTable bids={bids} />}
    </div>
  );
};

export default DepthClient;
