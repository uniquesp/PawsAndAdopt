class Api::V1::PetsController < Api::V1::BaseController
  skip_before_action :authenticate_user, only: [ :index, :show ]  # Public access
  # skip_before_action :authenticate_user_api_request!, only: [ :index ]

  def index
    pets = Pet.kept.includes(:breed, :category)

    if pets.any?
      render json: {
        success: true,
        pets: pets.map { |pet| pet_data(pet) }
      }, status: :ok
    else
      render json: { success: false, message: "No pets found" }, status: :not_found
    end
  rescue StandardError => e
    render json: { success: false, error: e.message }, status: :internal_server_error
  end

  def show
    pet = Pet.kept.includes(:breed, :category).find_by(id: params[:id])

    if pet
      render json: { success: true, pet: pet_data(pet) }, status: :ok
    else
      render json: { success: false, message: "Pet not found" }, status: :not_found
    end
  rescue StandardError => e
    render json: { success: false, error: e.message }, status: :internal_server_error
  end

  private

  private

  def pet_data(pet)
    {
      id: pet.id,
      age: pet.age,
      gender: pet.gender.capitalize,
      temperament: pet.temperament,
      vaccination_status: pet.vaccination_status,
      medical_history: pet.medical_history,
      recommended_food: pet.recommended_food,
      common_health_issues: pet.common_health_issues,
      status: pet.status.capitalize,
      pet_images: pet.pet_images_urls,
      breed_name: pet.breed_name,
      category_name: pet.category_name
    }
  end
end
