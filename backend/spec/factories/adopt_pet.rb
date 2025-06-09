FactoryBot.define do
  factory :adopt_pet do
    email { "test@example.com" }
    address { "123 Main Street, City" }
    phone_no { "9876543210" }
    expected_adoption_date { Date.today + 7.days }
    actual_adoption_date { nil }  # Can be overridden in specific test cases
    status { "pending" }

    association :user
    association :pet, factory: :pet  # Ensure pet factory exists

    # Trait for accepted status with actual adoption date
    trait :accepted do
      status { "accepted" }
      actual_adoption_date { Date.today }
    end
  end
end
