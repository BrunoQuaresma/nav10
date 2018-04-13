class CreateExamQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :exam_questions do |t|
      t.text :description
      t.integer :right_option_index
      t.integer :difficulty_level
      t.references :exam, foreign_key: true

      t.timestamps
    end
  end
end
