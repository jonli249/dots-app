// pages/login.tsx

import React from "react";
import LoginForm from "../components/auth/loginForm";
import PageSEO from "../components/icons/PageSEO";

function LoginPage() {
  return (
    <>
      <PageSEO title="Login" />

      <LoginForm />
    </>
  );
}

export default LoginPage;
