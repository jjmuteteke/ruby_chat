class AssetsController < ApplicationController
    before_filter :authenticate_user!
    #now we can create a view for all of these
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
        @assets = current_user.assets.new(asset_params)
        @asset.user_id = current_user.id;
        if @asset.save
            flash[:notice] = "Successfully uploaded the file."
            
            redirect_to :action => :index   
        else
            flash[:notice] = "failed uploaded the file."
            render :action => 'new'
        
        end
      
    
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
    
     private
  def asset_params
    params.require(:asset).permit(:user_id, :uploaded_file)
  end
end
