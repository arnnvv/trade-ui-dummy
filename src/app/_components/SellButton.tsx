"use client";

import { activeAtom } from "@/store/atoms";
import { useRecoilState } from "recoil";

const SellButton = (): JSX.Element => {
  const [active, setActive] = useRecoilState(activeAtom);

  return (
    <div
      className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${active === "sell" ? "border-b-redBorder bg-redBackgroundTransparent" : "border-b-baseBorderMed hover:border-b-baseBorderFocus"}`}
      onClick={() => setActive("sell")}
    >
      <p className="text-center text-sm font-semibold text-redText">Sell</p>
    </div>
  );
};

export default SellButton;
