class Exam < ApplicationRecord
  belongs_to :user
  has_many :exam_questions, dependent: :destroy

  accepts_nested_attributes_for :exam_questions
end
