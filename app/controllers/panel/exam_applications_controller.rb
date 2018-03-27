class Panel::ExamApplicationsController < PanelController
  def index
    @exam_applications = ExamApplication.all
  end

  def new
    @groups = Group.all
    @exams = Exam.all

    @new_exam_application = ExamApplication.new
  end

  def edit
    @groups = Group.all
    @exams = Exam.all

    @exam_application = ExamApplication.find(params[:id])
  end

  def show
    @exam_application = ExamApplication.find(params[:id])
  end

  def create
    ExamApplication.create(exam_application_params)

    redirect_to panel_exam_applications_path
  end

  def update
    ExamApplication.find(params[:id]).update(exam_application_params)

    redirect_to panel_exam_applications_path
  end

  def destroy
    ExamApplication.find(params[:id]).destroy

    redirect_to panel_exam_applications_path
  end

  private

  def exam_application_params
    params.require(:exam_application).permit(:exam_id, :group_id)
  end
end
