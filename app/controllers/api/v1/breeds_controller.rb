class Api::V1::BreedsController < Api::V1::BaseController
  skip_before_action :authenticate_user, only: [ :index ]

  def index
    if params[:category_id].present?
      breeds = Breed.kept.where(category_id: params[:category_id])
      if breeds.any?
        render json: { success: true, breeds: breeds }, status: :ok
      else
        render json: { success: false, message: "No breeds found for this category" }, status: :not_found
      end
    else
      render json: { success: false, message: "Category ID is required" }, status: :bad_request
    end
  end
end
