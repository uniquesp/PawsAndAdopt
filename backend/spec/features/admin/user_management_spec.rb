require 'rails_helper'
 include AdminAuthHelper

RSpec.feature "User Management", type: :feature do
  # Create an admin user with a factory (using the :admin trait)
  let!(:admin) { create(:user, :admin) }

  # Create users using FactoryBot without specifying attributes explicitly
  let!(:user1) { create(:user) }
  let!(:user2) { create(:user) }
  # let!(:user2) { create(:user, first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com", phone_no: "9876543210") }

  before do
    login_admin
    visit admin_users_path
  end

  # view user list
  scenario "Admin views user list" do
    expect(page).to have_text("Users List")
    expect(page).to have_text(user1.first_name)
    expect(page).to have_text(user2.first_name)
  end

  #  search user
  scenario "Admin uses search box to filter users", js: true do
    fill_in "searchBox", with: "john"
    sleep 1 # Wait for JavaScript to execute

    expect(page).to have_text(user1.first_name)
    expect(page).not_to have_text("Jane")

    fill_in "searchBox", with: user2.last_name
    sleep 1 # Wait for JavaScript to execute

    expect(page).to have_text(user2.last_name)
    expect(page).not_to have_text("Johhhn")
  end


  # view single user profile
  scenario "Admin views a user profile" do
    click_link "View", href: admin_user_path(user1)

    expect(page).to have_current_path(admin_user_path(user1))
    expect(page).to have_text(user1.first_name)
    expect(page).to have_text(user1.last_name)
    expect(page).to have_text(user1.email)
    expect(page).to have_text(user1.phone_no)
  end

  # delete user
  scenario "Admin deletes a user", js: true do
    find("a[title='Delete']", match: :first).click
    accept_alert # Handles the JavaScript confirmation
    expect(page).not_to have_text(user1.email)
  end
end
