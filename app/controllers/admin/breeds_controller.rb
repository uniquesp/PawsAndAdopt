class Admin::BreedsController < Admin::BaseController
  def index
    @breeds = Breed.kept.includes(:category).paginate(page: params[:page], per_page: 5)
  end

  def new
    @breed = Breed.new
    @categories = Category.kept
  end

  def create
    @breed = Breed.new(breed_params)

    if @breed.save
      redirect_to admin_breeds_path, notice: "Breed added successfully."
    else
      @categories = Category.kept
      flash.now[:alert] = "Failed to add breed. Please check the inputs."
      render :new, status: :unprocessable_entity  # Explicitly set 422 status
    end
  end

  def edit
    @breed = Breed.find(params[:id])
    @categories = Category.kept
  end

  def update
    @breed = Breed.find(params[:id])
    @categories = Category.kept
    if @breed.update(breed_params)
      redirect_to admin_breeds_path, notice: "Breed successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end


  def discard
    @breed = Breed.find(params[:id])
    if @breed.discard
      flash[:notice] = "Breed has been deleted."
    else
      flash[:alert] = "Failed to delete breed."
    end
    redirect_to admin_breeds_path
  end



  private

  def set_breed
    @breed = Breed.find(params[:id])
  end

  def breed_params
    params.require(:breed).permit(:breed_name, :category_id)
  end
end
