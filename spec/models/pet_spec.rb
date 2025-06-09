# == Schema Information
#
# Table name: pets
#
#  id                   :integer          not null, primary key
#  age                  :integer
#  gender               :integer          not null
#  temperament          :string
#  vaccination_status   :boolean          default(FALSE)
#  medical_history      :text
#  recommended_food     :text
#  common_health_issues :text
#  status               :integer
#  pet_image_url        :string
#  breed_id             :integer          not null
#  category_id          :integer          not null
#  discarded_at         :datetime
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  age_unit             :string
#
require 'rails_helper'

RSpec.describe Pet, type: :model do
  describe "Associations" do
    it { should belong_to(:breed) }
    it { should belong_to(:category) }
  end

  describe "Validations" do
    it { should validate_presence_of(:category_id) }
    it { should validate_presence_of(:breed_id) }
    it { should validate_presence_of(:age) }
    it { should validate_presence_of(:age_unit) }
    it { should validate_presence_of(:gender) }
    it { should validate_presence_of(:temperament) }
    it { should validate_presence_of(:status) }

    it { should allow_value(true, false).for(:vaccination_status) }
    it { should_not allow_value(nil).for(:vaccination_status) }
  end

  describe "Enums" do
    it { should define_enum_for(:gender).with_values(male: 1, female: 2, unknown: 0) }
    it { should define_enum_for(:status).with_values(available: 0, unavailable: 1) }
  end

  describe "#pet_images_urls" do
    let(:pet) { create(:pet) }

    context "when no images are attached" do
      before do
        pet.pet_images.purge # Ensure no images are attached
      end
      it "returns an empty array" do
        expect(pet.pet_images_urls).to eq([])
      end
    end
  end

  describe "Helper Methods" do
    let(:category) { create(:category, category_name: "Dog") }
    let(:breed) { create(:breed, breed_name: "Labrador") }
    let(:pet) { create(:pet, category: category, breed: breed) }

    it "returns category name" do
      expect(pet.category_name).to eq("Dog")
    end

    it "returns breed name" do
      expect(pet.breed_name).to eq("Labrador")
    end

    it "returns 'Unknown Category' if category is nil" do
      pet.update(category: nil)
      expect(pet.category_name).to eq("Unknown Category")
    end

    it "returns 'Unknown Breed' if breed is nil" do
      pet.update(breed: nil)
      expect(pet.breed_name).to eq("Unknown Breed")
    end
  end
end
