module AdminAuthHelper
  def login_admin
    admin = create(:user, role: "admin")
    sign_in admin
  end
end
