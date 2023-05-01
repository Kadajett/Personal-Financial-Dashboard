import { Analytics } from "@vercel/analytics/react";
import { AccountProvider } from "hooks/AccountProvider";
import { ExpensesProvider } from "hooks/ExpensesProvider";
import { IncomeProvider } from "hooks/IncomeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import "react-tooltip/dist/react-tooltip.css";
import "styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const localStoragePersistor = createWebStoragePersistor({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient,
      persistor: localStoragePersistor,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Penni.Cash</title>
        <meta name="description" content="Splitter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IncomeProvider>
        <AccountProvider>
          <ExpensesProvider>
            <Analytics />
            <Component {...pageProps} />
          </ExpensesProvider>
        </AccountProvider>
      </IncomeProvider>
    </QueryClientProvider>
  );
}
