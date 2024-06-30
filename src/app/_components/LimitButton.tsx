"use client";

import { typeAtom } from "@/store/atoms";
import { useRecoilState } from "recoil";

const LimitButton = (): JSX.Element => {
  const [type, setType] = useRecoilState(typeAtom);

  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("limit")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${type === "limit" ? "border-accentBlue text-baseTextHighEmphasis" : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"}`}
      >
        Limit
      </div>
    </div>
  );
};

export default LimitButton;
