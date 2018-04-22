class PanelController < ApplicationController
  layout 'panel'

  before_action :authenticate_user!

  def index
    redirect_to(current_user.teacher? ? panel_exam_applications_path : panel_student_exams_path)
  end
end
