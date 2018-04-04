class CreateUserAnswers < ActiveRecord::Migration[5.1]
  def change
    create_table :user_answers do |t|
      t.references :user, foreign_key: true
      t.references :exam_application, foreign_key: true
      t.json :logs
      t.json :answers

      t.timestamps
    end
  end
end
