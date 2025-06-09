# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  first_name             :string
#  last_name              :string
#  profile_img_url        :string
#  email                  :string           not null
#  phone_no               :string
#  role                   :integer          default("user")
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  discarded_at           :datetime
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Discard::Model
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, presence: true, uniqueness: true
  enum role: { user: 0, admin: 1 }

    # Attach profile image using Active Storage
    has_one_attached :profile_image
    has_many :pets
    has_many :donate_pets
    has_many :adopt_pets


  # Method to return profile image URL (with default)
  # def profile_image_url
  #   if profile_image.attached?
  #     Rails.application.routes.url_helpers.rails_blob_url(profile_image, only_path: false)
  #   else
  #     default_image =
  #       case role
  #       when "admin"
  #         "default-admin-profile-pic.jpg"
  #       else
  #         "default-user-profile-pic.png"
  #       end

  #     ActionController::Base.helpers.asset_path(default_image)
  #   end
  # end
  #

  def profile_image_url
    if profile_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(profile_image, host: "http://localhost:3000")
    else
      default_image = role == "admin" ? "default-admin-profile-pic.jpg" : "default-user-profile-pic.png"
      ActionController::Base.helpers.asset_path(default_image)
    end
  end
end
