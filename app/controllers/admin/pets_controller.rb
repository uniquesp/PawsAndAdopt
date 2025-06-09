class Admin::PetsController < Admin::BaseController
  before_action :set_pet, only: [ :show, :edit, :update, :discard ]

  def index
    load_categories_and_breeds
    @q = Pet.kept.includes(:category, :breed).ransack(params[:q])
    @pets = @q.result.paginate(page: params[:page], per_page: 10)
  end

  def show; end

  def new
    @pet = Pet.new
    load_categories_and_breeds
  end

  def create
    @pet = Pet.new(pet_params)
    if @pet.save
      attach_images(@pet)
      redirect_to admin_pets_path, notice: "Pet successfully added."
    else
      load_categories_and_breeds
      flash.now[:alert] = @pet.errors.full_messages.to_sentence
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    load_categories_and_breeds
  end

  def update
    remove_images if params[:pet][:removed_images].present?
    attach_images(@pet) if params[:pet][:pet_images].present?

    if @pet.update(pet_params.except(:pet_images))
      redirect_to admin_pets_path, notice: "Pet updated successfully!"
    else
      flash.now[:alert] = @pet.errors.full_messages.to_sentence
      render :edit, status: :unprocessable_entity
    end
  end

  def get_breeds
    @breeds = Breed.kept.where(category_id: params[:category_id])
    if @breeds.present?
      render json: @breeds, status: :ok
    else
      render json: { error: "No breeds found for the selected category" }, status: :not_found
    end
  end

  def discard
    if @pet.discard
      redirect_to admin_pets_path, notice: "Pet has been deleted."
    else
      redirect_to admin_pets_path, alert: "Failed to delete pet."
    end
  end


  def remove_image
    image = ActiveStorage::Attachment.find(params[:image_id])
    image.purge
    render json: { success: true }
  end


  private

  def set_pet
    @pet = Pet.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to admin_pets_path, alert: "Pet not found."
  end

  def load_categories_and_breeds
    @categories = Category.kept
    @breeds = Breed.kept
  end

  def pet_params
    params.require(:pet).permit(:age, :age_unit, :gender, :temperament, :vaccination_status,
                                :medical_history, :recommended_food, :common_health_issues,
                                :status, :breed_id, :category_id, pet_images: []).tap do |pet_params|
      pet_params[:gender] = pet_params[:gender].to_i if pet_params[:gender].present?
      pet_params[:status] = pet_params[:status].to_i if pet_params[:status].present?
    end
  end

  def attach_images(pet)
    return unless params[:pet][:pet_images].present?
    pet.pet_images.attach(params[:pet][:pet_images])
  end

  def remove_images
    params[:pet][:removed_images].each do |image_id|
      @pet.pet_images.find(image_id).purge
    end
  end
end
