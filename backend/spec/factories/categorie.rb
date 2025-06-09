FactoryBot.define do
  factory :category do
    category_name { Faker::Creature::Animal.name } # Generates pet-related category names

    trait :discarded do
      discarded_at { Time.current }
    end
  end
end
