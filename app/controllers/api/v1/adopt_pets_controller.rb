class Api::V1::AdoptPetsController < Api::V1::BaseController
    # Show all adoption requests with pet images (current user)

    def show_adoptions
      adopt_pets = current_user.adopt_pets.includes(pet: [ :breed, :category ])

      if adopt_pets.exists?
        render json: {
          success: true,
          data: adopt_pets.map { |adoption| adoption_data(adoption) }
        }, status: :ok
      else
        render json: { success: false, message: "No adoption requests found." }, status: :ok
      end
    end

    def create
      user = User.find_by(id: params[:u_id])
      pet = Pet.find_by(id: params[:p_id])

      if user.nil? || pet.nil?
        return render json: { success: false, message: "Invalid user or pet." }, status: :unprocessable_entity
      end

      adoption_params = params.require(:adopt_pet).permit(:email, :phone_no, :address, :expected_adoption_date)

      adoption = AdoptPet.new(
        user_id: user.id,
        pet_id: pet.id,
        email: adoption_params[:email],
        phone_no: adoption_params[:phone_no],
        address: adoption_params[:address],
        expected_adoption_date: adoption_params[:expected_adoption_date],
        actual_adoption_date: adoption_params[:expected_adoption_date], # Same as expected
      )

      if adoption.save
        render json: { success: true, message: "Adoption request created successfully.", data: adoption }, status: :created
      else
        render json: { success: false, message: "Failed to create adoption request.", errors: adoption.errors.full_messages }, status: :unprocessable_entity
      end
    end

  private
    def adoption_data(adoption)
      {
        id: adoption.id,
        email: adoption.email,
        phone_no: adoption.phone_no,
        address: adoption.address,
        status: adoption.status,
        expected_adoption_date: adoption.expected_adoption_date,
        actual_adoption_date: adoption.actual_adoption_date,
        pet: {
          id: adoption.pet.id,
          age: adoption.pet.age,
          gender: adoption.pet.gender.capitalize,
          temperament: adoption.pet.temperament,
          vaccination_status: adoption.pet.vaccination_status,
          pet_images: adoption.pet.pet_images_urls,
          breed_name: adoption.pet.breed_name,
          category_name: adoption.pet.category_name,
          medical_history: adoption.pet.medical_history,
          recommended_food: adoption.pet.recommended_food,
          common_health_issues: adoption.pet.common_health_issues,
          status: adoption.pet.status
        }
      }
    end
end
