# == Schema Information
#
# Table name: categories
#
#  id            :integer          not null, primary key
#  category_name :string           not null
#  discarded_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Category < ApplicationRecord
  include Discard::Model
  has_many :breeds
  has_many :pets

  validates :category_name, presence: true, format: { with: /\A[a-zA-Z\s]+\z/, message: "only allows letters" }
end
