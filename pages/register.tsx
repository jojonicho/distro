import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../generated/graphql";
// import { RouteComponentProps } from "react-router-dom";
import { useRouter } from "next/router";
type FormData = {
  username: string;
  email: string;
  password: string;
};

const register = () => {
  const router = useRouter();
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const [reg] = useRegisterMutation();
  const onSubmit = handleSubmit(async ({ username, email, password }) => {
    const response = await reg({
      variables: {
        username,
        email,
        password,
      },
    });
    router.push("/");
    console.log(response);
  });
  return (
    <form onSubmit={onSubmit}>
      <label>username</label>
      <input name="username" placeholder="username" ref={register} />
      {errors.username && "username is required."}
      <label>email</label>
      <input name="email" placeholder="email" ref={register} />
      {errors.email && "email is required"}
      <label>password</label>
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={register}
      />
      {errors.password && "password is required."}
      <input type="submit" />
    </form>
  );
};
export default register;
