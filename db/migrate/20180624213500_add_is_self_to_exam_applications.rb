class AddIsSelfToExamApplications < ActiveRecord::Migration[5.1]
  def change
    add_column :exam_applications, :is_self, :boolean, default: false
  end
end
