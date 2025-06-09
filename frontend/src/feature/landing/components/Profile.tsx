import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_no?: string;
  profile_image_url: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
  }, []);

  if (!user) {
    return <div className="text-center text-[#8A5691]">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E4D3E7] p-4">
      <Card className="w-full max-w-sm bg-[#FFFEFE] shadow-lg rounded-2xl">
        <CardTitle className="text-[#8A5691] mt-3 text-lg font-semibold text-center">
                User Profile 
        </CardTitle>
        <CardHeader className="flex flex-col items-center">
          <img
            src={`http://localhost:3000${user.profile_image_url}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#A864AF] object-cover"
          />
        </CardHeader>
        <CardContent className="text-[#A864AF] text-sm space-y-3">
          <div className="flex flex-col">
            <span className="text-[#8A5691] font-medium">Name:</span>
            <span>{user.first_name} {user.last_name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#8A5691] font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          {user.phone_no && (
            <div className="flex flex-col">
              <span className="text-[#8A5691] font-medium">Phone:</span>
              <span>{user.phone_no}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
