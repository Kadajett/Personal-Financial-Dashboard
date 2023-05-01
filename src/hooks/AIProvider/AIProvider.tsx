import { Expense } from "hooks/ExpensesProvider";
import { useQuery } from "react-query";
import type account from "types/accountType";
const useAI = ({
  accounts = [],
  income = 0,
  goal = "",
  expenses = [],
}: {
  accounts: account[];
  income: number;
  goal: string;
  expenses: Expense[];
}) => {
  const recommendationRequest = useQuery(
    "recommendation",
    async () => {
      const res = await fetch(
        `/api/aiSuggest?income=${income}&goal=${goal}&accounts=${JSON.stringify(
          accounts
        )}&expenses=${JSON.stringify(expenses)}`
      );
      const data = await res.json();

      // const res = await fetch("/api/aiSuggest");
      // const data = await res.json();
      const choice = data.choices[0];
      // setInput(choice.message.content);
      const parsed = JSON.parse(choice.message.content);

      // if (parsed.SuggestedSaving) {
      //   setSuggestedSavings(parsed.SuggestedSaving);
      //   console.log(parsed.SuggestedSaving);
      // }
      // if (parsed.SuggestedSpending) {
      //   setSuggestedSpending(parsed.SuggestedSpending);
      //   console.log(parsed.SuggestedSpending);
      // }

      // if (parsed.FinalThoughts) {
      //   setFinalThoughts(parsed.FinalThoughts);
      //   console.log(parsed.FinalThoughts);
      // }
      return {
        ...parsed,
      };
    },
    {
      enabled: accounts.length > 0 && income > 0,
      refetchInterval: 0,
      refetchOnWindowFocus: false,
    }
  );

  return {
    recommendationRequest,
  };
};

export default useAI;
