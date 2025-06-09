import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, X } from "lucide-react";

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedGender: string | null;
  setSelectedGender: (value: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (value: string | null) => void;
  selectedBreed: string | null;
  setSelectedBreed: (value: string | null) => void;
  resetFilters: () => void;
  uniqueCategories: string[];
  uniqueBreeds: string[];
}

const PetsFilters = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  selectedStatus,
  setSelectedStatus,
  selectedBreed,
  setSelectedBreed,
  resetFilters,
  uniqueCategories,
  uniqueBreeds,
}: FiltersProps) => (
  <aside className="w-72 bg-[#E4D3E7] p-6 border-r hidden md:block flex flex-col justify-between h-screen shadow-xl">
    <div>
      <h2 className="text-2xl font-bold text-[#8A5691] flex items-center gap-3 mb-6">
        <Filter className="w-6 h-6" /> Filters
      </h2>
      <div className="space-y-8">
        {/* Category Filter */}
        <div>
          <p className="font-semibold text-[#8A5691] mb-3">Filter by Category</p>
          <ScrollArea className="h-32 border rounded-lg p-3 bg-[#FFFEFE] shadow-sm">
            {uniqueCategories.map((category, index) => (
              <div key={index} className="flex items-center space-x-3 mb-2">
                <Checkbox
                  className="border-[#A864AF]"
                  checked={selectedCategory === category}
                  onCheckedChange={(checked) => setSelectedCategory(checked ? category : null)}
                />
                <label className="text-sm text-[#8A5691] cursor-pointer">{category}</label>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Search by Breed */}
        <div>
          <p className="font-semibold text-[#8A5691] mb-3">Search by Breed</p>
          <Input 
            type="text" 
            placeholder="Enter breed name..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="border-[#A864AF] focus:ring-[#8A5691]"
          />
        </div>

        {/* Breed Filter */}
        <div>
          <p className="font-semibold text-[#8A5691] mb-3">Filter by Breeds</p>
          <ScrollArea className="h-40 border rounded-lg p-3 bg-[#FFFEFE] shadow-sm">
            {uniqueBreeds.map((breed, index) => (
              <div key={index} className="flex items-center space-x-3 mb-2">
                <Checkbox
                  className="border-[#A864AF]"
                  checked={selectedBreed === breed}
                  onCheckedChange={(checked) => setSelectedBreed(checked ? breed : null)}
                />
                <label className="text-sm text-[#8A5691] cursor-pointer">{breed}</label>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Gender Filter */}
        <div>
          <p className="font-semibold text-[#8A5691] mb-3">Sort by Gender</p>
          <div className="flex gap-4">
            <Button 
              variant={selectedGender === "Male" ? "default" : "outline"} 
              className={`${
                selectedGender === "Male" 
                  ? "bg-[#8A5691] text-white hover:bg-[#8A5691]" 
                  : "border-[#A864AF] text-[#8A5691] hover:bg-[#E4D3E7]"
              }`}
              onClick={() => setSelectedGender(selectedGender === "Male" ? null : "Male")}
            >
              Male
            </Button>
            <Button 
              variant={selectedGender === "Female" ? "default" : "outline"} 
              className={`${
                selectedGender === "Female" 
                  ? "bg-[#8A5691] text-white hover:bg-[#8A5691]" 
                  : "border-[#A864AF] text-[#8A5691] hover:bg-[#E4D3E7]"
              }`}
              onClick={() => setSelectedGender(selectedGender === "Female" ? null : "Female")}
            >
              Female
            </Button>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <p className="font-semibold text-[#8A5691] mb-3">Sort by Availability</p>
          <div className="flex gap-4">
            <Button 
              variant={selectedStatus === "Available" ? "default" : "outline"} 
              className={`${
                selectedStatus === "Available" 
                  ? "bg-[#8A5691] text-white hover:bg-[#8A5691]" 
                  : "border-[#A864AF] text-[#8A5691] hover:bg-[#E4D3E7]"
              }`}
              onClick={() => setSelectedStatus(selectedStatus === "Available" ? null : "Available")}
            >
              Available
            </Button>
            <Button 
              variant={selectedStatus === "Unavailable" ? "default" : "outline"} 
              className={`${
                selectedStatus === "Unavailable" 
                  ? "bg-[#8A5691] text-white hover:bg-[#8A5691]" 
                  : "border-[#A864AF] text-[#8A5691] hover:bg-[#E4D3E7]"
              }`}
              onClick={() => setSelectedStatus(selectedStatus === "Unavailable" ? null : "Unavailable")}
            >
              Unavailable
            </Button>
          </div>
        </div>
      </div>
    </div>
    {/* Reset Filters Button */}
    <Button 
      onClick={resetFilters} 
      className="mt-6 bg-[#A864AF] hover:bg-[#8A5691] text-white flex items-center gap-2"
    >
      <X className="w-5 h-5" /> Reset Filters
    </Button>
  </aside>
);

export default PetsFilters;