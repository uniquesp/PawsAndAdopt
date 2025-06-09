require 'rails_helper'

RSpec.describe Admin::AdoptPetsController, type: :controller do
  let!(:admin) { create(:user, role: 'admin') }
  let!(:user) { create(:user) }
  let!(:pet) { create(:pet) }
  let!(:adopt_pet) { create(:adopt_pet, user: user, pet: pet) }

  before do
    sign_in admin  # Authenticate the admin before making requests
  end

  describe "GET #index" do
    it "renders the index template and includes the adoption request in response" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "renders the show template and includes adopt_pet details" do
      get :show, params: { id: adopt_pet.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "PATCH #update" do
  context "when updating status" do
    it "updates the adopt pet status and sends an email" do
      allow(AdoptPetMailer).to receive_message_chain(:status_update_email, :deliver_now)

      patch :update, params: { id: adopt_pet.id, adopt_pet: { status: "accepted" } }

      expect(response).to have_http_status(:found)  # 302 redirect
      expect(response).to redirect_to(admin_adopt_pets_path)  # Ensure redirection

      adopt_pet.reload  # Reload object from DB
      expect([ "accepted", "pending" ]).to include(adopt_pet.status)
    end
  end

    context "when updating adoption date" do
      it "updates the actual adoption date" do
        patch :update, params: { id: adopt_pet.id, adopt_pet: { actual_adoption_date: Date.today } }, format: :turbo_stream
        expect(response).to have_http_status(:success)
        expect(adopt_pet.reload.actual_adoption_date).to eq(Date.today)
      end
    end
  end
end
