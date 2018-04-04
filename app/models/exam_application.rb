class ExamApplication < ApplicationRecord
  belongs_to :exam
  belongs_to :group

  has_many :user_answers, dependent: :destroy

  def finished_by_user? user
    user_answers.where(user_id: user.id).count > 0
  end

  def users_done_count
    user_answers.count
  end

  def medium_time_count_in_seconds
    times = user_answers.map(&:total_time)

    times.size > 0 ? times.sum / times.size : 0
  end

  def medium_correctness_percentage
    percentages = user_answers.map(&:correctness_percentage)

    percentages.size > 0 ? percentages.sum / percentages.size : 0
  end

  def users
    exam_application_histories.group_by(&:user_id).map do |user_histories|
      histories = user_histories[1]
      user = histories[0].user

      start_time = histories.find{|h| h.event == 'start'}.created_at
      end_time = histories.find{|h| h.event == 'finish'}.created_at

      total_time = end_time - start_time

      OpenStruct.new({
        id: user.id,
        name: user.name,
        total_time: total_time
      })
    end
  end
end
