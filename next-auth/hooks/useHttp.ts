import React, { useCallback } from "react";
import axios, { AxiosError, isAxiosError, AxiosResponse } from "axios";

import { IHttpConf, IUSer } from "../types/types";

const BASE_URL = "/api";

const API = axios.create({ baseURL: BASE_URL });

export default function useHttp() {
  const requestHttp = useCallback(
    async <T, U>(
      requestConfig: IHttpConf<T>,
      requestFunc: (data: U) => void,
      errorFunc: (error: AxiosError) => void
    ) => {
      try {
        const { method, url, data } = requestConfig;
        const response: AxiosResponse<U> = await API({
          method: method,
          url: url,
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.data;

        requestFunc(responseData);
      } catch (error) {
        if (isAxiosError(error)) {
          errorFunc(error.response!.data);
        }
      }
    },
    []
  );

  return { requestHttp };
}
