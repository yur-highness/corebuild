import type{  ChangeEvent, KeyboardEvent, FocusEvent, ClipboardEvent } from "react";
import  { useState, useRef, } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



const EmailVerify: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const  backendUrl = import.meta.env.VITE_BACKEND_URL;
   const { id } = useParams();

   axios.defaults.withCredentials = true;
 
  

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

    if (e.key === "Delete" || e.key === "Backspace") {
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
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
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
        description: "Please paste exactly 4 digits.",
      });
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      toast.error("Incomplete OTP", {
        description: "Please enter all 6 digits.",
      });
      return;
    }

    toast.success("OTP Verified!", {
      description: `Entered code: ${enteredOtp}`,
    });
    try{
     
      const response = await axios.post(`${backendUrl}/api/auth/verify-account`,{userId:id,otp:enteredOtp});
      if(response.data.success){
        toast.success("Email verified successfully!");
      }
    }
    catch(error:any){
      console.log(error);
      toast.error("Error verifying account", { description: error.message });
    }
    finally{
    navigate("/");
    }

  
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center">
      <Toaster />

      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 text-white">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-blue-400 mr-2" />
            <span className="text-2xl font-bold text-white">CoreBuild</span>
          </div>
          <CardTitle className="text-2xl">Verify Email</CardTitle>
          <CardDescription className="text-slate-400">
            Enter the 4-digit OTP sent to your registered email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
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
                  ref={(el) => { inputRefs.current[index] = el; }}
                  className="w-14 h-14 text-center text-2xl font-semibold rounded-xl bg-slate-700/50 border border-slate-600 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            >
              Verify
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    <Footer />
    </>
  );
};

export default EmailVerify;
