import { atom } from "recoil";

export const activeAtom = atom<"buy" | "sell">({
  key: "active",
  default: "buy",
});

export const typeAtom = atom<"limit" | "market">({
  key: "type",
  default: "limit",
});
