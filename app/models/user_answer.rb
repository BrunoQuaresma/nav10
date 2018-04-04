class UserAnswer < ApplicationRecord
  belongs_to :user
  belongs_to :exam_application

  validates :exam_application, uniqueness: { scope: :user }

  def logs
    logs = self[:logs].map{|index, log| log}
    logs.sort_by{|l| l['time']}
  end

  def correctness_points
    points = 0
    questions = exam_application.exam.exam_questions

    answers.each do |answer|
      question_index = answer[0]
      option_index = answer[1]

      points+=1 if questions[question_index.to_i].right_option_index == option_index.to_i
    end

    points
  end

  def correctness_percentage
    total_points = exam_application.exam.exam_questions.count

    correctness_points.to_f / total_points.to_f * 100.0
  end

  def event_duration(log)
    start_time = DateTime.parse(log['time'])
    end_time = DateTime.parse(next_log(log)['time'])

    end_time - start_time
  end

  def next_log log
    log_index = logs.index(log)

    logs[log_index + 1]
  end

  def total_time
    end_time - start_time
  end

  def start_time
    DateTime.parse(logs.find{|log| log['event'] == 'start'}['time'])
  end

  def end_time
    DateTime.parse(logs.find{|log| log['event'] == 'finish'}['time'])
  end
end
