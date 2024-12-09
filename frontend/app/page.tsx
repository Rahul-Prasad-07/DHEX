import { Hero } from "./components/Hero";
import { Home } from "./components/Home"
import Dashboard from "./dashboard/page";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Dhex Hedging Crypto Volatility */}

      <Hero />
      {/* <Dashboard /> */}

      {/* <Home /> */}
    </div>
  );
}
