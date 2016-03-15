class Asset < ActiveRecord::Base
  belongs_to :user
  
  #validates that the three specific attributes ar not blank
  validates_presence_of  :user_id
  #assests have files
  has_attached_file :uploaded_file
  
validates_attachment_size :uploaded_file, :less_than => 10.megabytes   
validates_attachment_presence :uploaded_file

    #this gets all the assets of this user
    scope :involving, -> (user) do
        where("assets.user_id =?",user.id)
      end
end
