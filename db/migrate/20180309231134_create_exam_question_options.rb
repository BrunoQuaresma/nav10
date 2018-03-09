class CreateExamQuestionOptions < ActiveRecord::Migration[5.1]
  def change
    create_table :exam_question_options do |t|
      t.string :title
      t.references :exam_question, foreign_key: true

      t.timestamps
    end
  end
end
