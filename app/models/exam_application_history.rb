class ExamApplicationHistory < ApplicationRecord
  scope :next, lambda {|id| where("id > ?",id).order("id ASC") }

  belongs_to :user
  belongs_to :exam_application

  def event_duration_in_seconds
    next_history = ExamApplicationHistory.next(self.id).first

    next_history.created_at - self.created_at
  end
end
