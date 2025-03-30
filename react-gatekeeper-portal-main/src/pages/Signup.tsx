import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import "../styles/Signup.css";
import BalaLogo from "@/components/BalaLogo";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("https://hack-n-uthon-6-0.vercel.app/api/user/signup", {
        Email: email,
        Password: password,
        Role: "customer",
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      console.log("Signup successful:", response.data);
      // Redirect or post-signup actions
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
      console.error("Signup error:", err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left-panel">
        <div className="logo-container">
          <Link to="/">
            <BalaLogo />
          </Link>
        </div>
        <div className="welcome-text">
          <h1>Welcome.</h1>
          <p>Start your journey now with our management system!</p>
        </div>
      </div>
      
      <div className="signup-right-panel">
        <Card className="signup-card">
          <CardHeader>
            <h1 className="signup-heading">Create an account</h1>
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
                  placeholder="bala@gmail.com"
                  className="signup-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-input-container">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="signup-input"
                    required
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

              <Button type="submit" className="signup-button">Create account</Button>
              <Button type="button" variant="outline" className="google-button">
                <img src="/lovable-uploads/72f266f9-2c3d-49b9-8ad5-da737b20d9eb.png" alt="Google" className="google-icon" />
                Continue with Google
              </Button>
              <div className="login-prompt">
                Already Have An Account? <Link to="/login" className="login-link">Log In</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;