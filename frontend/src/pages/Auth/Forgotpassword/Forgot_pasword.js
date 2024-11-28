import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    // Giả lập gọi API gửi link reset mật khẩu
    console.log(`Reset link sent to: ${email}`);
    setStatus({
      type: "success",
      message: "A password reset link has been sent to your email.",
    });
    setEmail("");
  };

  return (
    <div className="forgot-password-wrapper">
      <h2 className="title">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="submit-btn">
          Send Reset Link
        </button>
      </form>
      {status && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
