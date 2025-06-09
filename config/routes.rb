# == Route Map
#

Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Devise routes for authentication
  devise_for :users

  # Set root to admin dashboard
  root to: "admin/dashboards#index"

  # Admin routes - Only accessible to authenticated admin users
  authenticate :user, ->(u) { u.admin? } do
  # Admin routes (Restricted to admin users)
  namespace :admin do
    get "dashboard", to: "dashboards#index", as: "dashboard"
    resources :users, only: [ :index, :show ] do
      member do
        patch :discard
      end
    end
    resources :categories, only: [ :index, :new, :create, :edit, :update ] do
      member do
        patch :discard
      end
    end
    resources :breeds, only: [ :index, :new, :create, :edit, :update ] do
      member do
        patch :discard
      end
    end
    resources :pets, only: [ :index, :show, :new, :create, :edit, :update ] do
      member do
        patch :discard
      end
      collection do
        get :get_breeds
      end
        delete "remove_image/:image_id", to: "pets#remove_image", on: :collection
    end
    resources :donate_pets, only: [ :index, :show, :update ] do
    end
    resources :adopt_pets, only: [ :index, :show, :update ] do
    end
    resource :admins, only: [ :show, :update, :edit ] do
      member do
        delete :remove_profile_image
      end
    end
  end
end



  # API routes for user profile management (JSON data)
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post "login", to: "auth#login"  # Login API
      get "dashboard", to: "dashboards#index", as: "dashboard"    # User routes (Restricted to normal users)
      resources :users, only: [ :show, :create, :update, :destroy ]
      resources :categories, only: [ :index ]
      resources :breeds, only: [ :index ]
      resources :pets, only: [ :index, :show ]
      resources :donate_pets, only: [ :create ] do
        collection do
          get :show_donations # Custom route to show all donation requests with images
          post :create_pet       # Step 1: Save pet details first
          post :create_donation  # Step 2: Save donation request
          delete :cancel_donation  # Cancel donation (removes pet)
        end
      end
      resources :adopt_pets, only: [ :create ] do
        collection do
          get :show_adoptions
        end
      end
    end
  end
end
