class Api::V1::UsersController < Api::V1::BaseController
  # GET /api/v1/users/profile
  skip_before_action :authenticate_user, only: [ :create ]

  def show
    render json: @current_user.as_json(methods: [ :profile_image_url ]), status: :ok
  end

  def create
    @user = User.new(user_params)

    # Attach profile image if provided
    if params[:user][:profile_image].present?
      @user.profile_image.attach(params[:user][:profile_image])
    end

    if @user.save
      render json: {
        status: "SUCCESS",
        message: "Account created successfully",
        data: @user.as_json(methods: [ :profile_image_url ])
      }, status: :created
    else
      render json: {
        status: "ERROR",
        message: "Failed to create Account",
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.update(user_params)
      if params[:profile_image].present?
        @current_user.profile_image.attach(params[:profile_image])
      end

      render json: @current_user.as_json(methods: [ :profile_image_url ]), status: :ok
    else
      render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :phone_no, :password, :password_confirmation, :role, :profile_image)
  end

  def user_response(user)
    {
      id: user.id,   # User ID
      first_name: user.first_name,  # User First Name
      last_name: user.last_name,    # User Last Name
      email: user.email,  # User Email
      phone_no: user.phone_no,  # User Phone Number
      profile_image_url: user.profile_image.attached? ?
        Rails.application.routes.url_helpers.rails_blob_url(user.profile_image, only_path: true) :
        "/default-male-profile-pic.png"  # Profile Image URL
    }
  end
end
