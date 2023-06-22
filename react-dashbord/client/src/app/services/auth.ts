import { User } from "@prisma/client";
import { api } from "./api";

// узнать как User  приходит из "@prisma/client"

export type UserData = Omit<User, "id">;
type ResponsLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ResponsLoginData, UserData>({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
        providesTags: ["LOGIN"],
      }),
    }),

    register: build.mutation<ResponsLoginData, UserData>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),

    current: build.query<ResponsLoginData, void>({
      query: () => ({
        url: "/user/current",
        method: "GET",
        providesTags: ["CURRENT"],
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
