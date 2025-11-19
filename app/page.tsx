import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-8 text-center py-20">
      <h1 className="text-5xl font-bold mb-6">PC Builder România & UK</h1>
      <p className="text-xl text-gray-600 mb-10">
        Configurează-ți PC-ul visurilor cu prețuri reale din magazinele tale preferate
      </p>
      <Link
        href="/builder"
        className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-700"
      >
        Începe Configurarea
      </Link>
    </div>
  );
}