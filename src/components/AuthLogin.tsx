import { Form, useActionData } from "react-router-dom";
import { useContext, useReducer } from "react";

import { AuthFormErrorInt } from "../models/errors";
import AuthContext from "../context/AuthContext";
import FormInput from "./FormInput";
import Button from "./FormButton";
import { LoginInputsEnum, LoginDefStateInt } from "../models/login-user";

const AuthLogin = () => {
  const actionData = useActionData();
  const errors: AuthFormErrorInt = actionData as AuthFormErrorInt;

  const defaultLoginState: LoginDefStateInt = {
    userNameOrEmail: "",
    userPassword: "",
  };

  const reducer = (state: typeof defaultLoginState, action: any) => {
    if (action.type === LoginInputsEnum.user) {
      return { ...state, userNameOrEmail: action.payload.input };
    }
    if (action.type === LoginInputsEnum.password) {
      return { ...state, userPassword: action.payload.input };
    }
    throw new Error("No matching action type!");
  };

  const [state, dispatch] = useReducer(reducer, defaultLoginState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: e.currentTarget.name,
      payload: { input: e.currentTarget.value },
    });
  };
  const auth = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    //? e.preventDefault()
    try {
      // credentials {...state} sent to db. db responds with nomatch error or token, userId
      //TODO: error handling
      auth.login("dummytokenstring", "testid");
      //TODO: initiate redirect to user's list page
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form method="post" action="/login" onSubmit={handleSubmit}>
      <FormInput
        labelText="Username or Email"
        inputType="text"
        inputName={LoginInputsEnum.user}
        handleChange={handleChange}
      />
      {errors?.email && <span>{errors.email}</span>}
      <FormInput
        labelText="Password"
        inputType="text"
        inputName={LoginInputsEnum.password}
        handleChange={handleChange}
      />
      {errors?.password && <span>{errors.password}</span>}
      <Button buttonText="Log in" buttonType="submit" />
    </Form>
  );
};

export default AuthLogin;