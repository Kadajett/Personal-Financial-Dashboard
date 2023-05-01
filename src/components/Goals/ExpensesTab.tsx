import Button from "components/Button";
import useExpenses from "hooks/ExpensesProvider";

const ExpensesTab = () => {
  const { expenses, setExpenses } = useExpenses();
  const addExpense = () => {
    const expenseName = prompt("What is the name of the expense?");
    if (!expenseName) {
      return;
    }
    const expenseAmount = prompt("What is the amount of the expense?");
    if (!expenseAmount) {
      return;
    }

    const expenseFrequency = prompt("What is the frequency of the expense?");
    if (!expenseFrequency) {
      return;
    }

    setExpenses([
      ...expenses,
      {
        name: expenseName,
        amount: Number(expenseAmount),
        frequency: expenseFrequency,
      },
    ]);
  };

  return (
    <>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.name}>
            {expense.name} - {expense.amount} - {expense.frequency}
          </li>
        ))}
      </ul>
      <Button className="w-full mt-2" onClick={addExpense}>
        Add Expense
      </Button>
    </>
  );
};

export default ExpensesTab;
