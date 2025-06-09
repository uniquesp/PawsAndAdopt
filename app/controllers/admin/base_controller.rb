class Admin::BaseController < ApplicationController
  # Use Devise authentication for admin  only
  before_action :authenticate_user!
  before_action :authenticate_admin!

  private

  def authenticate_admin!
    unless current_user&.admin?
      flash[:alert] = "Unauthorized access!"
      redirect_to root_path
    end
  end
end
