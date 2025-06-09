require 'rails_helper'

RSpec.describe Admin::CategoriesController, type: :controller do
  include Devise::Test::ControllerHelpers

  let!(:admin) { create(:user, :admin) }
  let!(:categories) { create_list(:category, 1) }
  let!(:category) { create(:category) }

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
      it "creates a new category and redirects" do
        expect {
          post :create, params: { category: attributes_for(:category) }
        }.to change(Category, :count).by(1)

        expect(response).to redirect_to(admin_categories_path)
        expect(flash[:notice]).to eq("Category added successfully.")
      end
    end

    context "with invalid attributes" do
      it "does not create a category and returns an error status" do
        expect {
          post :create, params: { category: attributes_for(:category, category_name: nil) }
        }.not_to change(Category, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(controller.instance_variable_get(:@category)).to be_a_new(Category)
      end
    end
  end

  describe "GET #edit" do
    it "returns a success response" do
      get :edit, params: { id: category.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "PUT #update" do
    context "with valid attributes" do
      it "updates the category and redirects" do
        put :update, params: { id: category.id, category: { category_name: "Updated Name" } }
        category.reload
        expect(category.category_name).to eq("Updated Name")
        expect(response).to redirect_to(admin_categories_path)
        expect(flash[:notice]).to eq("Category updated successfully.")
      end
    end

    context "with invalid attributes" do
      it "does not update the category and returns an error status" do
        put :update, params: { id: category.id, category: { category_name: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(category.reload.category_name).not_to be_nil # Ensures it was not updated
      end
    end
  end

  describe "DELETE #discard" do
    context "when category is successfully discarded" do
      it "soft deletes the category and redirects" do
        delete :discard, params: { id: category.id }
        expect(response).to redirect_to(admin_categories_path)
        expect(category.reload.discarded?).to be true
      end
    end

    context "when discard fails" do
      it "shows an error message" do
        allow_any_instance_of(Category).to receive(:discard).and_return(false)
        delete :discard, params: { id: category.id }
        expect(response).to redirect_to(admin_categories_path)
      end
    end
  end
end
