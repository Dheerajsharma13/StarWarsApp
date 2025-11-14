import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const res = login(email, password);

    if (!res.success) {
      setError(res.message);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl p-8 rounded-xl w-[90%] max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
