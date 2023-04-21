import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button";
import IconButton from "components/IconButton";
import Section from "components/Section";
import useAccount from "hooks/AccountProvider";
import type account from "types/accountType";
import { formatter } from "utils/numberFormatter";

const Balances = () => {
  const { accounts, setAccounts, minimumBalance, setMinimumBalance } =
    useAccount();

  const updateAccountBalance = (accountName: string, newBalance: number) => {
    const updatedAccounts = accounts.map((account) => {
      if (account.name === accountName) {
        return {
          ...account,
          currentBalance: newBalance,
        };
      }
      return account;
    });

    setAccounts(updatedAccounts);
  };

  const clickUpdateBalance = (accountName: string) => {
    const newBalance = prompt("New balance");
    if (newBalance) {
      updateAccountBalance(accountName, Number(newBalance));
    }
  };

  const removeAccount = (accountName: string) => {
    const updatedAccounts = accounts.filter(
      (account) => account.name !== accountName
    );

    setAccounts(updatedAccounts);
  };

  const clickRemoveAccount = (accountName: string) => {
    if (confirm("Are you sure you want to remove this account?")) {
      removeAccount(accountName);
    }
  };

  const clickMinimumBalance = () => {
    const newMinimumBalance = prompt(
      "New minimum balance",
      minimumBalance.toString()
    );
    if (newMinimumBalance) {
      setMinimumBalance(Number(newMinimumBalance));
    }
  };

  const calculateTotalBalance = () => {
    return accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
  };

  const getDifferenceTotalFromMinimumBalance = () => {
    const totalBalance = calculateTotalBalance();
    return totalBalance - minimumBalance;
  };

  const addAccount = () => {
    const name = prompt("Account name");
    const currentBalance = prompt("Current balance");
    const newAccount = {
      name,
      currentBalance: Number(currentBalance),
    } as account;

    setAccounts([...accounts, newAccount]);
  };

  return (
    <Section
      title={`Balances: $${calculateTotalBalance().toFixed(2)}`}
      className="rainbow-text"
    >
      <div
        className={`flex gap-1 items-center cursor-pointer
        
        `}
        onClick={clickMinimumBalance}
      >
        Minimum Balance: {formatter.format(minimumBalance)}
        <span
          className={` p-0 ${
            getDifferenceTotalFromMinimumBalance() < 0
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {getDifferenceTotalFromMinimumBalance() > 0 ? "+" : ""}
          {formatter.format(getDifferenceTotalFromMinimumBalance())}
        </span>
        to spend
      </div>
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
              Balance
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-slate-200"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {accounts.map((account) => (
            <tr key={account.name}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-100 sm:pl-0">
                {account.name}
              </td>

              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-100">
                {formatter.format(account.currentBalance)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <IconButton
                  className="mx-2 bg-slate-500 button"
                  tooltip="Update balance"
                  icon={faEdit}
                  onClick={() => clickUpdateBalance(account.name)}
                />
                <IconButton
                  className="mx-2 bg-slate-500 button"
                  tooltip="Remove account"
                  icon={faTrash}
                  onClick={() => clickRemoveAccount(account.name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Button className="bg-slate-500 button" onClick={addAccount}>
          Add Account
        </Button>
      </div>
    </Section>
  );
};

export default Balances;
