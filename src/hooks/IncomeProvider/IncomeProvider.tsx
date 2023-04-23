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
  riskFactor: 0,
  setRiskFactor: (() => {}) as Dispatch<SetStateAction<number>>,
});

const IncomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [income, setIncome] = useState(0);
  const [riskFactor, setRiskFactor] = useState(0);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const income = Number(localStorage.getItem("income"));
    const riskFactor = Number(localStorage.getItem("riskFactor"));
    if (income) {
      setIncome(income);
    }
    if (riskFactor) {
      setRiskFactor(riskFactor);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("income", income.toString());
  }, [income]);

  useEffect(() => {
    localStorage.setItem("riskFactor", riskFactor.toString());
  }, [riskFactor]);

  return (
    <IncomeContext.Provider
      value={{
        income,
        setIncome,
        riskFactor,
        setRiskFactor,
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
