export const SingleSkeleton = () => {
  return (
    <div className="flex gap-5 p-4">
      <div className="md:flex-5 flex gap-4 flex-col">
        <div className="w-full h-[330px] bg-gray-300 skeleton" />

        <div className="flex flex-col gap-2">
          <div className="h-10 bg-gray-300 skeleton" />
          <div className="h-7 bg-gray-300 skeleton" />
          <div className="h-7 bg-gray-300 skeleton" />
          <div className="h-7 bg-gray-300 skeleton" />
          <div className="h-7 bg-gray-300 skeleton" />
          <div className="h-7 bg-gray-300 skeleton" />
          <div className="h-7 bg-gray-300 skeleton" />
        </div>
      </div>
      <div className="md:flex-2 md:flex flex-col gap-2 hidden">
        {[1, 2].map((num) => (
          <div className="flex flex-col gap-2" key={num}>
            <div className="h-[200px] skeleton bg-gray-300" />
            <div className="h-10 bg-gray-300 skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
};
