const PackageSkeleton = () => {
  return (
    <div className="animate-pulse w-full overflow-hidden rounded bg-white shadow">
      <div className="h-48 w-full bg-gray-300" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-1/3 rounded bg-gray-300" />
        <div className="h-5 w-2/3 rounded bg-gray-300" />
        <div className="h-4 w-1/4 rounded bg-gray-300" />
        <div className="mt-2 h-8 w-1/2 rounded bg-gray-300" />
      </div>
    </div>
  );
};

export default PackageSkeleton;
