FactoryBot.define do
  factory :donate_pet do
    actual_donate_date { Date.today } # Ensuring a valid date by default
    expected_donate_date { Date.today + 7.days } # Adding an expected donation date
    status { "pending" }
    address { "123 Main Street, City" }
    phone_no { "9876543210" }

    association :user
    association :pet

    trait :with_donation_date do
      actual_donate_date { Date.today }
    end

    trait :without_actual_donate_date do
      actual_donate_date { nil }
    end
  end
end
