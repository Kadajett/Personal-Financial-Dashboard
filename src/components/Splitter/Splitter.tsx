import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Section from "components/Section";
import Tooltip from "components/Tooltip";
import useAccount from "hooks/AccountProvider";
import useIncome from "hooks/IncomeProvider";
import { useEffect, useState } from "react";
import { formatter } from "utils/numberFormatter";
import SplitterModal from "./SplitEditModal";

const essentialsPercentage = 0.5;
const wantsPercentage = 0.3;
const savingsPercentage = 0.2;

function calculateBalance(
  input: number,
  riskFactor: number
): {
  essentials: number;
  wants: number;
  savings: number;
} {
  // Adjust the percentages based on the risk factor
  const adjustedWantsPercentage =
    wantsPercentage - wantsPercentage * riskFactor;
  const adjustedSavingsPercentage =
    savingsPercentage + wantsPercentage * riskFactor;

  const essentials = input * essentialsPercentage;
  const wants = input * adjustedWantsPercentage;
  const savings = input * adjustedSavingsPercentage;

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

const years = 5;

const Splitter = () => {
  const [essentials, setEssentials] = useState(0);
  // const [riskFactor, setRiskFactor] = useState(0);
  const [wants, setWants] = useState(0);
  const [savings, setSavings] = useState(0);
  const [estimatedSavings, setEstimatedSavings] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const { setIncome, income, riskFactor, setRiskFactor } = useIncome();
  const { minimumBalance, setMinimumBalance } = useAccount();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(event.target.value);
    setIncome(input);
  };

  useEffect(() => {
    const balance = calculateBalance(income, riskFactor);
    setEssentials(balance.essentials);
    setWants(balance.wants);
    setSavings(balance.savings);

    const savings = calculateSavings(years, income, 0.2, 2);
    setEstimatedSavings(savings.totalSavings);
  }, [income, riskFactor]);

  const addSavingsToMinimumBalance = () => {
    setMinimumBalance(minimumBalance + savings);
  };

  return (
    <Section
      title="Splitter"
      description="A useful 50/30/20 split of your paycheck."
    >
      <SplitterModal
        isOpen={showEditModal}
        setOpen={setShowEditModal}
        paycheckAmount={income}
        riskFactor={riskFactor}
        setPaycheckAmount={setIncome}
        setRiskFactor={setRiskFactor}
      />
      {/* <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
        <input
          type="range"
          min="0"
          max="0.25"
          step="0.01"
          onChange={(event) => {
            console.log(event.target.value);
            setRiskFactor(Number(event.target.value));
          }}
        />
      </div> */}
      <div
        className="flex flex-col md:grid md:grid-cols-2 md:gap-4"
        onClick={() => {
          setShowEditModal(true);
        }}
      >
        <div className="flex flex-row gap-2 ml-10 items-center cursor-pointer whitespace-nowrap ">
          Paycheck Amount: {formatter.format(income)}
          <FontAwesomeIcon icon={faEdit} className="text-slate-200 inline" />
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
            <td className="px-3 py-3.5 text-sm font-medium text-slate-200">
              {formatter.format(wants * 2)}
            </td>
          </tr>
          <tr>
            <td className="py-3.5 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-0">
              Savings
            </td>
            <td className="px-3 py-3.5 text-sm font-medium text-slate-200">
              {formatter.format(savings)}
            </td>
            <td className="px-3 py-3.5 text-sm font-medium text-slate-200">
              {formatter.format(savings * 2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-row gap-2 items-center mt-4">
        <Button
          onClick={addSavingsToMinimumBalance}
          className="w-full"
          disabled={savings === 0}
        >
          Add Savings to Minimum Balance
        </Button>
        <Tooltip description="Add the suggested savings amount to your minimum balance." />
      </div>
    </Section>
  );
};

export default Splitter;
