# app/controllers/api/v1/base_controller.rb (optional)
class Api::V1::BaseController < ActionController::API
  include JwtHelper

  # skip_before_action :verify_authenticity_token  # Disable CSRF for API requests
  before_action :authenticate_user


  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  # rescue_from StandardError, with: :internal_server_error

  private

  # def authenticate_user
  #   token = request.headers["Authorization"]&.split(" ")&.last
  #   decoded = decode_token(token)
  #   unless decoded && (@current_user = User.find_by(id: decoded[:user_id]))
  #     render json: { error: "Unauthorized: Please login first" }, status: :unauthorized and return
  #   end
  # end

  def authenticate_user
    token = request.headers["Authorization"]&.split(" ")&.last
    decoded = JwtHelper.decode_token(token)

    unless decoded.present? && decoded["user_id"].present? && (@current_user = User.find_by(id: decoded["user_id"]))
      render json: { error: "Unauthorized: Please login first" }, status: :unauthorized and return
    end
  end


  # Handle Record Not Found (e.g., when querying a non-existent record)
  def record_not_found(exception)
    render json: { success: false, error: "Record not found: #{exception.message}" }, status: :not_found
  end

  # Handle Other Unexpected Errors
  def internal_server_error(exception)
    render json: { success: false, error: "Something went wrong: #{exception.message}" }, status: :internal_server_error
  end
end
