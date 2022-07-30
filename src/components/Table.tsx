import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Column, SortingRule, useSortBy, useTable } from "react-table";
import { RandomUser, TableRef } from "../types/random-user";

export interface TableProps {
  columns: Column<RandomUser>[];
  isLoading: boolean;
  countItems: number;
  randomUserEntities: RandomUser[];
  onSorting: (value: SortingRule<RandomUser>) => void;
}
const Table = forwardRef<TableRef, TableProps>(
  ({ isLoading, randomUserEntities, countItems, onSorting, columns }, ref) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      setSortBy,
      rows,
      prepareRow,
      state: { sortBy },
    } = useTable(
      {
        columns,
        data: randomUserEntities,
        manualPagination: true,
        manualSortBy: true,
        pageCount: countItems,
      },
      useSortBy
    );
    useImperativeHandle(ref, () => ({
      resetSort() {
        setSortBy([]);
      },
    }));
    useEffect(() => {
      if (sortBy.length > 0) {
        const newSortBy = {
          id: sortBy[0].id,
          desc: sortBy[0].desc || false,
        };
        onSorting(newSortBy);
      }
    }, [sortBy]);
    return (
      <table className="min-w-full table-fixed divide-y divide-gray-700" data-testid="table">
        <thead className="bg-zinc-700" {...getTableProps()}>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-zinc-200"
                    {...column.getHeaderProps({
                      style: { width: column.width },
                      ...column.getSortByToggleProps(),
                    })}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                    <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                  </th>
                ))}
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-zinc-200 bg-white">
          {
            // Loop over the table rows
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="hover:bg-zinc-200" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="whitespace-nowrap py-4 px-6 text-sm font-medium text-zinc-900"
                        {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })}
                </tr>
              );
            })
          }
        </tbody>
        {!isLoading && randomUserEntities.length === 0 && (
          <tbody className="divide-y divide-zinc-200 bg-white">
            <tr>
              <td colSpan={10000} className="p-10 text-center text-zinc-500">
                Data Not Found.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    );
  }
);

export default Table;
