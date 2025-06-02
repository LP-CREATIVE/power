"use client";

import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";
import { RepChartDataAtom } from "@/lib/atoms";
import type { RepMetric } from "@/types/types";

const generateSpec = (data: RepMetric[]): IBarChartSpec => ({
  type: "bar",
  data: [
    {
      id: "barData",
      values: data,
    },
  ],
  xField: "date",
  yField: "count",
  seriesField: "type",

  color: [
  "hsl(0, 100%, 50%)",   // vibrant red
  "hsl(0, 0%, 0%)",       // black

  ],

  padding: [10, 0, 10, 0],
  legends: {
    visible: false,
  },
  stack: false,
  tooltip: {
    trigger: ["click", "hover"],
  },
  bar: {
    state: {
      hover: {
        outerBorder: {
          distance: 2,
          lineWidth: 2,
        },
      },
    },
    style: {
      cornerRadius: [12, 12, 12, 12],
      zIndex: (datum) => datum.type === "completed" ? 2 : 1,
    },
  },
});


export default function Chart() {
  const repChartData = useAtomValue(repChartDataAtom);
  const spec = generateSpec(repChartData);

return <VChart spec={spec} />;
}


