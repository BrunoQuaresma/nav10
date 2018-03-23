class CreateExamApplications < ActiveRecord::Migration[5.1]
  def change
    create_table :exam_applications do |t|
      t.references :exam, foreign_key: true
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end
