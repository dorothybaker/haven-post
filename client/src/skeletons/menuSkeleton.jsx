export const MenuSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((num) => (
        <div className="flex flex-col gap-2" key={num}>
          <div className="h-[200px] skeleton bg-gray-300" />
          <div className="h-10 bg-gray-300 skeleton" />
        </div>
      ))}
    </div>
  );
};
