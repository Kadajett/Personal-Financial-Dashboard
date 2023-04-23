import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";

const Section = ({
  title,
  description,
  children,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className="bg-slate-700 rounded p-4 m-2 shadow h-full">
      <h2
        className={`text-xl font-bold mb-2 flex gap-4 ${className} align-middle justify-left`}
      >
        {title}
        {description && (
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-slate-200 tooltip"
            data-tooltip-content={description}
          />
        )}
      </h2>
      <div className="w-full">{children}</div>

      <Tooltip anchorSelect=".tooltip" />
    </div>
  );
};

export default Section;
