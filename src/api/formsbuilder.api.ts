"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormShape } from "../types/FormBuilderShape";
export interface FormResponse {
  success: boolean;
  response: {
    title: string;
    questions: Question[];
    _id: string;
    __v: number;
  };
}

export interface Question {
  question: string;
  type: string;
  options: string[];
  _id: string;
}

export interface ErrorResponse {
  data?: {
    message: string;
    success: boolean;
  };
  message?: string;
  success?: boolean;
}

export const formBuilderApi = createApi({
  reducerPath: "forms",
  tagTypes: ["Forms"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000`,
  }),

  endpoints: (builder) => ({
    googleForms: builder.query({
      query: () => {
        return {
          url: `/api/v1/forms`,
          method: "get",
        };
      },
      providesTags: ["Forms"],
    }),
    create: builder.mutation<FormResponse, FormShape>({
      query: (data) => {
        return {
          url: `/api/v1/forms/create`,
          method: "post",
          body: data,
        };
      },
    }),
    form: builder.query<{ response: FormShape }, string | undefined>({
      query: (id) => {
        return {
          url: `/api/v1/forms/${id}`,
          method: "get",
        };
      },
    }),

    update: builder.mutation({
      query: ({ values, formId }) => {
        return {
          url: `/api/v1/forms/${formId}`,
          method: "PATCH",
          body: values,
        };
      },
      invalidatesTags: ["Forms"],
    }),

    delete: builder.mutation<{ success: string }, string>({
      query: (id) => {
        return {
          url: `/api/v1/forms/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["Forms"],
    }),
  }),
});
export const {
  useFormQuery,
  useGoogleFormsQuery,
  useCreateMutation,
  useDeleteMutation,
  useUpdateMutation,
} = formBuilderApi;
