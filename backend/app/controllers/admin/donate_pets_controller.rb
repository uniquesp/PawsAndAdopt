class Admin::DonatePetsController < Admin::BaseController
  before_action :set_donate_pet, only: [ :update ] # Ensure this is called before update

  def index
    @donate_pets = DonatePet.includes(user: {}, pet: { breed: :category }).all.paginate(page: params[:page], per_page: 10)
  end

  def show
    @donate_pet = DonatePet.includes(user: {}, pet: { breed: :category }).find_by(id: params[:id])

    if @donate_pet.nil?
      flash[:error] = "Donation request not found."
      redirect_to admin_donate_pets_path
    end
  end


  def update
    @donate_pet = DonatePet.find(params[:id])  # Ensure @donate_pet is set
    @donate_pet_index = params[:index].to_i if params[:index].present?

    if params[:donate_pet][:status].present? && DonatePet.statuses.keys.include?(params[:donate_pet][:status])
      update_donate_pet_status
    elsif params[:donate_pet]
      update_donate_pet_date
    else
      flash[:error] = "Invalid update request."
      redirect_to admin_donate_pets_path
    end
  end

  private


  # Method to update actual donation date
  def update_donate_pet_date
    if @donate_pet.update(donate_pet_params)
      @index = @donate_pet.id
      respond_to do |format|
        format.html { redirect_to admin_donate_pets_path, notice: "Donation date updated successfully." }
        format.turbo_stream
      end
    else
      flash[:error] = "Failed to update donation date."
      redirect_to admin_donate_pets_path
    end
  end

# Method to update pet status
def update_donate_pet_status
  previous_status = @donate_pet.status  # Store previous status
  if previous_status != params[:donate_pet][:status] # Ensure status is changing
    if @donate_pet.update(donate_pet_params)
      DonatePetMailer.donate_status_update_email(@donate_pet, previous_status).deliver_now  # Send email with old and new status
      respond_to do |format|
        format.html { redirect_to admin_donate_pets_path, notice: "Donate request status updated to #{params[:donate_pet][:status]} successfully." }
        format.turbo_stream
      end
    else
      flash[:error] = "Status update failed."
      redirect_to admin_donate_pets_path
    end
  else
    flash[:notice] = "The status is already #{params[:donate_pet][:status].capitalize}."
    redirect_to admin_donate_pets_path
  end
end


  def set_donate_pet
    @donate_pet = DonatePet.find_by(id: params[:id])
    unless @donate_pet
      flash[:error] = "Donation request not found."
      redirect_to admin_donate_pets_path
    end
  end

  def donate_pet_params
    params.require(:donate_pet).permit(:actual_donate_date, :status)
  end
end
