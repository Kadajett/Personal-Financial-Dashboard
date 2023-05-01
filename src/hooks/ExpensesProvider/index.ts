import type { Expense } from "./ExpensesProvider";
import {
  ExpensesContext,
  ExpensesProvider,
  useExpenses,
} from "./ExpensesProvider";

export { ExpensesContext, ExpensesProvider, useExpenses };
export type { Expense };

export default useExpenses;
