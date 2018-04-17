class AddStartQuestionNumberToExams < ActiveRecord::Migration[5.1]
  def change
    add_column :exams, :start_question_number, :integer
  end
end
