require 'rails_helper'
include UserAuthHelper
RSpec.describe Api::V1::DonatePetsController, type: :request do
  include UserAuthHelper  # Ensures helper methods are available

  describe 'GET #show_donations' do
    let(:user) { create(:user) }
    let!(:donate_pet) { create(:donate_pet, user: user) }

    before do
      get '/api/v1/donate_pets/show_donations', headers: auth_headers(user)
    end

    it 'returns a successful response' do
      expect(response).to have_http_status(:ok)
      expect(json_response['success']).to be true
    end

    it 'returns the correct donation data' do
      expect(json_response['data'].first['id']).to eq(donate_pet.id)
    end

    context 'when no donations exist' do
      before do
        donate_pet.destroy
        get '/api/v1/donate_pets/show_donations', headers: auth_headers(user)
      end
      it 'returns a message indicating no donations found' do
        expect(json_response['message']).to eq('No donated pet requests found.')
      end
    end

    context 'when an error occurs' do
      before do
        allow_any_instance_of(Api::V1::DonatePetsController).to receive(:current_user).and_raise(StandardError.new('Some error'))
        get '/api/v1/donate_pets/show_donations', headers: auth_headers(user)
      end

      it 'returns an internal server error' do
        expect(response).to have_http_status(:internal_server_error)
        expect(json_response['error']).to eq('Some error')
      end
    end
  end


  describe 'POST #create_pet' do
    let(:user) { create(:user) }
    let(:pet_images) do
      [
        fixture_file_upload(Rails.root.join('spec', 'fixtures', 'files', 'test.jpg'), 'image/jpeg')
      ]
    end

    context 'with valid parameters' do
      let(:pet_params) { { pet: attributes_for(:pet).merge(category_id: create(:category).id, breed_id: create(:breed).id) } }

      before do
        post '/api/v1/donate_pets/create_pet', params: pet_params, headers: auth_headers(user)
      end

      it 'creates a new pet' do
        expect(response).to have_http_status(:created)
        expect(json_response['success']).to be true
        expect(json_response['pet_id']).not_to be_nil
      end
    end

    context 'with invalid parameters' do
      let(:invalid_pet_params) {
        { pet: { age: nil } } }

      before do
        post '/api/v1/donate_pets/create_pet', params: invalid_pet_params, headers: auth_headers(user)
      end

      it 'returns an error message' do
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['success']).to be false
        expect(json_response['errors']).not_to be_empty
      end
    end
  end

  describe 'POST #create_donation' do
    let(:user) { create(:user) }
    let(:pet) { create(:pet) }
    let(:donate_pet_params) do
      { donate_pet: attributes_for(:donate_pet).merge(pet_id: pet.id) }
    end

    context 'with valid parameters' do
      before do
        post '/api/v1/donate_pets/create_donation',
        params: { pet_id: pet.id, donate_pet: attributes_for(:donate_pet) },
        headers: auth_headers(user)
      end

      it 'creates a new donation' do
        expect(response).to have_http_status(:created)
        expect(json_response['success']).to be true
        expect(json_response['message']).to eq('Donation request submitted successfully!')
      end
    end

    # context 'with invalid parameters' do
    #   let(:invalid_donate_pet_params) do
    #     { donate_pet: attributes_for(:donate_pet).merge(status: nil, pet_id: pet.id) }
    #   end

    #   before do
    #     post '/api/v1/donate_pets/create_donation',
    #          params: invalid_donate_pet_params,
    #          headers: auth_headers(user)
    #   end

    #   it 'returns an error message' do
    #     expect(response).to have_http_status(:unprocessable_entity)
    #     expect(json_response['success']).to be false
    #     expect(json_response['errors']).not_to be_empty
    #   end
    # end

    context 'when pet not found' do
      before do
        post '/api/v1/donate_pets/create_donation', params: { donate_pet: { pet_id: -1 } }, headers: auth_headers(user)
      end

      it 'returns a not found message' do
        expect(response).to have_http_status(:not_found)
        expect(json_response['message']).to eq('Pet not found')
      end
    end
  end
end
