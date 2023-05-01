import Section from "components/Section";
import useAccount from "hooks/AccountProvider";
import useAI from "hooks/AIProvider";
import useExpenses from "hooks/ExpensesProvider";
import useIncome from "hooks/IncomeProvider";
import { useEffect, useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const { income, riskFactor } = useIncome();
  const { accounts, minimumBalance } = useAccount();
  const { expenses } = useExpenses();
  const [finalThoughts, setFinalThoughts] = useState("");
  const [suggestedSavings, setSuggestedSavings] = useState(0);
  const [suggestedSpending, setSuggestedSpending] = useState(0);

  const { recommendationRequest } = useAI({
    accounts,
    income,
    expenses,
    goal: "",
  });

  useEffect(() => {
    if (input) {
    } else {
      setResult("");
    }
  }, [input]);

  return (
    <Section title="Penni Bot 🤖">
      <div className="flex gap-2">
        Suggested Savings:
        {recommendationRequest?.data?.SuggestedSaving}
      </div>
      <div className="flex gap-2">
        Suggested Spending:
        {recommendationRequest?.data?.SuggestedSpending}
      </div>
      <div className="flex gap-2">
        Final Thoughts:
        {recommendationRequest?.data?.FinalThoughts}
      </div>
    </Section>
  );
};

export default Calculator;
