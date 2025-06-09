module Admin::DashboardsHelper
  def flash_class(type)
    case type.to_sym
    when :notice
      "alert-success"
    when :alert
      "alert-warning"
    when :error
      "alert-danger"
    else
      "alert-info"
    end
  end
end
