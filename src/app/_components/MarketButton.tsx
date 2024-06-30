"use client";

import { typeAtom } from "@/store/atoms";
import { useRecoilState } from "recoil";

const MarketButton = (): JSX.Element => {
  const [type, setType] = useRecoilState(typeAtom);

  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("market")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${type === "market" ? "border-accentBlue text-baseTextHighEmphasis" : "border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"} `}
      >
        Market
      </div>
    </div>
  );
};

export default MarketButton;
