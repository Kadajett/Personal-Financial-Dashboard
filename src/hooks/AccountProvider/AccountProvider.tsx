import React, { createContext, useContext, useEffect, useState } from "react";
import type account from "types/accountType";

const AccountContext = createContext({
  accounts: [] as account[],
  setAccounts: (() => {}) as React.Dispatch<React.SetStateAction<account[]>>,
  minimumBalance: 0,
  setMinimumBalance: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  loading: true,
});

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState<account[]>([]);
  const [minimumBalance, setMinimumBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const minimumBalance = Number(localStorage.getItem("minimumBalance"));

    if (accounts?.length > 0) {
      setAccounts(accounts);
    }

    if (minimumBalance) {
      setMinimumBalance(minimumBalance);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("setAccounts", accounts);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    localStorage.setItem("minimumBalance", minimumBalance.toString());
  }, [accounts, minimumBalance]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        minimumBalance,
        setMinimumBalance,
        setAccounts,
        loading,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
};

export { AccountContext, AccountProvider, useAccount };
export default useAccount;
