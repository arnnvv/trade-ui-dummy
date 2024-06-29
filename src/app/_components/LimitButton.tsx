"use client";

import { Dispatch, SetStateAction } from "react";

const LimitButton = ({
  type,
  setType,
}: {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}): JSX.Element => (
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

export default LimitButton;
