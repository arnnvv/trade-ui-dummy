"use client";
import { FC, ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface StateProviderProps {
  children: ReactNode;
}

const StateProvider: FC<StateProviderProps> = ({
  children,
}: StateProviderProps): JSX.Element => <RecoilRoot>{children}</RecoilRoot>;

export default StateProvider;
