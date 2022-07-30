import "@testing-library/jest-dom";
import { format } from "date-fns";
import { SortingRule } from "react-table";
import { render, screen, userEvent } from "../test-utils";
import { RandomUserdata } from "../test/mockRandomUserData";
import { RandomUser, RandomUserGender } from "../types/random-user";
import Table, { TableProps } from "./Table";

const fn = {
  onSorting: (value: SortingRule<RandomUser>) => value,
};

const tableProps: TableProps = {
  columns: [
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
  countItems: 10,
  isLoading: false,
  onSorting: fn.onSorting,
  randomUserEntities: RandomUserdata,
};

describe("Table", async () => {
  it("should render the Table", () => {
    render(<Table {...tableProps} />);
    const table = screen.getByTestId("table");
    expect(table).toBeInTheDocument();
  });
});
