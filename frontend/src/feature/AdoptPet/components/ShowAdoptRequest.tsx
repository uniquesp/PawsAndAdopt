import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, PawPrint } from "lucide-react";
import { AdoptionRequest } from "../types/show-adopt-request-type";

interface ShowAdoptRequestProps {
  data: AdoptionRequest[];
  onView: (request: AdoptionRequest) => void;
  // onDelete: (id: number) => void;
}

const ShowAdoptRequest = ({ data, onView}: ShowAdoptRequestProps) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] p-6 bg-[#E4D3E7]">
        <div className="text-center">
          <PawPrint 
            className="mx-auto mb-6 text-[#8A5691]" 
            size={120} 
            strokeWidth={1.5}
          />
          <h2 className="text-2xl font-bold text-[#8A5691] mb-4">
            No Adoption Requests Yet
          </h2>
          <p className="text-[#A864AF] max-w-md mx-auto">
            It looks like there are no adoption requests at the moment. 
            When you start applying to adopt pets, your requests will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-[#FFFEFE]">
      <h2 className="text-2xl font-semibold mb-6 text-[#8A5691] border-b-2 border-[#D1B0D2] pb-3">
        Adoption Requests
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-[#E4D3E7]">
            <TableHead className="text-left text-[#8A5691]">Email</TableHead>
            <TableHead className="text-left text-[#8A5691]">Mobile No</TableHead>
            <TableHead className="text-left text-[#8A5691]">Status</TableHead>
            <TableHead className="text-center text-[#8A5691]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((request) => (
            <TableRow 
              key={request.id} 
              className="hover:bg-[#E4D3E7] transition-colors"
            >
              <TableCell className="text-[#A864AF]">{request.email}</TableCell>
              <TableCell className="text-[#A864AF]">{request.phone_no}</TableCell>
              <TableCell>
                <span 
                  className={`
                    px-2 py-1 rounded-full text-sm font-semibold
                    ${
                      request.status === "pending" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : request.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  `}
                >
                  {request.status}
                </span>
              </TableCell>
              <TableCell className="flex gap-2 justify-center">
                {/* View Button */}
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="
                    hover:bg-[#A864AF] 
                    hover:text-white 
                    text-[#8A5691] 
                    border-[#A864AF]
                  "
                  onClick={() => onView(request)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowAdoptRequest;