require 'rails_helper'

RSpec.describe Api::V1::AuthController, type: :controller do
  let(:user) { create(:user, password: "password123") }
  let(:valid_credentials) { { email: user.email, password: "password123" } }
  let(:invalid_email) { { email: "wrong@example.com", password: "password123" } }
  let(:invalid_password) { { email: user.email, password: "wrongpass" } }
  let(:empty_credentials) { { email: "", password: "" } }

  describe "POST #login" do
    context "when credentials are valid" do
      it "returns a token and user details" do
        post :login, params: valid_credentials

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)

        expect(json_response).to include("token", "user")
        expect(json_response["user"]).to include("id", "email", "first_name", "last_name", "profile_image_url")
      end
    end

    context "when email does not exist" do
      it "returns an unauthorized error" do
        post :login, params: invalid_email

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)

        expect(json_response).to include("error" => "Invalid email or password")
      end
    end

    context "when password is incorrect" do
      it "returns an unauthorized error" do
        post :login, params: invalid_password

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)

        expect(json_response).to include("error" => "Invalid email or password")
      end
    end

    context "when email and password are empty" do
      it "returns an unauthorized error" do
        post :login, params: empty_credentials

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)

        expect(json_response).to include("error" => "Invalid email or password")
      end
    end
  end
end
