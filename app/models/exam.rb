class Exam < ApplicationRecord
  belongs_to :user
  has_many :exam_questions, dependent: :destroy
  has_many :exam_applications, dependent: :destroy
  has_many :exam_sections, dependent: :destroy

  accepts_nested_attributes_for :exam_questions, allow_destroy: true
  accepts_nested_attributes_for :exam_sections, allow_destroy: true
end
