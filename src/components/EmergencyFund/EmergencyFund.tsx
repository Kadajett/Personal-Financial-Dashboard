import useIncome from "hooks/IncomeProvider";

const EmergencyFund = () => {
  const { income } = useIncome();
  return (
    <div>
      <p>Emergency Fund: {income}</p>
    </div>
  );
};

export default EmergencyFund;
