module ApplicationHelper
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


  def pagination_links(collection)
    content_tag(:div, class: "d-flex justify-content-center mt-3") do
      content_tag(:nav, aria: { label: "Page navigation" }) do
        content_tag(:ul, class: "pagination pagination-sm") do
          previous_link = if collection.previous_page
                            link_to("&laquo;".html_safe, url_for(page: collection.previous_page), class: "page-link", aria: { label: "Previous" })
          else
                            content_tag(:span, "&laquo;".html_safe, class: "page-link")
          end

          next_link = if collection.next_page
                        link_to("&raquo;".html_safe, url_for(page: collection.next_page), class: "page-link", aria: { label: "Next" })
          else
                        content_tag(:span, "&raquo;".html_safe, class: "page-link")
          end

          pagination_links = (1..collection.total_pages).map do |page_number|
            active_style = page_number == collection.current_page ? "background-color: rgb(105, 108, 255); color: white; border-color: rgb(105, 108, 255);" : ""
            content_tag(:li, class: "page-item #{'active' if page_number == collection.current_page}") do
              link_to page_number, url_for(page: page_number), class: "page-link", style: active_style
            end
          end

          content_tag(:li, previous_link, class: "page-item #{'disabled' unless collection.previous_page}") +
          safe_join(pagination_links) +
          content_tag(:li, next_link, class: "page-item #{'disabled' unless collection.next_page}")
        end
      end
    end
  end


  def breadcrumbs
    content_tag(:nav, aria: { label: "breadcrumb" }) do
      content_tag(:ol, class: "breadcrumb p-2 rounded bg-light") do
        links = []
        links << breadcrumb_item("Dashboard", admin_dashboard_path)

        pages = {
          "users" => "Users",
          "categories" => "Categories",
          "breeds" => "Breeds",
          "pets" => "Pets",
          "donate_pets" => "Donate Pet Requests",
          "adopt_pets" => "Adopt Pet Requests"
        }

        links << breadcrumb_item(pages[controller_name], send("admin_#{controller_name}_path")) if pages[controller_name]

        links << content_tag(:li, action_name.humanize, class: "breadcrumb-item h5 mb-0 active", style: "color: rgb(105, 108, 255); text-decoration:none", aria: { current: "page" }) if action_name != "index"

        links.join.html_safe
      end
    end
  end

  private

  def breadcrumb_item(name, path)
    content_tag(:li, link_to(name, path, class: "h5 mb-0 text-decoration-none", style: "color: rgb(105, 108, 255);"), class: "breadcrumb-item")
  end
end
