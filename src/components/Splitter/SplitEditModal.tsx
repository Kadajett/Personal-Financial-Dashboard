import Modal from "components/Modal";

const SplitEditModal = ({
  isOpen,
  setOpen,
  paycheckAmount,
  riskFactor,
  setPaycheckAmount,
  setRiskFactor,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paycheckAmount: number;
  riskFactor: number;
  setPaycheckAmount: React.Dispatch<React.SetStateAction<number>>;
  setRiskFactor: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Modal open={isOpen} setOpen={setOpen}>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl font-bold">Edit Split</h1>
          <div className="flex flex-row gap-2 items-center mt-4">
            <label htmlFor="paycheckAmount">Paycheck Amount</label>
            <input
              type="number"
              name="paycheckAmount"
              id="paycheckAmount"
              className="border border-gray-800 rounded-md p-2 bg-slate-950"
              value={paycheckAmount}
              onChange={(event) => {
                setPaycheckAmount(Number(event.target.value));
              }}
            />

            <div className="text-slate-200 text-sm">
              This is the average amount of money you make after taxes every two
              weeks.
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center mt-4">
            <label htmlFor="riskFactor">Risk Factor</label>
            <input
              type="range"
              min="0"
              step={0.1}
              max="0.3"
              name="riskFactor"
              id="riskFactor"
              className="border border-gray-800 rounded-md p-2 bg-slate-950"
              value={riskFactor}
              onChange={(event) => {
                setRiskFactor(Number(event.target.value));
              }}
            />
            <div className="text-slate-200 text-sm">
              This is an arbitrary number that represents how much risk you
              perceive in your life. The higher the number, the more money you
              will save.
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SplitEditModal;
