class AdoptPetMailer < ApplicationMailer
  default from: ENV["EMAIL_USERNAME"] # Change as per your requirement

  def status_update_email(adopt_pet, previous_status)
    @adopt_pet = adopt_pet
    @user = @adopt_pet.user
    @previous_status = previous_status.capitalize
    @new_status = @adopt_pet.status.capitalize
    @pet = @adopt_pet.pet
    @breed = @pet.breed
    @category = @pet.category

    # Attach images for embedding in email
    if @pet.pet_images.attached?
      @pet.pet_images.each do |image|
        attachments.inline[image.filename.to_s] = image.download
      end
    end

    mail(to: @user.email, subject: "Your Adoption Request Status: #{@new_status}")
  end
end
