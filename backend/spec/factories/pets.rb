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
FactoryBot.define do
  factory :pet do
    age { rand(1..15) }
    age_unit { %w[days months years].sample }
    gender { [ 0, 1, 2 ].sample }
    temperament { Faker::Lorem.sentence(word_count: 3) }
    vaccination_status { [ true, false ].sample }
    medical_history { Faker::Lorem.paragraph }
    recommended_food { Faker::Food.dish }
    common_health_issues { Faker::Lorem.sentence(word_count: 4) }
    status { [ 0, 1 ].sample }
    association :category
    association :breed

    after(:build) do |pet|
      pet.pet_images.attach(
        io: StringIO.new("fake image content"),
        filename: "test_image.jpg",
        content_type: "image/jpeg"
      )
    end
  end
end
