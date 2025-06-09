require 'rails_helper'

RSpec.describe Admin::PetsController, type: :controller do
  include Devise::Test::ControllerHelpers

  let!(:admin) { create(:user, :admin) }
  let!(:category) { create(:category) }
  let!(:breed) { create(:breed, category: category) }
  let!(:pet) { create(:pet, category: category, breed: breed) }

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
      it "creates a new pet and redirects" do
        expect {
          post :create, params: { pet: attributes_for(:pet, category_id: category.id, breed_id: breed.id) }
        }.to change(Pet, :count).by(1)

        expect(response).to redirect_to(admin_pets_path)
        expect(flash[:notice]).to eq("Pet successfully added.")
      end
    end

    context "with invalid attributes" do
      it "does not create a pet and returns an error status" do
        expect {
          post :create, params: { pet: attributes_for(:pet, age: nil, category_id: nil) }
        }.not_to change(Pet, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "GET #edit" do
    it "returns a success response" do
      get :edit, params: { id: pet.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "PUT #update" do
    context "with valid attributes" do
      it "updates the pet and redirects" do
        put :update, params: { id: pet.id, pet: { age: 5 } }
        pet.reload
        expect(pet.age).to eq(5)
        expect(response).to redirect_to(admin_pets_path)
        expect(flash[:notice]).to eq("Pet updated successfully!")
      end
    end

    context "with invalid attributes" do
      it "does not update the pet and returns an error status" do
        put :update, params: { id: pet.id, pet: { age: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(pet.reload.age).not_to be_nil
      end
    end
  end

  describe "DELETE #discard" do
    context "when pet is successfully discarded" do
      it "soft deletes the pet and redirects" do
        delete :discard, params: { id: pet.id }
        expect(response).to redirect_to(admin_pets_path)
        expect(pet.reload.discarded?).to be true
      end
    end

    context "when discard fails" do
      it "shows an error message" do
        allow_any_instance_of(Pet).to receive(:discard).and_return(false)
        delete :discard, params: { id: pet.id }
        expect(response).to redirect_to(admin_pets_path)
      end
    end
  end

  describe "GET #get_breeds" do
    it "returns breeds for a given category" do
      get :get_breeds, params: { category_id: category.id }
      expect(response).to have_http_status(:ok)
    end

    it "returns an error if no breeds found" do
      get :get_breeds, params: { category_id: 99999 }
      expect(response).to have_http_status(:not_found)
    end
  end
end
