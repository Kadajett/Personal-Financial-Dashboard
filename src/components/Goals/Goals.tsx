import Section from "components/Section";
import Tooltip from "components/Tooltip";
import useIncome from "hooks/IncomeProvider";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const goals = [
  {
    name: "Emergency Fund",
    calculate: (income: number) => income * 12,
    info: "6 months of expenses, based on your income",
  },
  {
    name: "Retirement",
    calculate: (income: number) => income * 12 * 30,
    info: "30 years of expenses, based on your income",
  },
];

const Goals = () => {
  const { income } = useIncome();
  return (
    <Section
      title="Goals"
      description="Suggested savings values based on your income"
    >
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-200 sm:pl-0"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-slate-200"
            >
              Goal Amount
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-slate-200"
            >
              Info
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {goals.map((goal) => (
            <tr key={goal.name}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-100 sm:pl-0">
                {goal.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-100">
                {formatter.format(goal.calculate(income))}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-100">
                <Tooltip description={goal.info} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default Goals;
