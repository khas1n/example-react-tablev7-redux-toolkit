export interface RandomUser {
  gender: RandomUserGender;
  name: RandomUserName;
  login: RandomUserLogin;
  email: string;
  registered: RandomUserRegistered;
}

export interface RandomUserName {
  title: string;
  first: string;
  last: string;
}

export interface RandomUserRegistered {
  date: string;
  age: string;
}

export interface RandomUserLogin {
  username: string;
}

export type RandomUserGender = "female" | "male" | "all";

export interface GetRandomUsersParameters {
  page: number;
  pageSize: number;
  results: number;
  gender?: Exclude<RandomUserGender, "all">;
  sortBy?: string;
  sortOrder?: string;
  keyword?: string;
}

export interface TableRef {
  resetSort(): void;
}
