"use client";
import { Dispatch, SetStateAction } from "react";

const SellButton = ({
  active,
  setActive,
}: {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}): JSX.Element => (
  <div
    className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${active === "sell" ? "border-b-redBorder bg-redBackgroundTransparent" : "border-b-baseBorderMed hover:border-b-baseBorderFocus"}`}
    onClick={() => setActive("sell")}
  >
    <p className="text-center text-sm font-semibold text-redText">Sell</p>
  </div>
);

export default SellButton;
