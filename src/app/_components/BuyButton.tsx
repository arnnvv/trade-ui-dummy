"use client";

import { activeAtom } from "@/store/atoms";
import { useRecoilState } from "recoil";

const BuyButton = (): JSX.Element => {
  const [active, setActive] = useRecoilState(activeAtom);

  return (
    <div
      className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${active === "buy" ? "border-b-greenBorder bg-greenBackgroundTransparent" : "border-b-baseBorderMed hover:border-b-baseBorderFocus"}`}
      onClick={() => setActive("buy")}
    >
      <p className="text-center text-sm font-semibold text-greenText">Buy</p>
    </div>
  );
};

export default BuyButton;
