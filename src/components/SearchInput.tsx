import { forwardRef } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ onSearch }, ref) => {
  return (
    <div className="p-4">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"></path>
          </svg>
        </div>
        <input
          ref={ref}
          type="text"
          id="table-search"
          data-testid="table-search"
          onChange={(val) => onSearch(val.target.value)}
          className="input block w-80 rounded-lg border-gray-300 pl-10"
          placeholder="Search for items"
        />
      </div>
    </div>
  );
});

export default SearchInput;
