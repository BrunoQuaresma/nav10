module LogsHelper
  def print_log log
    "#{print_log_event_name(log)} \
     #{print_log_subject_name(log)}:".capitalize
  end

  def print_log_question_description log
    question = ExamQuestion.find(log.subject_id)

    question.description
  end

  def print_log_exam_description log
    exam = Exam.find(log.subject_id)

    exam.title
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

    event_names[log.event.to_sym]
  end

  def print_log_subject_name log
    subject_names = {
      'question': 'a questão',
      'exam': 'o exame'
    }

    subject_names[log.subject.to_sym]
  end
end
