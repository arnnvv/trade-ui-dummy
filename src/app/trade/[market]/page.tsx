"use client";
import DepthServer from "@/app/_components/depth/DepthServer";
import MarketBarServer from "@/app/_components/MarketBarServer";
import SwapUI from "@/app/_components/SwapUI";
import TradeViewServer from "@/app/_components/TradeViewServer";
import { useParams } from "next/navigation";

const Trade = (): JSX.Element => {
  const { market } = useParams();

  return (
    <div className="flex flex-row flex-1">
      <div className="flex flex-col flex-1">
        <MarketBarServer market={market as string} />
        <div className="flex flex-row h-[620px] border-y border-slate-800">
          <div className="flex flex-col flex-1">
            <TradeViewServer market={market as string} />
          </div>
          <div className="w-[1px] flex-col border-slate-800 border-l"></div>
          <div className="flex flex-col w-[250px] overflow-hidden">
            <DepthServer market={market as string} />
          </div>
        </div>
      </div>
      <div className="w-[1px] flex-col border-slate-800 border-l"></div>
      <div>
        <div className="flex flex-col w-[250px]">
          <SwapUI market={market as string} />
        </div>
      </div>
    </div>
  );
};

export default Trade;
