class Api::V1::CategoriesController < Api::V1::BaseController
  skip_before_action :authenticate_user, only: [ :index ]

  def index
    categories = Category.kept
    if categories.any?
      render json: { success: true, categories: categories }, status: :ok
    else
      raise ActiveRecord::RecordNotFound, "No categories found"
    end
  end
end
