class ExamApplication < ApplicationRecord
  belongs_to :exam
  belongs_to :group

  has_many :exam_application_histories

  def finished_by_user? user
    exam_application_histories.where(user_id: user.id).count > 0
  end

  def users_done_count
    exam_application_histories.where(
      event: 'start',
      subject: 'exam'
    ).count
  end

  def medium_time_count_in_seconds
    times = exam_application_histories.group_by(&:user_id).map do |user_histories|
      start_time = user_histories[1].find{|h| h.event == 'start'}.created_at
      end_time = user_histories[1].find{|h| h.event == 'finish'}.created_at

      end_time - start_time
    end

    times.size > 0 ? times.sum / times.size : 0
  end
end
