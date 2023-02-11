import { Form, useActionData } from "react-router-dom";

import AuthFormValidationError from "../../models/user-auth";

const RegisterUser = () => {
  const actionData = useActionData();
  const errors: AuthFormValidationError = actionData as AuthFormValidationError;
  console.log("errors: ", errors);

  return (
    <Form method="post" action="/register">
      <div>
        <label>
          <span>Email Address:</span>
          <input type="text" name="email" />
        </label>
        {errors?.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>
          <span>Username:</span>
          <input type="text" name="username" />
        </label>
      </div>
      <div>
        <label>
          <span>Password:</span>
          <input type="text" name="password" />
        </label>
      </div>
      <div>
        <label>
          <span>Verify Password:</span>
          <input type="text" name="verify-password" />
        </label>
        {errors?.password && <span>{errors.password}</span>}
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
    </Form>
  );
};

export default RegisterUser;
