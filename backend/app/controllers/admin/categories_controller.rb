class Admin::CategoriesController < Admin::BaseController
  def index
    @categories = Category.kept.paginate(page: params[:page], per_page: 5)
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      redirect_to admin_categories_path, notice: "Category added successfully."
    else
      flash.now[:alert] = "Error: Category could not be added."
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    if @category.update(category_params)
      redirect_to admin_categories_path, notice: "Category updated successfully."
    else
      flash.now[:alert] = "There was an issue updating the category."
      render :edit, status: :unprocessable_entity
    end
  end

  def discard
    @category = Category.find(params[:id])
    if @category.discard
      flash[:notice] = "Category has been deleted."
    else
      flash[:alert] = "Failed to delete category."
    end
    redirect_to admin_categories_path
  end

  private

  def category_params
    params.require(:category).permit(:category_name)
  end
end
