FactoryBot.define do
  factory :user do
    first_name { "John" }
    last_name { "Doe" }
    email { Faker::Internet.email }
    phone_no { "1234567890" }
    password { "password123" }
    role { :user } # Default role

    trait :admin do
      role { :admin }
    end
  end
end
