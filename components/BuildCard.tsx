// components/BuildCard.tsx
import { Build } from "@/types";
import { useStore } from "@/store/buildStore";
import { Calendar, Cpu, HardDrive, MemoryStick, Power } from "lucide-react";
import toast from "react-hot-toast";

interface BuildCardProps {
  build: Build & { id: string };
  onLoad?: (build: Build) => void;
}

export default function BuildCard({ build, onLoad }: BuildCardProps) {
  const { setComponent, country, setCountry } = useStore();

  const loadBuild = () => {
    // Resetează build-ul curent
    Object.keys(build).forEach((key) => {
      if (key !== "country" && key !== "totalPrice" && key !== "createdAt" && key !== "name" && key !== "id") {
        // @ts-ignore
        setComponent(key, build[key] || null);
      }
    });
    if (build.country) setCountry(build.country);
    toast.success("Build încărcat în Builder!");
    if (onLoad) onLoad(build);
  };

  const total = build.totalPrice || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {build.name || "Build fără nume"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
            <Calendar className="w-4 h-4" />
            {new Date(build.createdAt || Date.now()).toLocaleDateString("ro-RO")}
          </p>
        </div>
        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
          {total.toLocaleString()} {build.country === "UK" ? "£" : "RON"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-6">
        {build.cpu && (
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span className="truncate">{build.cpu.name}</span>
          </div>
        )}
        {build.gpu && (
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-purple-600" />
            <span className="truncate">{build.gpu.name}</span>
          </div>
        )}
        {build.psu && (
          <div className="flex items-center gap-2">
            <Power className="w-4 h-4 text-orange-600" />
            <span>{build.psu.wattage}W</span>
          </div>
        )}
        {build.ram1 && (
          <div className="flex items-center gap-2">
            <MemoryStick className="w-4 h-4 text-green-600" />
            <span>RAM inclusă</span>
          </div>
        )}
      </div>

      <button
        onClick={loadBuild}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-md"
      >
        Încarcă în Builder
      </button>
    </div>
  );
}