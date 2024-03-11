// pages/signup.tsx

import React from "react";
import SignUpForm from "../components/auth/signUpForm";
import PageSEO from "../components/icons/PageSEO";

function SignUpPage() {
  return (
    <>
      <PageSEO title="SignUp" />
      <SignUpForm />
    </>
  );
}

export default SignUpPage;
