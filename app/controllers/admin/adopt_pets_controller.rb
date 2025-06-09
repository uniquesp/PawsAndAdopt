class Admin::AdoptPetsController < Admin::BaseController
  def index
    @adopt_pets = AdoptPet.includes(user: {}, pet: { breed: :category }).all.paginate(page: params[:page], per_page: 10)
  end

  def show
    @adopt_pet = AdoptPet.includes(user: {}, pet: { breed: :category }).find(params[:id])
  end

  def update
    @adopt_pet = AdoptPet.find(params[:id])  # Ensure @adopt_pet is set
    @adopt_pet_index = params[:index].to_i if params[:index].present?

    if params[:adopt_pet][:status].present? && AdoptPet.statuses.keys.include?(params[:adopt_pet][:status])
      update_adopt_pet_status
    elsif params[:adopt_pet]
      update_adopt_pet_date
    else
      flash[:error] = "Invalid update request."
      redirect_to admin_adopt_pets_path
    end
  end

  private


  # Method to update actual adoption date
  def update_adopt_pet_date
    if @adopt_pet.update(adopt_pet_params)
      @index = @adopt_pet.id
      respond_to do |format|
        format.html { redirect_to admin_adopt_pets_path, notice: "Adoption date updated successfully." }
        format.turbo_stream
      end
    else
      flash[:error] = "Failed to update adoption date."
      redirect_to admin_adopt_pets_path
    end
  end

# Method to update pet status
def update_adopt_pet_status
  previous_status = @adopt_pet.status  # Store previous status
  if previous_status != params[:adopt_pet][:status] # Ensure status is changing
    if @adopt_pet.update(adopt_pet_params)
      AdoptPetMailer.status_update_email(@adopt_pet, previous_status).deliver_now  # Send email with old and new status
      respond_to do |format|
        format.html { redirect_to admin_adopt_pets_path, notice: "Adopt request status updated to #{params[:adopt_pet][:status]} successfully." }
        format.turbo_stream
      end
    else
      flash[:error] = "Status update failed."
      redirect_to admin_adopt_pets_path
    end
  else
    flash[:notice] = "The status is already #{params[:adopt_pet][:status].capitalize}."
    redirect_to admin_adopt_pets_path
  end
end


  def set_adopt_pet
    @adopt_pet = AdoptPet.find_by(id: params[:id])
    unless @adopt_pet
      flash[:error] = "Adoption request not found."
      redirect_to admin_adopt_pets_path
    end
  end

  def adopt_pet_params
    params.require(:adopt_pet).permit(:actual_adoption_date, :status)
  end
end
