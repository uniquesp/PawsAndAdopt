class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  protect_from_forgery with: :null_session, if: :api_request?
  skip_before_action :verify_authenticity_token

  # Use Devise authentication for admin  only
  before_action :authenticate_user!

  # rescue_from Devise::MissingWarden, with: :unauthorized_access
  # rescue_from ActionController::InvalidAuthenticityToken, with: :unauthorized_access

  def after_sign_in_path_for(resource)
    if resource.admin?
      admin_dashboard_path
    else
      sign_out resource  # Log out non-admins immediately
      flash[:alert] = "Unauthorized access!"
      new_user_session_path
    end
  end

  rescue_from CanCan::AccessDenied do |exception|
    render json: { error: "Access denied" }, status: :forbidden
  end

  private


  def skip_csrf_for_api_requests
    if request.format.json? || request.path.start_with?("/api/")
      self.class.skip_forgery_protection
    end
  end
end
