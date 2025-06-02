import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type RepMetric = {
  date: string;
  type: "assigned" | "completed";
  count: number;
};
