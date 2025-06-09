require 'rails_helper'

RSpec.describe Admin::UsersController, type: :controller do
  include Devise::Test::ControllerHelpers

  let!(:admin) { create(:user, :admin) } # Creating an admin user
  let!(:users) { create_list(:user, 4) } # Creating 4 normal users
  let!(:user) { create(:user) } #  Define a single user to use in the test cases

  before do
    sign_in admin # Ensure admin is logged in
  end

  describe 'GET #index' do
    it 'returns a list of users' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #show' do
    it 'displays the user profile' do
      get :show, params: { id: user.id } #  user is now defined
      expect(response).to have_http_status(:success)
    end
  end

  describe 'DELETE #discard' do
    it 'soft deletes the user' do
      delete :discard, params: { id: user.id } #  user is now defined
      expect(response).to redirect_to(admin_users_path)
    end

    it 'handles failure to delete user' do
      allow_any_instance_of(User).to receive(:discard).and_return(false)
      delete :discard, params: { id: user.id } #  user is now defined
      expect(response).to redirect_to(admin_users_path)
    end
  end
end
