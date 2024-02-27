export const HomeSkeleton = () => {
  return (
    <div className="p-4 flex flex-col gap-5">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <div className="flex gap-7 odd:flex-row-reverse" key={num}>
          <div className="flex-1 hidden sm:block h-[300px] w-[300px] bg-gray-300 skeleton" />
          <div className="md:flex-2 sm:flex-1 flex flex-col justify-center gap-5 w-full">
            <div className="h-10 bg-gray-300 skeleton" />
            <div className="h-7 bg-gray-300 skeleton" />
            <div className="h-7 bg-gray-300 skeleton" />
            <div className="h-10 bg-gray-300 skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
};
