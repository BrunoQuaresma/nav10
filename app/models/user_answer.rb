class UserAnswer < ApplicationRecord
  belongs_to :user
  belongs_to :exam_application

  validates :exam_application, uniqueness: { scope: :user }

  def logs
    logs = self[:logs].map{|index, log| log}
    logs.sort_by{|l| l['time']}
  end

  def total_question_time(question_index)
    logs
      .select{|l| l['event'] == 'go_to' && l['index'] == question_index.to_s}
      .map{|l| event_duration(l)}
      .sum
  end

  def correctness_points
    points = 0
    exam_answers = exam_application.exam.answers

    return 0 if exam_answers.nil?

    answers.each do |answer|
      question_index = answer[0]
      option_index = answer[1]

      if exam_answers[question_index] == option_index
        points += 1
      end
    end

    points
  end

  def correctness_percentage
    total_points = exam_application.exam.number_of_questions

    correctness_points.to_f / total_points.to_f * 100.0
  end

  def event_duration(log)
    start_time = DateTime.parse(log['time'])
    end_time = DateTime.parse(next_log(log)['time'])

    (end_time.to_i - start_time.to_i)
  end

  def next_log log
    log_index = logs.index(log)

    logs[log_index + 1]
  end

  def total_time
    end_time.to_i - start_time.to_i
  end

  def start_time
    DateTime.parse(logs.find{|log| log['event'] == 'start'}['time'])
  end

  def end_time
    DateTime.parse(logs.find{|log| log['event'] == 'finish'}['time'])
  end
end
