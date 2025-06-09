import { useState, useMemo, useEffect } from "react";
import { useGetAllPetsQuery } from "../api/showAllPetsApi";
import PetsFilters from "../components/PetsFilters";
import { Pet } from "../types/pet-type";
import { 
  ChevronFirst, 
  ChevronLast, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PetCardContainer from "./PetCardContainer";

const ShowAllPets = () => {
  // Query management
  const { data: pets, error, isLoading } = useGetAllPetsQuery();

  // State management (move all state hooks to the top)
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [uniqueBreeds, setUniqueBreeds] = useState<string[]>([]);

  // Constants
  const petsPerPage = 6;

  // Update unique categories and breeds when pets data changes
  useEffect(() => {
    if (pets?.pets) {
      const categories = [...new Set(pets.pets.map((pet: Pet) => pet.category_name))] as string[];
      setUniqueCategories(categories);
    }
  }, [pets]);

  // Update unique breeds based on selected category
  useEffect(() => {
    if (pets?.pets) {
      const breeds = selectedCategory
        ? [...new Set(pets.pets
            .filter((pet: Pet) => pet.category_name === selectedCategory)
            .map((pet: Pet) => pet.breed_name))]
        : [...new Set(pets.pets.map((pet: Pet) => pet.breed_name))];
      
      setUniqueBreeds(breeds);
    }
  }, [pets, selectedCategory]);

  // Comprehensive Filtering (use useMemo for performance)
  const filteredPets = useMemo(() => {
    if (!pets?.pets) return [];

    return pets.pets.filter((pet: Pet) => (
      (!selectedCategory || pet.category_name === selectedCategory) &&
      pet.breed_name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedGender ? pet.gender === selectedGender : true) &&
      (selectedStatus ? pet.status === selectedStatus : true) &&
      (selectedBreed ? pet.breed_name === selectedBreed : true)
    ));
  }, [
    pets?.pets, 
    selectedCategory, 
    search, 
    selectedGender, 
    selectedStatus, 
    selectedBreed
  ]);
  
  // Reset Filters Function
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedGender(null);
    setSelectedStatus(null);
    setSelectedBreed(null);
    setCurrentPage(1);
  };

  // Loading and Error States
  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-[#E4D3E7]">
      <div className="text-center">
        <div className="animate-spin w-16 h-16 border-4 border-[#8A5691] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-2xl font-semibold text-[#8A5691]">Loading pets...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen bg-[#E4D3E7]">
      <p className="text-2xl font-semibold text-red-600">Error fetching pets! Please try again.</p>
    </div>
  );

  // Pagination Calculations
  const totalPets = filteredPets.length;
  const totalPages = Math.ceil(totalPets / petsPerPage);
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  // Pagination Navigation Functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
  const goToNextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

  return (
    <div className="flex bg-[#FFFEFE] min-h-screen">
      <PetsFilters 
        {...{ 
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
          uniqueBreeds 
        }} 
      />
      <div className="flex-1 p-8">
        <h2 className="text-4xl font-bold text-[#8A5691] text-center mb-8">
          Available Pets for Adoption
        </h2>
        
        {/* Pet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {currentPets.length > 0 ? (
            currentPets.map((pet: Pet) => <PetCardContainer key={pet.id} pet={pet} />)
          ) : (
            <div className="col-span-full flex justify-center items-center">
              <p className="text-xl text-[#8A5691] bg-[#E4D3E7] p-4 rounded-lg">
                No pets found matching your filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {totalPets > 0 && (
          <div className="flex justify-center items-center space-x-4">
            {/* First Page Button */}
            <Button 
              onClick={goToFirstPage} 
              disabled={currentPage === 1}
              className="bg-[#D1B0D2] hover:bg-[#8A5691] text-white disabled:opacity-50"
            >
              <ChevronFirst className="w-5 h-5" />
            </Button>

            {/* Previous Page Button */}
            <Button 
              onClick={goToPreviousPage} 
              disabled={currentPage === 1}
              className="bg-[#A864AF] hover:bg-[#8A5691] text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNumber = 
                  totalPages <= 5 
                    ? index + 1 
                    : (currentPage > 2 
                        ? Math.max(1, Math.min(totalPages - 4, currentPage - 2)) 
                        : 1) + index;
                
                return pageNumber <= totalPages ? (
                  <Button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`
                      w-10 h-10 rounded-full
                      ${currentPage === pageNumber 
                        ? 'bg-[#8A5691] text-white' 
                        : 'bg-[#E4D3E7] text-[#8A5691] hover:bg-[#D1B0D2]'}
                    `}
                  >
                    {pageNumber}
                  </Button>
                ) : null;
              })}
            </div>

            {/* Next Page Button */}
            <Button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages}
              className="bg-[#A864AF] hover:bg-[#8A5691] text-white disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Last Page Button */}
            <Button 
              onClick={goToLastPage} 
              disabled={currentPage === totalPages}
              className="bg-[#D1B0D2] hover:bg-[#8A5691] text-white disabled:opacity-50"
            >
              <ChevronLast className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Results Summary */}
        <div className="text-center mt-4 text-[#8A5691]">
          Showing {indexOfFirstPet + 1}-{Math.min(indexOfLastPet, totalPets)} of {totalPets} pets
        </div>
      </div>
    </div>
  );
};

export default ShowAllPets;