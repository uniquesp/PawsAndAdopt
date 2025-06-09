require 'rails_helper'

RSpec.describe Admin::BreedsController, type: :controller do
  include Devise::Test::ControllerHelpers

  let!(:admin) { create(:user, :admin) }
  let!(:category) { create(:category) }
  let!(:breeds) { create_list(:breed, 1, category: category) }
  let!(:breed) { create(:breed, category: category) }

  before do
    sign_in admin
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #new" do
    it "returns a success response" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new breed and redirects" do
        expect {
          post :create, params: { breed: attributes_for(:breed, category_id: category.id) }
        }.to change(Breed, :count).by(1)

        expect(response).to redirect_to(admin_breeds_path)
        expect(flash[:notice]).to eq("Breed added successfully.")
      end
    end

    context "with invalid attributes" do
      it "does not create a breed and returns an error status" do
        expect {
          post :create, params: { breed: attributes_for(:breed, breed_name: "", category_id: nil) }
        }.not_to change(Breed, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "GET #edit" do
    it "returns a success response" do
      get :edit, params: { id: breed.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "PUT #update" do
    context "with valid attributes" do
      it "updates the breed and redirects" do
        put :update, params: { id: breed.id, breed: { breed_name: "Updated Name" } }
        breed.reload
        expect(breed.breed_name).to eq("Updated Name")
        expect(response).to redirect_to(admin_breeds_path)
        expect(flash[:notice]).to eq("Breed successfully updated.")
      end
    end

    context "with invalid attributes" do
      it "does not update the breed and returns an error status" do
        put :update, params: { id: breed.id, breed: { breed_name: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(breed.reload.breed_name).not_to eq("")
      end
    end
  end

  describe "DELETE #discard" do
    context "when breed is successfully discarded" do
      it "soft deletes the breed and redirects" do
        delete :discard, params: { id: breed.id }
        expect(response).to redirect_to(admin_breeds_path)
        expect(breed.reload.discarded?).to be true
      end
    end

    context "when discard fails" do
      it "shows an error message" do
        allow_any_instance_of(Breed).to receive(:discard).and_return(false)
        delete :discard, params: { id: breed.id }
        expect(response).to redirect_to(admin_breeds_path)
      end
    end
  end
end
