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
class DonatePet < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
  belongs_to :pet, foreign_key: :pet_id

  enum status: { pending: 0, accepted: 1, rejected: 2 }
  validates :address, :phone_no, :expected_donate_date, :actual_donate_date, :user_id, :pet_id, presence: true
    # Helper method to get category and breed name
    def category_name
      pet.breed.category.category_name if pet&.breed&.category
    end

    def breed_name
      pet.breed.breed_name if pet&.breed
    end

    def pet_gender
      pet.gender == 1 ? "Male" : "Female"
    end
end
