// import {
//     CalendarIcon,
//     ChartPieIcon,
//     DocumentDuplicateIcon,
//     FolderIcon,
//     HomeIcon,
//     UsersIcon,
//   } from '@heroicons/react/24/outline'
import {
  faCalendar,
  faChartBar,
  faSmileWink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navigation = [
  { name: "Dashboard", href: "#", icon: faCalendar, count: "5", current: true },
  { name: "Team", href: "#", icon: faCalendar, current: false },
  {
    name: "Projects",
    href: "#",
    icon: faCalendar,
    count: "12",
    current: false,
  },
  {
    name: "Calendar",
    href: "#",
    icon: faCalendar,
    count: "20+",
    current: false,
  },
  { name: "Documents", href: "#", icon: faSmileWink, current: false },
  { name: "Reports", href: "#", icon: faChartBar, current: false },
];
const teams = [
  { id: 1, name: "Uhhh", href: "#", initial: "H", current: false },
  { id: 2, name: "What?", href: "#", initial: "T", current: false },
  { id: 3, name: "No wayyyy", href: "#", initial: "W", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-800 px-6">
      <div className="flex h-16 shrink-0 items-center"></div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-slate-700 text-white"
                        : "text-slate-200 hover:text-white hover:bg-slate-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={classNames(
                        item.current
                          ? "text-white"
                          : "text-slate-200 group-hover:text-white",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-slate-600 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-slate-500"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-slate-200">
              Your teams
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <a
                    href={team.href}
                    className={classNames(
                      team.current
                        ? "bg-slate-700 text-white"
                        : "text-slate-200 hover:text-white hover:bg-slate-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-400 bg-slate-500 text-[0.625rem] font-medium text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-slate-700"
            >
              <img
                className="h-8 w-8 rounded-full bg-slate-700"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Jeremy Stover</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
