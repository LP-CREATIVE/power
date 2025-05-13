import type { ITheme } from "@visactor/vchart";

export const customLightTheme: Partial<ITheme> = {
  type: "light",
  background: "hsl(0, 0%, 98%)",
  axis: {
    domainLine: { style: { stroke: "hsl(0, 0%, 85%)" } },
    grid: { style: { stroke: "hsl(0, 0%, 90%)" } },
    line: { style: { stroke: "hsl(0, 0%, 80%)" } },
    label: { style: { fill: "hsl(0, 0%, 10%)" } },
    title: { style: { fill: "hsl(0, 0%, 20%)" } },
  },
  label: { style: { fill: "hsl(0, 0%, 10%)" } },
  legend: {
    label: { style: { fill: "hsl(0, 0%, 10%)" } },
  },
};

export const customDarkTheme: Partial<ITheme> = {
  type: "dark",
  background: "hsl(0, 0%, 7%)",
  axis: {
    domainLine: { style: { stroke: "hsl(0, 0%, 25%)" } },
    grid: { style: { stroke: "hsl(0, 0%, 20%)" } },
    line: { style: { stroke: "hsl(0, 0%, 25%)" } },
    label: { style: { fill: "hsl(0, 0%, 85%)" } },
    title: { style: { fill: "hsl(0, 0%, 80%)" } },
  },
  label: { style: { fill: "hsl(0, 0%, 90%)" } },
  legend: {
    label: { style: { fill: "hsl(0, 0%, 85%)" } },
  },
};
