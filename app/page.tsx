import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <section className="min-h-screen bg-blue-500 z-50" />
    </main>
  );
}
