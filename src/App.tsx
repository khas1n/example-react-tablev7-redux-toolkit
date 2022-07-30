import { useEffect, useMemo, useRef, useState } from "react";
import { useActions } from "./hooks/use-actions";
import { Column, SortingRule } from "react-table";
import { Pagination } from "react-pagination-bar";
import { format } from "date-fns";
import { randomUserAction } from "./state/randomUser/slice";
import { GetRandomUsersParameters, RandomUser, RandomUserGender, TableRef } from "./types/random-user";
import { useTypedSelector } from "./hooks/use-typed-selector";
import LoadingIndicator from "./components/LoadingIndicator";
import SearchInput from "./components/SearchInput";
import Table from "./components/Table";
import GenderSelectInput from "./components/GenderSelectInput";

const pageSize = 5;
const countItems = 10;
function App() {
  const isLoading = useTypedSelector(({ randomUser }) => randomUser.isLoading);
  const randomUserEntities = useTypedSelector(({ randomUser }) => randomUser.entities);
  const { fetchRandomUsers } = useActions<typeof randomUserAction>(randomUserAction);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortingRule<RandomUser> | null>(null);
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState<RandomUserGender>("all");
  const refSearch = useRef<HTMLInputElement>(null);
  const refTable = useRef<TableRef>(null);

  const columns = useMemo<Column<RandomUser>[]>(
    () => [
      {
        Header: "Username",
        accessor: "login",
        width: "13%",
        Cell: (props) => {
          return <span>{props.row.values.login.username}</span>;
        },
      },
      {
        Header: "Name",
        accessor: "name",
        width: "29%",
        Cell: (props) => {
          return (
            <span>
              {props.row.values.name.first} {props.row.values.name.last}
            </span>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        width: "29%",
      },
      {
        Header: "Registered Date",
        accessor: "registered",
        width: "15%",
        Cell: (props) => {
          return <span>{format(new Date(props.row.values.registered.date), "dd-MM-yyyy HH:MM")}</span>;
        },
      },
    ],
    []
  );

  const fetchData = () => {
    const params: GetRandomUsersParameters = {
      page,
      pageSize,
      results: pageSize,
    };
    if (search) {
      params.keyword = search;
    }
    if (sort) {
      params.sortBy = sort.id;
      params.sortOrder = params.sortOrder ? "desc" : "asc";
    }
    if (gender !== "all") {
      params.gender = gender;
    }
    fetchRandomUsers(params);
  };

  let timer: NodeJS.Timeout;
  const onSearch = (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 750);
  };

  const onSorting = (value: SortingRule<RandomUser>) => {
    setSort(value);
    setPage(1);
  };

  const onGenderChange = (value: RandomUserGender) => {
    setGender(value);
    setPage(1);
  };

  const onResetFilter = () => {
    // reset search
    if (refSearch.current) {
      refSearch.current.value = "";
    }
    setSearch("");

    // reset Sort
    refTable.current?.resetSort();
    setSort(null);

    // reset page
    setPage(1);

    // reset Gender
    setGender("all");
  };

  useEffect(() => {
    fetchData();
  }, [search, page, sort, gender]);

  return (
    <div className="pb-24">
      <div className="mx-auto mt-10 w-[1024px] max-w-full">
        <div className="overflow-hidden rounded-md shadow-lg">
          <div className="relative flex flex-col">
            <div className="overflow-x-auto">
              <div className="flex items-center">
                <SearchInput onSearch={onSearch} ref={refSearch} />
                <GenderSelectInput onGenderChange={onGenderChange} gender={gender} />
                <div>
                  <button
                    onClick={onResetFilter}
                    className="ml-5 inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                    Reset Filter
                  </button>
                </div>
              </div>
              <div className="inline-block min-w-full align-middle">
                <div className="relative overflow-hidden">
                  {isLoading && <LoadingIndicator />}
                  <Table
                    columns={columns}
                    countItems={countItems}
                    isLoading={isLoading}
                    randomUserEntities={randomUserEntities}
                    onSorting={onSorting}
                    ref={refTable}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isLoading && (
          <div className="mt-4">
            <Pagination
              initialPage={page}
              totalItems={countItems}
              itemsPerPage={pageSize}
              onPageСhange={(pageNumber) => {
                setPage(pageNumber);
              }}
              customClassNames={{
                rpbItemClassName:
                  "ml-0 border border-zinc-300 bg-white py-2 px-3 leading-tight text-zinc-900 hover:bg-gray-100 hover:text-zinc-700 shadow-md",
                rpbItemClassNameActive: "!bg-zinc-900 !text-white",
                rpbItemClassNameDisable: "!opacity-50 pointer-events-none",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
