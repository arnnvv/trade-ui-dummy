"use client";
import Depth from "@/app/_components/depth/Depth";
import KlinesServer from "@/app/_components/KlinesServer";
import MarketBar from "@/app/_components/MarketBar";
import SwapUI from "@/app/_components/SwapUI";
import { useParams } from "next/navigation";

const Trade = (): JSX.Element => {
  const { market } = useParams();

  return (
    <div className="flex flex-row flex-1">
      <div className="flex flex-col flex-1">
        <MarketBar market={market as string} />
        <div className="flex flex-row h-[620px] border-y border-slate-800">
          <div className="flex flex-col flex-1">
            <KlinesServer market={market as string} />
          </div>
          <div className="w-[1px] flex-col border-slate-800 border-l"></div>
          <div className="flex flex-col w-[250px] overflow-hidden">
            <Depth market={market as string} />
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
