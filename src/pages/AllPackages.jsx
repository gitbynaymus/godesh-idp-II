// AllPackages.jsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PackageCard from "../components/Card/PackageCard";
import PackageSkeleton from "../components/shared/PackageSkeleton";

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "priceLow" },
  { label: "Price: High to Low", value: "priceHigh" },
  { label: "Most Recent", value: "recent" },
];

const AllPackages = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  // Fetch trip categories
  const { data: categories = [] } = useQuery({
    queryKey: ["tripCategories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages/categories");
      return res.data;
    },
  });

  // Fetch packages
  const { data: result = {}, isLoading } = useQuery({
    queryKey: ["packages", { search, sort, category, page }],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages", {
        params: { search, sort, category, page, limit },
      });
      return res.data;
    },
  });

  const packages = result.data || [];
  const totalPages = result.totalPages || 1;
  //   console.log(packages);
  return (
    <div className="mx-auto w-11/12 max-w-[1440px] py-10">
      <h2 className="mb-10 text-center text-3xl font-bold text-primary">
        All Packages
      </h2>
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search trip title..."
          className="input w-full rounded-full px-6 py-2 md:w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex w-full flex-col justify-end gap-4 md:flex-row md:gap-4">
          <select
            className="input rounded-lg px-2 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className="input rounded-lg px-2 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="mx-auto grid grid-cols-1 place-content-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          {
            Array.from({ length: limit - 4 }).map((_, index) => (
              <PackageSkeleton key={index} />
            ))
          }
        </div>
      ) : (
        <div className="mx-auto grid grid-cols-1 place-content-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} pack={pkg} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {/* Prev button */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page numbers */}
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`rounded px-3 py-1 ${page === num + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
          >
            {num + 1}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPackages;
