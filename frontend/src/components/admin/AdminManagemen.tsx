import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Shield, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";


interface Admin {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
  avatar?: string;
  lastLogin: string;
  status: "Active" | "Inactive";
}

// interface ToastOptions {
//   title: string;
//   description: string;
//   variant?: string;
// }

const mockAdmins: Admin[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@corebuild.com",
    role: "Super Admin",
    lastLogin: "2024-01-15",
    status: "Active"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@corebuild.com",
    role: "Admin",
    lastLogin: "2024-01-14",
    status: "Active"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@corebuild.com",
    role: "Moderator",
    lastLogin: "2024-01-13",
    status: "Inactive"
  }
];

export const AdminManagement = () => {
//   const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Admin" as Admin["role"]
  });

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const admin: Admin = {
      id: Date.now().toString(),
      ...newAdmin,
      lastLogin: "Never",
      status: "Active"
    };
    setAdmins([...admins, admin]);
    setNewAdmin({ name: "", email: "", role: "Admin" });
    setShowAddForm(false);
    toast({
      title: "Admin Added",
      description: `${admin.name} has been added as an admin.`,
    } as any);
  };

  const handleRemoveAdmin = (id: string) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    toast({
      title: "Admin Removed",
      description: "Admin has been removed from the system.",
      variant: "destructive",
    }as any);
  };

  const getRoleBadgeColor = (role: Admin["role"]) => {
    switch (role) {
      case "Super Admin":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Admin":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Moderator":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusBadgeColor = (status: Admin["status"]) => {
    return status === "Active" 
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Management
            </CardTitle>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-6 bg-white/5 border-white/10">
              <CardContent className="pt-6">
                <form onSubmit={handleAddAdmin} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-name" className="text-white">Full Name</Label>
                      <Input
                        id="admin-name"
                        placeholder="Enter full name"
                        value={newAdmin.name}
                        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-email" className="text-white">Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="Enter email address"
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-role" className="text-white">Role</Label>
                    <select
                      id="admin-role"
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as Admin["role"] })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Add Admin
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddForm(false)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-gray-300">Admin</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Last Login</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={admin.avatar} />
                          <AvatarFallback className="bg-blue-600 text-white text-sm">
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white font-medium">{admin.name}</div>
                          <div className="text-gray-400 text-sm">{admin.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(admin.role)}>
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(admin.status)}>
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{admin.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveAdmin(admin.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};