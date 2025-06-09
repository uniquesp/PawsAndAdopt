require 'rails_helper'

RSpec.feature "User Login", type: :feature do
  let!(:user) { User.create(email: "admin@pawsandadopt.com", password: "Admin@123") }

  scenario "User logs in successfully and sees welcome message" do
    visit new_user_session_path # Devise-generated login path

    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Log in"

    # Expectation: Page should have the welcome message
    expect(page).to have_css("p.text-center.text-muted", text: "Welcome back! Admin")
  end
end
