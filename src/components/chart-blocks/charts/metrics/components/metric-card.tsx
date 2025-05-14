import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { chartTitle } from "@/components/primitives";
import { cn } from "@/lib/utils";

export default function MetricCard({
  title,
  value,
  change,
  className,
}: {
  title: string;
  value: string;
  change: number;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className={cn(chartTitle({ color: "mute", size: "sm" }), "mb-1")}>
        {title}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-xl font-medium">{value}</span>
        <ChangeIndicator change={change} />
      </div>
      <div className="text-xs text-muted-foreground">Compare to last month</div>
    </section>
  );
}

function ChangeIndicator({ change }: { change: number }) {
  return (
    <span
      className={cn(
        "flex items-center rounded-sm px-1 py-0.5 text-xs text-muted-foreground",
        change > 0
     ? "bg-red-100 text-red-600 dark:bg-black"
: "bg-gray-100 text-gray-700 dark:bg-gray-800"

      )}
    >
      {change > 0 ? "+" : ""}
      {Math.round(change * 100)}%
      {change > 0 ? (
        <ArrowUpRight className="ml-0.5 inline-block h-3 w-3" />
      ) : (
        <ArrowDownRight className="ml-0.5 inline-block h-3 w-3" />
      )}
    </span>
  );
}
