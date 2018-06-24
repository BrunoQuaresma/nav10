class CreateExamSections < ActiveRecord::Migration[5.1]
  def change
    create_table :exam_sections do |t|
      t.references :exam, foreign_key: true
      t.string :name
      t.integer :start_at
      t.integer :end_at

      t.timestamps
    end
  end
end
