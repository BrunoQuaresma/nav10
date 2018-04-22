class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  protected

    def after_sign_in_path_for(user)
      user.student? ? panel_student_exams_path : panel_exam_applications_path
    end
end
