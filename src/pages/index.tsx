import Balances from "components/Balances";
import Calculator from "components/Calculator";
import Goals from "components/Goals";
import Splitter from "components/Splitter";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container  min-h-screen flex h-screen">
      {/* <SideNav /> */}
      <div className="container mx-auto p-4 min-h-screen flex flex-col h-screen">
        <div className="flex flex-row h-full">
          <div className="flex flex-col w-1/2 h-full">
            <Splitter />
            <Goals />
          </div>
          <div className="flex flex-col w-1/2 h-full">
            {/* <Section title="Assets">asdf</Section> */}

            <Balances />
            <Calculator />
          </div>
        </div>
      </div>
    </div>
  );
}
