class AssetsController < ApplicationController
    before_filter :authenticate_user!
    
    def index 
    @assets = current_user.assets      
    end
  
    def show 
        @asset = current_user.assets.find(params[:id]) 
    end
  
    def new
        @asset = current_user.assets.new
    end
  
    def create 
        @asset = current_user.assets.new(params[:asset]) 
    
    end
  
    def edit 
        @asset = current_user.assets.find(params[:id]) 
    end
  
    def update 
        @asset = current_user.assets.find(params[:id]) 
         
    end
  
    def destroy 
        @asset = current_user.assets.find(params[:id]) 
    
    end
end
