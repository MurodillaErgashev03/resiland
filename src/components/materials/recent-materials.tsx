import Link from "next/link";
import { Material } from "@/types";
import { MaterialCard } from "./material-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface RecentMaterialsProps {
  items: Material[];
}

export function RecentMaterials({ items }: RecentMaterialsProps) {
  if (!items || items.length === 0) {
    return (
      <div className="p-8 rounded-xl border border-dashed border-border text-center text-muted-foreground text-sm">
        Hozircha materiallar mavjud emas.
      </div>
    );
  }

  const displayItems = items.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {displayItems.map((item) => (
        <MaterialCard key={item.id} material={item} />
      ))}
    </div>
  );
}
