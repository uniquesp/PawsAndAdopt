# == Schema Information
#
# Table name: adopt_pets
#
#  id                     :integer          not null, primary key
#  email                  :string           not null
#  address                :string           not null
#  phone_no               :string           not null
#  expected_adoption_date :datetime
#  actual_adoption_date   :datetime
#  status                 :integer          default("pending")
#  user_id                :integer          not null
#  pet_id                 :integer          not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
require 'rails_helper'

RSpec.describe AdoptPet, type: :model do
  describe "Associations" do
    it { should belong_to(:user).with_foreign_key(:user_id) }
    it { should belong_to(:pet).with_foreign_key(:pet_id) }
  end

  describe "Validations" do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:address) }
    it { should validate_presence_of(:phone_no) }
    it { should validate_presence_of(:expected_adoption_date) }
    it { should validate_presence_of(:status) }
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:pet_id) }

    it { should allow_value("test@example.com").for(:email) }
    it { should_not allow_value("invalid_email").for(:email).with_message("must be a valid email address") }

    it { should validate_length_of(:address).is_at_least(5).is_at_most(255) }

    it { should allow_value("9876543210").for(:phone_no) }
    it { should_not allow_value("98765").for(:phone_no).with_message("must be a valid 10-digit phone number") }
    it { should_not allow_value("abcd123456").for(:phone_no).with_message("must be a valid 10-digit phone number") }

    context "when status is accepted" do
      let(:adopt_pet) { create(:adopt_pet, status: :accepted, actual_adoption_date: nil) }

      it "requires actual_adoption_date on update" do
        adopt_pet.actual_adoption_date = Date.today
        expect(adopt_pet.valid?).to be true
      end

      it "is invalid without actual_adoption_date" do
        adopt_pet.actual_adoption_date = nil
        expect(adopt_pet.valid?).to be false
      end
    end
  end

  describe "Enums" do
    it { should define_enum_for(:status).with_values(pending: 0, accepted: 1, rejected: 2) }
  end

  describe "Helper Methods" do
    let(:category) { create(:category, category_name: "Dog") }
    let(:breed) { create(:breed, breed_name: "Labrador", category: category) }
    let(:pet) { create(:pet, gender: 1, breed: breed) }
    let(:user) { create(:user) }
    let(:adopt_pet) { create(:adopt_pet, user: user, pet: pet) }

    it "returns category name" do
      expect(adopt_pet.category_name).to eq("Dog")
    end

    it "returns breed name" do
      expect(adopt_pet.breed_name).to eq("Labrador")
    end

    it "returns pet gender as 'Female' when gender is 0" do
      pet.update(gender: 0)
      expect(adopt_pet.pet_gender).to eq("Female")
    end
  end
end
