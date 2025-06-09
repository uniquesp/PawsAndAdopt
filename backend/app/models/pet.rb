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
class Pet < ApplicationRecord
  include Discard::Model
  belongs_to :breed
  belongs_to :category

  has_many_attached :pet_images

  enum gender: { male: 1, female: 2, unknown: 0 }
  enum status: { available: 0, unavailable: 1 }

  validates :category_id, :breed_id, :age, :age_unit, :gender, :temperament, :status, presence: true
  validates :vaccination_status, inclusion: { in: [ true, false ] }

  # Whitelist searchable attributes for Ransack
  def self.ransackable_attributes(auth_object = nil)
    [ "age", "age_unit", "breed_id", "category_id", "gender", "status", "temperament", "vaccination_status" ]
  end

  # Whitelist associations for Ransack (optional, but recommended)
  def self.ransackable_associations(auth_object = nil)
    [ "category", "breed" ]
  end

  # Method to return multiple image URLs
  def pet_images_urls
    pet_images.map { |image| Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) }
  end

  # Fetch category name
  def category_name
    category&.category_name || "Unknown Category"
  end

  # Fetch breed name
  def breed_name
    breed&.breed_name || "Unknown Breed"
  end
end
