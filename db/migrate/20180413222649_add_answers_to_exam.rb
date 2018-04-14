class AddAnswersToExam < ActiveRecord::Migration[5.1]
  def change
    add_column :exams, :answers, :json
  end
end
