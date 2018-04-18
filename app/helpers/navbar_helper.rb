module NavbarHelper
  def navbar_links(user)
    links = user.teacher? ? teacher_links : student_links

    links = links.map do |link|
      link[:active] = current_page?(link[:path])
      link
    end

    links
  end

  private

    def student_links
      [
        {
          title: 'Simulados',
          path: panel_exam_applications_path
        }
      ]
    end

    def teacher_links
      [
        {
          title: 'Aplicações',
          path: panel_exam_applications_path
        },
        {
          title: 'Simulados',
          path: panel_exams_path
        },
        {
          title: 'Estudantes',
          path: panel_students_path
        },
        {
          title: 'Turmas',
          path: panel_groups_path
        }
      ]
    end
end
