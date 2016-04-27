class UsersController < ApplicationController
    before_filter :authenticate_user!
    enable_sync 
  def index
      @fusers = User.all
      @users = User.where.not("id = ?",current_user.id).order("created_at DESC")
      @co = Conversation.involving(current_user).order("created_at DESC")
      @gco = Groupconversation.joins(:users).where(:users => {:id => current_user.id}).order("created_at DESC")
      @assets = Asset.involving(current_user)
  end
end
