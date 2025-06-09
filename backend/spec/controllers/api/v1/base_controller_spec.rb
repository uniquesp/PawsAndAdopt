require 'rails_helper'

RSpec.describe Api::V1::BaseController, type: :controller do
  controller(Api::V1::BaseController) do
    def index
      render json: { message: "Success" }, status: :ok
    end
  end

  let(:user) { create(:user) }
  let(:valid_token) { JwtHelper.encode_token({ user_id: user.id }) }
  let(:invalid_token) { "invalid.token.here" }

  before do
    request.headers["Authorization"] = "Bearer #{invalid_token}"
    allow(JwtHelper).to receive(:decode_token).with(invalid_token).and_return(nil)  # Ensure nil is returned
    get :index
  end
  #  Helper method to parse JSON responses
  def json_response
    JSON.parse(response.body)
  end

  describe "#authenticate_user" do
    context "when a valid token is provided" do
      before do
        auth_headers(user)
        allow(JwtHelper).to receive(:decode_token).and_return({ "user_id" => user.id })
        get :index
      end

      it "authenticates the user successfully" do
        expect(response).to have_http_status(:ok)
        expect(json_response["message"]).to eq("Success")
      end
    end

    context "when an invalid token is provided" do
      before do
        invalid_token
        allow(JwtHelper).to receive(:decode_token).and_return(nil)
        get :index
      end

      it "returns an unauthorized error" do
        expect(response).to have_http_status(:unauthorized)
        expect(json_response["error"]).to eq("Unauthorized: Please login first")
      end
    end

    context "when no token is provided" do
      before { get :index }

      it "returns an unauthorized error" do
        expect(response).to have_http_status(:unauthorized)
        expect(json_response["error"]).to eq("Unauthorized: Please login first")
      end
    end
  end

  describe "#record_not_found" do
    controller(Api::V1::BaseController) do
      def show
        raise ActiveRecord::RecordNotFound, "Couldn't find record"
      end
    end

    # it "returns a not found error when a record is missing" do
    #   get :show, params: { id: 999 }
    #   expect(response).to have_http_status(:not_found)
    #   expect(json_response["error"]).to eq("Record not found: Couldn't find record")
    # end
  end

  describe "#internal_server_error" do
    controller(Api::V1::BaseController) do
      def error_action
        raise StandardError, "Something unexpected happened"
      end
    end

    #  Fix: Add routing for the error action
    before do
      @routes = ActionDispatch::Routing::RouteSet.new
      @routes.draw { get "error_action" => "anonymous#error_action" }
    end

    # it "returns an internal server error" do
    #   get :error_action
    #   expect(response).to have_http_status(:internal_server_error)
    #   expect(json_response["error"]).to eq("Something went wrong: Something unexpected happened")
    # end
  end
end
