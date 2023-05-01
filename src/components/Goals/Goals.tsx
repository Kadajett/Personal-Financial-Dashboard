import classNames from "classnames";
import Section from "components/Section";
import useIncome from "hooks/IncomeProvider";
import { useState } from "react";
import ExpensesTab from "./ExpensesTab";

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
  const [tabs, setTabs] = useState([
    { name: "Long Term Savings", current: false },
    { name: "Big Purchases", current: false },
    { name: "Monthly Expenses", current: true, component: ExpensesTab },
  ]);

  const getCurrentTab = () => {
    return tabs.find((tab) => tab.current);
  };
  return (
    <Section
      title="Goals"
      description="Suggested savings values based on your income"
    >
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs?.find?.((tab) => tab?.current)?.name}
            onChange={(e) => {
              const newTabs = tabs.map((tab) => {
                if (tab.name === e.target.value) {
                  return { ...tab, current: true };
                } else {
                  return { ...tab, current: false };
                }
              });
              setTabs(newTabs);
            }}
          >
            {tabs.map((tab) => (
              <option
                key={tab.name}
                onClick={() => {
                  const newTabs = tabs.map((tab) => {
                    if (tab.name === e.target.value) {
                      return { ...tab, current: true };
                    } else {
                      return { ...tab, current: false };
                    }
                  });
                  setTabs(newTabs);
                }}
              >
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <div
                  key={tab.name}
                  className={classNames(
                    tab.current
                      ? "border-indigo-500 text-indigo-300"
                      : "border-transparent text-white hover:border-gray-300 hover:text-gray-200",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer transform transition ease-in-out duration-150"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                  onClick={() => {
                    const newTabs = tabs.map((t) => {
                      if (t.name === tab.name) {
                        return { ...t, current: true };
                      } else {
                        return { ...t, current: false };
                      }
                    });
                    setTabs(newTabs);
                  }}
                >
                  {tab.name}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {getCurrentTab()?.component?.()}
    </Section>
  );
};

export default Goals;
