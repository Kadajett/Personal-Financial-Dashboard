import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const IncomeContext = createContext({
  income: 0,
  setIncome: (() => {}) as Dispatch<SetStateAction<number>>,
});

const IncomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [income, setIncome] = useState(0);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const income = Number(localStorage.getItem("income"));
    if (income) {
      setIncome(income);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("income", income.toString());
  }, [income]);
  return (
    <IncomeContext.Provider
      value={{
        income,
        setIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

const useIncome = () => {
  const context = useContext(IncomeContext);
  if (context === undefined) {
    throw new Error("useIncome must be used within a IncomeProvider");
  }
  return context;
};

export { IncomeContext, IncomeProvider, useIncome };
