import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";

const IconButton = ({
  icon,
  onClick,
  className,
  tooltip,
}: {
  icon: FontAwesomeIconProps["icon"];
  onClick: () => any;
  className?: string;
  tooltip?: string;
}) => {
  return (
    <>
      {tooltip && <Tooltip id="my-tooltip" />}

      <button
        onClick={onClick}
        className={`h-4 w-4 bg-transparent text-slate-100 font-bold m-2 mt-0 rounded focus:outline-none focus:shadow-outline ${className}`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={tooltip}
      >
        <FontAwesomeIcon icon={icon} fontSize={12} />
      </button>
    </>
  );
};

export default IconButton;
