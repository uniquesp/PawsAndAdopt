class Api::V1::AuthController < ApplicationController
  include JwtHelper

  skip_before_action :authenticate_user!, only: [ :login ]

  # POST /api/v1/login
  # def login
  #   user = User.find_by(email: params[:email])
  #   print(user)
  #   if user&.valid_password?(params[:password])
  #     token = encode_token({ user_id: user.id })
  #     render json: { token: token, user: user.as_json(only: [ :id, :email, :first_name, :last_name ]) }, status: :ok
  #   else
  #     render json: { error: "Invalid email or password" }, status: :unauthorized
  #   end
  # end
  #
  def login
    user = User.find_by(email: params[:email])

    if user
      logger.info("User found: #{user.email}")
    else
      logger.warn("User not found with email: #{params[:email]}")
    end

    if user&.valid_password?(params[:password])
      token = encode_token({ user_id: user.id }) # encoding token with user_id
      logger.info("User logged in successfully: #{user.email}")
      render json: {
        token: token,
        user: user.as_json(only: [ :id, :email, :first_name, :last_name, :phone_no ]).merge(
          profile_image_url: user.profile_image_url # Include profile pic URL
        )
      }, status: :ok
    else
      logger.warn("Invalid password attempt for email: #{params[:email]}")
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end
end
