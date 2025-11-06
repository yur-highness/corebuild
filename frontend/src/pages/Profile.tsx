import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { useState } from "react";
import { Mail, Edit2, LogOut } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Souvick Roy",
    email: "souvick@example.com",
  });

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleLogout = async () => {
    try {
      // example logout logic
      // await axios.post(`${backendUrl}/api/auth/logout`);
      console.log("Logged out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <Toaster />
      <Header />

      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-lg bg-slate-800/50 border-slate-700 shadow-xl rounded-2xl">
          <CardHeader className="text-center space-y-3">
            <Avatar className="w-24 h-24 mx-auto ring-2 ring-blue-500">
              <AvatarImage src="/avatar.png" alt="Profile" />
              <AvatarFallback className="bg-slate-700 text-white text-xl">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl text-white font-bold">
              {userData.name}
            </CardTitle>
            <p className="text-slate-400 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> {userData.email}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsEditing(false);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={handleEditToggle}
                  variant="outline"
                  className="border-slate-600 text-blue-400 hover:bg-slate-700/40"
                >
                  <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
