class Asset < ActiveRecord::Base
  belongs_to :user
  
  #validates that the three specific attributes ar not blank
  validates_presence_of  :user_id
end
