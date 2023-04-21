const Section = ({
  title,
  children,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div className="bg-slate-700 rounded p-4 m-2 shadow h-full">
      <h2 className={`text-xl font-bold mb-2 ${className}`}>{title}</h2>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Section;
