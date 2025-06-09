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
require "test_helper"

class DonatePetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
