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
class Breed < ApplicationRecord
  include Discard::Model
  belongs_to :category
  has_many :pets

  validates :breed_name, presence: true, format: { with: /\A[a-zA-Z\s]+\z/, message: "only allows letters" }
  validates :category_id, presence: true
end
