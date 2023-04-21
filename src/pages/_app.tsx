import { Analytics } from "@vercel/analytics/react";
import { AccountProvider } from "hooks/AccountProvider";
import { IncomeProvider } from "hooks/IncomeProvider";
import type { AppProps } from "next/app";
import "react-tooltip/dist/react-tooltip.css";
import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IncomeProvider>
      <AccountProvider>
        <Analytics />
        <Component {...pageProps} />
      </AccountProvider>
    </IncomeProvider>
  );
}
