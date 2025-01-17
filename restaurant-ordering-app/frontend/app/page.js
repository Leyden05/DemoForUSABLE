"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="text-center p-6 bg-neutral-500 shadow-lg rounded-lg">
        <p className="text-lg font-medium mb-4">
          Hi USAble, this is my demo restaurant ordering app
        </p>
        <button
          onClick={() => router.push("/place-order")}
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
        >
          Let's Get Started
        </button>
      </div>
    </main>
  );
}
