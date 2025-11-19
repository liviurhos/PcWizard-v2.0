'use client';
import { useStore } from "@/store/buildStore";

export default function CountrySelector() {
  const { country, setCountry } = useStore();

  return (
    <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setCountry("RO")}
        className={`px-4 py-2 rounded ${country === "RO" ? "bg-red-600 text-white" : "text-gray-700"}`}
      >
        RO
      </button>
      <button
        onClick={() => setCountry("UK")}
        className={`px-4 py-2 rounded ${country === "UK" ? "bg-blue-600 text-white" : "text-gray-700"}`}
      >
        UK
      </button>
    </div>
  );
}