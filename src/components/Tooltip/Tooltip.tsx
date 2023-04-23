import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Tooltip as TT } from "react-tooltip";
const Tooltip = ({
  description,
  icon,
}: {
  description: string;
  icon?: FontAwesomeIconProps["icon"];
}) => {
  return (
    <>
      <TT id="tooltip" className="z-[10000] absolute" />
      <FontAwesomeIcon
        icon={icon || faCircleInfo}
        className="text-slate-200 tooltip"
        data-tooltip-content={description}
      />
    </>
  );
};

export default Tooltip;
