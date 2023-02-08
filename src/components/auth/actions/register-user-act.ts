import { redirect } from "react-router-dom";

import { TEST_DB } from "../../../constants/global";

interface RegisterUser {
  userEmail: string;
  userName: string;
  userPassword: string;
  verifyPassword: string;
}

export const registerUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data: RegisterUser = {
    userEmail: req.get("email"),
    userName: req.get("username"),
    userPassword: req.get("password"),
    verifyPassword: req.get("verify-password"),
  };
  if (!data.userEmail.match(/[@]/)) {
    return { email: "Please enter a valid email address." };
  }
  if (data.userPassword.length < 4) {
    return {
      password: "Please enter a password that is 4 or more characters long.",
    };
  }
  if (data.userPassword !== data.verifyPassword) {
    return { password: "Passwords do not match. Please try again." };
  }
  const response = await fetch(`${TEST_DB}/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
  console.log("JSON-Server response: ", response);
  return redirect("/");
};
