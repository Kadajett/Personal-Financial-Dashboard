import Section from "components/Section";
import useIncome from "hooks/IncomeProvider";
import { useEffect, useState } from "react";
import { formatter } from "utils/numberFormatter";

const essentialsPercentage = 0.5;
const wantsPercentage = 0.3;
const savingsPercentage = 0.2;

function calculateBalance(input: number): {
  essentials: number;
  wants: number;
  savings: number;
} {
  const essentials = input * essentialsPercentage;
  const wants = input * wantsPercentage;
  const savings = input * savingsPercentage;

  return {
    essentials,
    wants,
    savings,
  };
}

interface SavingsResult {
  years: number;
  totalSavings: number;
  totalInterest: number;
}

function calculateSavings(
  years: number,
  biWeeklyPaycheck: number,
  savingsPercentage: number,
  annualInterestRate: number
): SavingsResult {
  const periodsPerYear = 26; // Bi-weekly paychecks in a year
  const interestRatePerPeriod = annualInterestRate / periodsPerYear;

  let totalSavings = 0;
  let totalInterest = 0;

  for (let i = 0; i < years * periodsPerYear; i++) {
    const savings = biWeeklyPaycheck * savingsPercentage;
    const interest = totalSavings * (interestRatePerPeriod / 100);

    totalSavings += savings + interest;
    totalInterest += interest;
  }

  return {
    years,
    totalSavings,
    totalInterest,
  };
}

// Example usage:
const years = 5;
const biWeeklyPaycheck = 2000;

const annualInterestRate = 2; //

// Example usage:
const inputAmount = 1000;
const balance = calculateBalance(inputAmount);
console.log(`For the input amount of ${inputAmount}, the balance is: 
    Essentials: ${balance.essentials}, 
    Wants: ${balance.wants}, 
    Savings: ${balance.savings}`);

const Splitter = () => {
  const [essentials, setEssentials] = useState(0);
  const [wants, setWants] = useState(0);
  const [savings, setSavings] = useState(0);
  const [estimatedSavings, setEstimatedSavings] = useState(0);
  const { setIncome, income } = useIncome();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(event.target.value);
    setIncome(input);
  };

  useEffect(() => {
    const balance = calculateBalance(income);
    setEssentials(balance.essentials);
    setWants(balance.wants);
    setSavings(balance.savings);

    const savings = calculateSavings(years, income, 0.2, 2);
    setEstimatedSavings(savings.totalSavings);
  }, [income]);

  const handleClickChangeIncome = () => {
    const newIncome = prompt("Enter your income", income.toString());
    if (newIncome) {
      setIncome(Number(newIncome));
    }
  };

  return (
    <Section title="Splitter">
      <div
        className="flex flex-col md:grid md:grid-cols-2 md:gap-4"
        onClick={handleClickChangeIncome}
      >
        <div className="flex flex-col ml-10 items-center cursor-pointer whitespace-nowrap">
          Paycheck Amount: {formatter.format(income)}
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-200 sm:pl-0"
            >
              Split Type
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-slate-200"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-slate-200"
            >
              Monthly
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="py-3.5 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-0">
              Essentials
            </td>
            <td className="px-3 py-3.5 text-sm font-medium text-slate-200">
              {formatter.format(essentials)}
            </td>
            <td className="px-3 py-3.5 text-sm font-medium text-slate-200">
              {formatter.format(essentials * 2)}
            </td>
          </tr>
          <tr>
            <td className="py-3.5 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-0">
              Wants
            </td>
            <td className="px-3 py-3.5 text-sm font-medium text-slate-200">
              {formatter.format(wants)}
            </td>
          </tr>
          <tr>
            <td className="py-3.5 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-0">
              Savings
            </td>
            <td className="px-3 py-3.5 text-sm font-medium text-slate-200">
              {formatter.format(savings)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
        <div className="flex flex-col items-center">
          <label htmlFor="input" className="text-2xl font-bold">
            Paycheck Amount
          </label>
          <input
            id="input"
            type="number"
            defaultValue={income}
            className="text-md font-bold text-white text-right bg-slate-600"
            onChange={handleInput}
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="essentials" className="text-2xl font-bold">
              Essentials
            </label>
            ${essentials}
            (Monthly: ${(essentials * 2).toFixed(2)})
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="wants" className="text-2xl font-bold">
              Wants
            </label>
            ${wants.toFixed(2)}
            (Monthly: ${(wants * 2).toFixed(2)})
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="savings" className="text-2xl font-bold">
              Savings
            </label>
            ${savings.toFixed(2)}
            (Monthly: ${(savings * 2).toFixed(2)})
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="estimatedSavings" className="text-2xl font-bold">
              Estimated Savings, {years} years at {annualInterestRate}% interest
            </label>
            ${estimatedSavings.toFixed(2)}
          </div>
        </div>
      </div> */}
    </Section>
  );
};

export default Splitter;
