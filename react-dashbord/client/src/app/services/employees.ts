import { Employees } from "@prisma/client";
import { api } from "./api";

export const employeesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllEmployees: build.query<Employees[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),

    getEmployee: build.query<Employees, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),

    editEmployee: build.mutation<string, Employees>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        method: "PUT",
        body: employee,
      }),
    }),

    removeEmployee: build.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),

    addEmployee: build.mutation<Employees, Employees>({
      query: (data) => ({
        url: `/employees/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useGetAllEmployeesQuery,
  useRemoveEmployeeMutation,
} = employeesApi;

export const {
  endpoints: {
    getEmployee,
    getAllEmployees,
    addEmployee,
    editEmployee,
    removeEmployee,
  },
} = employeesApi;
