import { GetRandomUsersParameters, RandomUser } from "./../types/random-user";
import { ApiResponse } from "./../types/api-response";
import httpClient from "./httpClient";

export const getRandomUsers = (arg: GetRandomUsersParameters) => {
  return httpClient.get<ApiResponse<RandomUser[]>>("/", { params: arg });
};
