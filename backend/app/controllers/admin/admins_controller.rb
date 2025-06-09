class Admin::AdminsController < Admin::BaseController
  def show
    @admin = current_user
  end

  def edit
    @admin = current_user
  end

  def update
    @admin = current_user

    if @admin.update(admin_params)
      # Handle profile image update
      if params[:user][:profile_image].present?
        @admin.profile_image.purge # Remove existing profile image before uploading a new one
        @admin.profile_image.attach(params[:user][:profile_image])
      end

      redirect_to admin_admins_path, notice: "Profile updated successfully!"
    else
      render :edit
    end
  end

  def remove_profile_image
    @admin = current_user

    if @admin.profile_image.attached?
      @admin.profile_image.purge # Deletes the image from Active Storage
      flash[:notice] = "Profile image removed successfully."
    else
      flash[:alert] = "No profile image found."
    end

    redirect_to edit_admin_admins_path(@admin) # Redirect back to edit page
  end

  private

  def admin_params
    params.require(:user).permit(:first_name, :last_name, :email, :phone_no, :profile_image)
  end
end
