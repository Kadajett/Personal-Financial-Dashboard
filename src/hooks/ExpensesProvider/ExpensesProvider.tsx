import { createContext, useContext, useEffect, useState } from "react";

export type Expense = {
  name: string;
  amount: number;
  frequency: string;
};

const ExpensesContext = createContext({
  expenses: [] as Expense[],
  setExpenses: (() => {}) as React.Dispatch<React.SetStateAction<Expense[]>>,
  loading: true,
});

const ExpensesProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

    console.log("expenses", expenses);

    if (expenses?.length > 0) {
      setExpenses(expenses);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        setExpenses,
        loading,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

const useExpenses = () => {
  const context = useContext(ExpensesContext);

  if (context === undefined) {
    throw new Error("useExpenses must be used within a ExpensesProvider");
  }

  return context;
};

export { ExpensesContext, ExpensesProvider, useExpenses };

export default useExpenses;
