
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, UserPlus, Search, Filter, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Mock data for the users
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@liferoot.com",
    role: "admin",
    school: "LifeRoot Academy",
    status: "active",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    joinedDate: "Jan 1, 2023",
  },
  {
    id: "2",
    name: "Mentor Smith",
    email: "mentor@liferoot.com",
    role: "mentor",
    school: "Green Future Institute",
    status: "active",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor",
    joinedDate: "Feb 15, 2023",
  },
  {
    id: "3",
    name: "Alex Student",
    email: "student@liferoot.com",
    role: "student",
    school: "Eco High School",
    status: "active",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
    joinedDate: "Mar 10, 2023",
  },
  {
    id: "4",
    name: "Jamie Wilson",
    email: "jamie@liferoot.com",
    role: "student",
    school: "Sustainable Academy",
    status: "inactive",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamie",
    joinedDate: "Apr 5, 2023",
  },
  {
    id: "5",
    name: "Casey Johnson",
    email: "casey@liferoot.com",
    role: "mentor",
    school: "Earth Institute",
    status: "active",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=casey",
    joinedDate: "May 20, 2023",
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-liferoot-yellow text-black";
    case "mentor":
      return "bg-liferoot-blue text-white";
    case "student":
      return "bg-liferoot-green text-white";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

const getStatusColor = (status: string) => {
  return status === "active" 
    ? "bg-green-100 text-green-700" 
    : "bg-gray-100 text-gray-700";
};

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.school.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage all users on the platform</p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => navigate("/admin/users/new")}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all registered users in the LifeRoot platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[180px]">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.profileImg} />
                          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{user.school}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{user.joinedDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit user</DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default Users;
