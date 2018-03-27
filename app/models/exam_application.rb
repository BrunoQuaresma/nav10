class ExamApplication < ApplicationRecord
  belongs_to :exam
  belongs_to :group

  def finished_by_user? user
    ExamApplicationHistory.where(user_id: user.id, exam: exam).count > 0
  end
end
