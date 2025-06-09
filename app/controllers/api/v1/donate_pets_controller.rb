class Api::V1::DonatePetsController < Api::V1::BaseController
  def show_donations
    donate_pets = current_user.donate_pets.includes(pet: [ :breed, :category ])

    if donate_pets.exists?
      render json: {
        success: true,
        data: donate_pets.map { |donation| donation_data(donation) }
      }, status: :ok
    else
      render json: { success: false, message: "No donated pet requests found." }, status: :ok
    end
  rescue StandardError => e
    render json: { success: false, error: e.message }, status: :internal_server_error
  end

  # Step 1: Create a temporary pet entry (only saved if donation is completed)
  def create_pet
    pet = Pet.new(pet_params)

    if pet.save
      render json: { success: true, pet_id: pet.id, message: "Pet information saved. Proceed to the next step." }, status: :created
    else
      render json: { success: false, errors: pet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Step 2: Create donation entry & link the pet (Only if this step is completed, pet remains in DB)
  def create_donation
    @pet = Pet.find_by(id: params[:pet_id])  # Ensure @pet is set

    return render json: { success: false, message: "Pet not found" }, status: :not_found unless @pet

    donate_pet = current_user.donate_pets.new(donate_pet_params.merge(pet_id: @pet.id))

    if donate_pet.save
      render json: { success: true, message: "Donation request submitted successfully!", data: donation_data(donate_pet) }, status: :created
    else
      @pet.destroy if @pet.donate_pet.nil?
      render json: { success: false, errors: donate_pet.errors.full_messages }, status: :unprocessable_entity
    end
  end


  # Handle user canceling process
  def cancel_donation
    if @pet&.destroy
      render json: { success: true, message: "Donation process canceled. Pet record removed." }, status: :ok
    else
      render json: { success: false, message: "Failed to cancel donation or pet not found." }, status: :not_found
    end
  end

  private

  def set_pet
    @pet = Pet.find_by(id: params[:pet_id])
    render json: { success: false, message: "Pet not found" }, status: :not_found unless @pet
  end

  def pet_params
    params.require(:pet).permit(:age, :age_unit, :gender, :temperament, :vaccination_status,
                                :medical_history, :recommended_food, :common_health_issues,
                                :status, :breed_id, :category_id, pet_images: []).tap do |pet_params|
      pet_params[:gender] = pet_params[:gender].to_i if pet_params[:gender].present?
      pet_params[:status] = pet_params[:status].to_i if pet_params[:status].present?
    end
  end

  def donate_pet_params
    params.require(:donate_pet).permit(:address, :phone_no, :status, :expected_donate_date, :actual_donate_date)
  end

  def donation_data(donation)
    {
      id: donation.id,
      address: donation.address,
      phone_no: donation.phone_no,
      status: donation.status,
      expected_donate_date: donation.expected_donate_date,
      actual_donate_date: donation.actual_donate_date,
      pet: {
        id: donation.pet.id,
        age: donation.pet.age,
        gender: donation.pet.gender.capitalize,
        temperament: donation.pet.temperament,
        vaccination_status: donation.pet.vaccination_status,
        medical_history: donation.pet.medical_history,
        recommended_food: donation.pet.recommended_food,
        common_health_issues: donation.pet.common_health_issues,
        status: donation.pet.status,
        pet_images: donation.pet.pet_images_urls, # Fetching Active Storage images
        breed_name: donation.pet.breed_name,
        category_name: donation.pet.category_name
      }
    }
  end
end
