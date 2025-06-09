class Admin::DashboardsController < Admin::BaseController
  def index
    @user_count = User.kept.where(role: "user").count
    @category_count = Category.kept.count
    @breed_count = Breed.kept.count
    @pet_count = Pet.kept.count
  end
end
