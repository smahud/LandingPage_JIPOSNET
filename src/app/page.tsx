import { Navbar } from "@/components/jiposnet/navbar";
import { Hero } from "@/components/jiposnet/hero";
import { About } from "@/components/jiposnet/about";
import { Services } from "@/components/jiposnet/services";
import { Features } from "@/components/jiposnet/features";
import { Coverage } from "@/components/jiposnet/coverage";
import { WhyChoose } from "@/components/jiposnet/why-choose";
import { Owner } from "@/components/jiposnet/owner";
import { Contact } from "@/components/jiposnet/contact";
import { Footer } from "@/components/jiposnet/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Features />
        <Coverage />
        <WhyChoose />
        <Owner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
