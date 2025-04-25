import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const switchForm = () => {
    setMessage("");
    setIsLogin(!isLogin);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signup(formData);
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setTimeout(() => navigate("/"), 0);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(loginData);
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setTimeout(() => navigate("/"), 0);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cover bg-center px-4 py-8 bg-[#FFFFFF]">
      <div></div>
      <div className="flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl px-6 sm:px-12 py-10">
        <div className="flex mb-8">
          <div
            className={`flex-1 text-center py-2 cursor-pointer font-semibold text-lg ${isLogin ? "border-b-2 border-[#A594F9] text-[#A594F9]" : "text-gray-500"}`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </div>
          <div
            className={`flex-1 text-center py-2 cursor-pointer font-semibold text-lg ${!isLogin ? "border-b-2 border-[#A594F9] text-[#A594F9]" : "text-gray-500"}`}
            onClick={() => setIsLogin(false)}
          >
            REGISTER
          </div>
        </div>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Welcome Back</h2>
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                id="loginEmail"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                id="loginPassword"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#A594F9] hover:bg-[#CDC1FF] text-white'}`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : "Login"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <span className="text-[#A594F9] font-medium cursor-pointer underline" onClick={switchForm}>
                Register
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Create an Account</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CDC1FF]"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                id="password"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#A594F9] hover:bg-[#CDC1FF] text-white'}`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : "Register"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span className="text-[#A594F9] font-medium cursor-pointer underline" onClick={switchForm}>
                Login
              </span>
            </p>
          </form>
        )}
      </div>
      </div>
    </div>
  );
};

export { Login };
