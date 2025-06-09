# Handles setting Authorization header for login

module UserAuthHelper
  # Creates an invalid token
  def invalid_token
    "invalid.token.here"
  end

  # Sets the Authorization header for the request
  def auth_headers(user)
    token = JwtHelper.encode_token({ user_id: user.id })
    { "Authorization" => "Bearer #{token}" }
  end

  # Parses JSON response
  def json_response
    JSON.parse(response.body)
  end
end
