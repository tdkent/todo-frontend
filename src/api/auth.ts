import axios, { AxiosError } from "axios";

import { TEST_DB } from "../constants/global";
import { RegisterBodyInt, LoginBodyInt } from "../models/auth";
import { UserInfoInt } from "../models/user";
import handleCatch from "../utils/error-handling";

interface AuthResponseInt {
  status: number;
  statusText: string;
  data?: UserInfoInt;
}

const emptyResBody: UserInfoInt = {
  id: 0,
  userEmail: "",
  userName: "",
  userPassword: "",
};

export const register = async (body: RegisterBodyInt): Promise<UserInfoInt> => {
  await axios.post(`${TEST_DB}/users`, body).catch((error: Error | AxiosError) => {
    // handleCatch(error);
  });
  const response = await axios
    .get(`${TEST_DB}/users?userName=${body.userName}`)
    .then((response) => response.data)
    .catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else throw new Error("An unknown error occurred. Please try again.");
    });
  return response[0];
};

export const login = async (body: LoginBodyInt): Promise<AuthResponseInt> => {
  const { userNameOrEmail, userPassword } = body;
  const response = await axios
    .get(
      `${TEST_DB}/users?${
        userNameOrEmail.match(/[@]/) ? "userEmail" : "userName"
      }=${userNameOrEmail}`
    )
    .then((response) => {
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data[0] as UserInfoInt,
      };
    })
    .catch((error: AxiosError) => {
      return handleCatch(error);
    });

  return response;
};
