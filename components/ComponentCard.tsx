// components/ComponentCard.tsx
import { Component } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Package } from "lucide-react";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all p-4 cursor-grab active:cursor-grabbing border-2 border-transparent hover:border-blue-500 ${
        isDragging ? "ring-4 ring-blue-400" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0 flex items-center justify-center">
          <Package className="w-8 h-8 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate">{component.name}</h4>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {component.price.toLocaleString()} {component.price > 1000 ? "RON" : "RON"}
            </span>
            {component.socket && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                {component.socket}
              </span>
            )}
          </div>
          {component.tdp && (
            <p className="text-xs text-gray-500 mt-1">TDP: {component.tdp}W</p>
          )}
        </div>
      </div>
    </div>
  );
}