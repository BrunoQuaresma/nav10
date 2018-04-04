module LogsHelper
  def print_log log
    "#{print_log_event_name(log)} \
     #{print_log_subject_name(log)}".capitalize
  end

  def print_log_question_description log
    question = ExamQuestion.find(log['subject_id'])

    question.description
  end

  def print_log_select_description log
    question_id, option_index = log['subject_id'].split('_')

    question = ExamQuestion.find(question_id)
    option = question.exam_question_options[option_index.to_i]

    "#{option.title} da questão #{question.description}"
  end

  private

  def print_log_event_name log
    event_names = {
      'see': 'visualizou',
      'start': 'começou',
      'go_to': 'foi para',
      'go_to_next': 'foi para a próxima',
      'select': 'selecionou',
      'finish': 'finalizou'
    }

    event_names[log['event'].to_sym]
  end

  def print_log_subject_name log
    subject_names = {
      'question': 'a questão',
      'exam': 'o exame'
    }

    subject_names[log['subject'].to_sym] if log['subject'].present?
  end
end
