import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { User_Login } from "../authservice/api";
import { useNavigate } from "react-router-dom";
import JSEncrypt from "jsencrypt";

const AuthPages = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const encryptWithPublicKey = (data, publicKey) => {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    return jsEncrypt.encrypt(data); // Return Base64 string directly
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, password } = formData;

      // Public key (replace with your server's public key)
      const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgKjm0SVVKc1KSrKfmNpH
cgP71kj6UsxBuOJTaFssna+MYJBcQ/WhOzbFqxgTXwQw735Pwjh5LBeAuJvMTrTh
f0PquaVRqJUYSqocwTMfdnI7qK8PGnhuU9LpW17o+2+Q6mCqQ0sFzCIYAvOcHwKS
ez1b192t4BECaB1KEV0LrozL9y+UFJB+st7Q1LS/7LQyfCrgp10e1zTQjqtXjyhq
WcYiuse5TXjeBLevEuOkx0EsnrtOKpoE7zI9XElzaA4ww5GIElARIcg3/S0J4GRV
1riytGF3rK15Y/uGhofFgo6OQBqRkQZNI6KK+SKHkrpBRLbVPiR5KbAhTQtcH2k0
twIDAQAB
-----END PUBLIC KEY-----`;

      // Encrypt the username and password using the public key
      const encryptedUsername = encryptWithPublicKey(username, publicKey);
      const encryptedPassword = encryptWithPublicKey(password, publicKey);

      if (!encryptedUsername || !encryptedPassword) {
        alert("Encryption failed. Please try again.");
        return;
      }

      // console.log("Encrypted Username:", encryptedUsername);
      // console.log("Encrypted Password:", encryptedPassword);

      // Send the encrypted data to the backend
      const response = await User_Login({
        username: encryptedUsername,
        password: encryptedPassword,
      });

      if (response.success) {
        navigate("/home");
      } else {
        alert("Login failed: " + response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleInputChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Username"
              autoComplete="off"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleInputChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPages;
