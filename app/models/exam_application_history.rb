class ExamApplicationHistory < ApplicationRecord
  belongs_to :user
  belongs_to :exam
end
