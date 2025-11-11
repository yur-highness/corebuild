import type{  ChangeEvent, FocusEvent, KeyboardEvent, ClipboardEvent } from "react";
import  { useState, useRef,} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Package } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import axios from "axios";
import { useNavigate } from "react-router-dom";


const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const[email, setEmail] = useState('');

  const navigate = useNavigate();




  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  axios.defaults.withCredentials = true;

  if (password !== confirmPassword) {
    toast.error("Mismatch", {
      description: "Passwords do not match.",
    });
    setIsLoading(false);
    return;
  }

  try {
    const otpCode = otp.join(""); // join digits into a string
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`,
      { email, otp: otpCode, newPassword:password },
      { withCredentials: true }
    );

    if (!response.data.success) {
      toast.error("Error", { description: response.data.message });
      return;
    }

    toast.success("Password reset successfully!");
    navigate("/login", { replace: true });
  } catch (error: any) {
    console.error("Error resetting password:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      const index = inputRefs.current.indexOf(e.currentTarget);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const index = inputRefs.current.indexOf(target);

    if (target.value) {
      const newOtp = [...otp];
      newOtp[index] = target.value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      toast.error("Invalid OTP", {
        description: "Please paste exactly 6 digits.",
      });
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black">
      <Toaster />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold text-white">CoreBuild</span>
            </div>
            <CardTitle className="text-2xl text-white">Reset Password</CardTitle>
            <CardDescription className="text-slate-400">
              Enter the OTP sent to your email
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* OTP Inputs */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-14 h-14 text-center text-2xl font-semibold rounded-xl bg-slate-700/50 border border-slate-600 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                ))}
              </div>

              {/* email */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  E-mail
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type={"email"}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                    required
                  />
               
                </div>
              </div>


              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="outline"
                className="w-full mt-4 cursor-pointer hover:bg-amber-50 hover:text-black"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Confirm"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
