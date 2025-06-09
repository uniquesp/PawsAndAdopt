class DonatePetMailer < ApplicationMailer
  default from: ENV["EMAIL_USERNAME"] # Change as per your requirement

  def donate_status_update_email(donate_pet, previous_status)
    @donate_pet = donate_pet
    @user = @donate_pet.user
    @previous_status = previous_status.capitalize
    @new_status = @donate_pet.status.capitalize
    @pet = @donate_pet.pet
    @breed = @pet.breed
    @category = @pet.category

    # Attach images for embedding in email
    if @pet.pet_images.attached?
      @pet.pet_images.each do |image|
        attachments.inline[image.filename.to_s] = image.download
      end
    end

    mail(to: @user.email, subject: "Your Donation Request Status: #{@new_status}")
  end
end
