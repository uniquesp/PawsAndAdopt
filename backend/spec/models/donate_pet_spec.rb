# == Schema Information
#
# Table name: donate_pets
#
#  id                   :integer          not null, primary key
#  address              :string           not null
#  phone_no             :string           not null
#  status               :integer          default("pending")
#  expected_donate_date :datetime
#  actual_donate_date   :datetime
#  user_id              :integer          not null
#  pet_id               :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
require 'rails_helper'

RSpec.describe DonatePet, type: :model do
  describe "Associations" do
    it { should belong_to(:user).with_foreign_key(:user_id) }
    it { should belong_to(:pet).with_foreign_key(:pet_id) }
  end

  describe "Validations" do
    it { should validate_presence_of(:address) }
    it { should validate_presence_of(:phone_no) }
    it { should validate_presence_of(:expected_donate_date) }
    it { should validate_presence_of(:actual_donate_date) }
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:pet_id) }
  end

  describe "Enums" do
    it { should define_enum_for(:status).with_values(pending: 0, accepted: 1, rejected: 2) }
  end

  describe "Helper Methods" do
    let(:category) { create(:category, category_name: "Dog") }
    let(:breed) { create(:breed, breed_name: "Labrador", category: category) }
    let(:pet) { create(:pet, gender: 1, breed: breed) }
    let(:user) { create(:user) }
    let(:donate_pet) { create(:donate_pet, user: user, pet: pet) }

    it "returns category name" do
      expect(donate_pet.category_name).to eq("Dog")
    end

    it "returns breed name" do
      expect(donate_pet.breed_name).to eq("Labrador")
    end

    it "returns pet gender as 'Female' when gender is 0" do
      pet.update(gender: 0)
      expect(donate_pet.pet_gender).to eq("Female")
    end
  end
end
