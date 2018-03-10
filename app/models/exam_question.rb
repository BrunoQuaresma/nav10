class ExamQuestion < ApplicationRecord
  belongs_to :exam
  has_many :exam_question_options, dependent: :destroy

  accepts_nested_attributes_for :exam_question_options, allow_destroy: true 
end
