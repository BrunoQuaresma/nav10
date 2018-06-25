class ExamApplication < ApplicationRecord
  belongs_to :exam
  belongs_to :group, optional: true
  belongs_to :user, optional: true

  has_many :user_answers, dependent: :destroy

  def finished_by_user? user
    user_answers.where(user_id: user.id).count > 0
  end

  def users_done_count
    user_answers.count
  end

  def count_option_choices_percentage(question_index, option_index)
    count_option_choices(question_index, option_index).to_f / user_answers.count * 100.0 if user_answers.count > 0
  end

  def count_option_choices(question_index, option_index)
    user_answers.map do |user_answer|
      user_answer.answers.try(:select) do |question_i, option_i|
        option_i.to_i == option_index && question_i.to_i == question_index
      end.try(:count) || 0
    end.sum
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
