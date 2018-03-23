class Panel::StudentExamsController < PanelController
  def index
    @exam_applications = current_user.exam_applications
  end

  def start
    @exam_application = current_user.exam_applications.find(params[:student_exam_id])
  end
end
