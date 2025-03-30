import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import "../styles/Login.css";
import BalaLogo from "@/components/BalaLogo";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/; // At least 6 characters

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password cannot be empty.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "https://hack-n-uthon-6-0.vercel.app/api/user/login",
        { Email: email, Password: password }
      );

      localStorage.setItem("token", response.data.token);
      console.log("Login successful!", response.data);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
      console.error("Login error:", err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <Link to="/">
          <BalaLogo />
        </Link>
      </div>
      <Card className="login-card">
        <CardHeader>
          <h1 className="login-heading">Login to your account</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="login-input"
              />
            </div>
            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password" className="form-label">Password</label>
                <Link to="/forgot-password" className="forgot-link">Forgot?</Link>
              </div>
              <div className="password-input-container">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="login-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <Button type="submit" className="login-button">
              Login now
            </Button>

            <div className="signup-prompt">
              Don't Have An Account? <Link to="/signup" className="signup-link">Sign Up</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;