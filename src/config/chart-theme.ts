import type { ITheme } from "@visactor/vchart";

export const customLightTheme: Partial<ITheme> = {
  type: "light",
  background: "0 0% 98%", // raw HSL
  fontFamily: "'Inter', sans-serif",
  component: {
    axis: {
      domainLine: { style: { stroke: "0 0% 85%" } },
      grid: { style: { stroke: "0 0% 90%" } },
      line: { style: { stroke: "0 0% 80%" } },
      label: { style: { fill: "0 0% 10%" } },
      title: { style: { fill: "0 0% 20%" } },
    },
    label: { style: { fill: "0 0% 10%" } },
    legend: {
      label: { style: { fill: "0 0% 10%" } },
    },
  },
};

export const customDarkTheme: Partial<ITheme> = {
  type: "dark",
  background: "0 0% 7%",
  fontFamily: "'Inter', sans-serif",
  component: {
    axis: {
      domainLine: { style: { stroke: "0 0% 25%" } },
      grid: { style: { stroke: "0 0% 20%" } },
      line: { style: { stroke: "0 0% 25%" } },
      label: { style: { fill: "0 0% 85%" } },
      title: { style: { fill: "0 0% 80%" } },
    },
    label: { style: { fill: "0 0% 90%" } },
    legend: {
      label: { style: { fill: "0 0% 85%" } },
    },
  },
};


