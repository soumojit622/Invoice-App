import { Hero } from "./component/Hero";
import { Navbar } from "./component/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
    </main>
  );
}
