# == Schema Information
#
# Table name: breeds
#
#  id           :integer          not null, primary key
#  breed_name   :string           not null
#  category_id  :integer          not null
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
FactoryBot.define do
  factory :breed do
    breed_name { "Golden Retriever" } # Generates a random dog breed
    association :category # Links breed to category
  end
end
