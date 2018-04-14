module LogsHelper
  def print_log log
    "#{print_log_event_name(log)} \
     #{print_log_subject_name(log)}".capitalize
  end

  def print_log_question_description log
    log['index'].to_i + 1
  end

  def print_log_select_description log
    question_index, option_index = log['index'].split('_')

    "#{letter_option(option_index.to_i)} da questão #{question_index.to_i + 1}"
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
      'exam': 'o exame',
      'showQuestions': 'as questões'
    }

    subject_names[log['subject'].to_sym] if log['subject'].present?
  end
end
