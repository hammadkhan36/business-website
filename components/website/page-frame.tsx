import type { ReactNode } from "react";

type PageFrameProps = {
  children: ReactNode;
};

export function PageFrame({ children }: PageFrameProps) {
  return <main>{children}</main>;
}
