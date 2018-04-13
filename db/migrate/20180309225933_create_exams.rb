class CreateExams < ActiveRecord::Migration[5.1]
  def change
    create_table :exams do |t|
      t.string :title
      t.integer :duration_in_minutes
      t.integer :number_of_questions
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
