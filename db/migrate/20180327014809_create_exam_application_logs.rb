class CreateExamApplicationLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :exam_application_logs do |t|
      t.references :user, foreign_key: true
      t.references :exam_application, foreign_key: true
      t.string :event
      t.string :subject
      t.integer :subject_id

      t.timestamps
    end
  end
end
