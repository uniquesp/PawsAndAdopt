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
require "test_helper"

class AdoptPetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
