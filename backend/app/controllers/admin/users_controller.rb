class Admin::UsersController < Admin::BaseController
  def index
    @users = User.kept.where(role: "user").paginate(page: params[:page], per_page: 5)
  end

  def show
  @user = User.find(params[:id])
  end

  def discard
    @user = User.find(params[:id])  # Find the user
    if @user.discard
      flash[:notice] = "User has been deleted."
    else
      flash[:alert] = "Failed to deleted user."
    end
    redirect_to admin_users_path
  end


private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :phone_no, :password, :role, :profile_image)
  end
end
