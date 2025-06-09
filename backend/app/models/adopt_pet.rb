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
class AdoptPet < ApplicationRecord
  belongs_to :pet, foreign_key: :pet_id
  belongs_to :user, foreign_key: :user_id

  # Presence validations in one line
  validates :email, :address, :phone_no, :expected_adoption_date, :status, :user_id, :pet_id, presence: true
  # Email format validation
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email address" }
  # Address length validation
  validates :address, length: { minimum: 5, maximum: 255 }
  # Phone number format validation
  validates :phone_no, format: { with: /\A\d{10}\z/, message: "must be a valid 10-digit phone number" }
  # Actual adoption date required only when status is accepted
  validates :actual_adoption_date, presence: true, if: -> { accepted? }, on: :update

  enum status: { pending: 0, accepted: 1, rejected: 2 }

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
