# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
      # alias_action :create, :read, :update, :destroy, to: :crud
      if user.admin?
        can :manage, :all
      else
        cannot :manage, :all
      end
  end
end
