class Asset < ActiveRecord::Base
  belongs_to :user
  attr_accessor :user_id, :uploaded_file
  #validates that the three specific attributes ar not blank
  validates_presence_of  :user_id
  #assests have files
  has_attached_file :uploaded_file,
    :path => "assets/:id/:basename.:extension"
  #with new paperclip files need to be validated
  do_not_validate_attachment_file_type :uploaded_file #test
  
validates_attachment_size :uploaded_file, :less_than => 10.megabytes   
validates_attachment_presence :uploaded_file

    #this gets all the assets of this user
    scope :involving, -> (user) do
        where("assets.user_id =?",user.id)
      end
end
