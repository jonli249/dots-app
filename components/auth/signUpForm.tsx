import React, { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../../utils/useAuth";
import Link from "next/link";

function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [company, setCompany] = useState(""); // Add state for company
  const [signupError, setSignupError] = useState("");

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setSignupError("Passwords do not match");
        return;
      }

      const user = await signup(name, email, password, company); // Pass company to the signup function

      if (user) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError("An error occurred during signup");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />

        <button
          onClick={handleSignup}
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        {signupError && <p className="text-red-500 mt-2">{signupError}</p>}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
