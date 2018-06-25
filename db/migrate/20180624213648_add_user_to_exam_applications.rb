class AddUserToExamApplications < ActiveRecord::Migration[5.1]
  def change
    add_reference :exam_applications, :user, foreign_key: true
  end
end
