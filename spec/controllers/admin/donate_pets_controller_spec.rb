require 'rails_helper'

RSpec.describe Admin::DonatePetsController, type: :controller do
  let!(:admin) { create(:user, role: 'admin') }
  let!(:user) { create(:user) }
  let!(:category) { create(:category) }
  let!(:breed) { create(:breed, category: category) }
  let!(:pet) { create(:pet, breed: breed) }
  let!(:donate_pet) { create(:donate_pet, :with_donation_date) }

  before do
    sign_in admin  # Authenticate the admin before making requests
  end

  describe 'GET #index' do
    before { get :index }

    it 'returns a successful response' do
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #show' do
    context 'when the donation request exists' do
      before { get :show, params: { id: donate_pet.id } }

      it 'returns a successful response' do
        expect(response).to have_http_status(:success)
      end
    end

    context 'when the donation request does not exist' do
      before { get :show, params: { id: 9999 } }

      it 'redirects to the index path' do
        expect(response).to redirect_to(admin_donate_pets_path)
      end

      it 'sets a flash error message' do
        expect(flash[:error]).to eq('Donation request not found.')
      end
    end
  end

  describe 'PUT #update' do
    context 'when updating donation date' do
      context 'with valid parameters' do
        before { put :update, params: { id: donate_pet.id, donate_pet: { actual_donate_date: Date.today } } }

        it 'updates the actual_donate_date' do
          expect(donate_pet.reload.actual_donate_date).to eq(Date.today)
        end

        it 'redirects to the index path' do
          expect(response).to redirect_to(admin_donate_pets_path)
        end

        it 'sets a flash notice message' do
          expect(flash[:notice]).to eq('Donation date updated successfully.')
        end
      end

      context 'with invalid parameters' do
        before { put :update, params: { id: donate_pet.id, donate_pet: { actual_donate_date: nil } } }

        it 'does not update the actual_donate_date' do
          expect(donate_pet.reload.actual_donate_date).not_to be_nil
        end

        it 'redirects to the index path' do
          expect(response).to redirect_to(admin_donate_pets_path)
        end

        it 'sets a flash error message' do
          expect(flash[:error]).to eq('Failed to update donation date.')
        end
      end
    end

      context 'with the same status' do
        before { put :update, params: { id: donate_pet.id, donate_pet: { status: donate_pet.status } } }

        it 'does not change the status' do
          expect(donate_pet.reload.status).to eq('pending')
        end

        it 'redirects to the index path' do
          expect(response).to redirect_to(admin_donate_pets_path)
        end

        it 'sets a flash notice message' do
          expect(flash[:notice]).to eq("The status is already #{donate_pet.status.capitalize}.")
        end
      end
    end
  end
