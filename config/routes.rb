Rails.application.routes.draw do
  devise_for :users

  namespace :panel do
    resources :students
    resources :exams
    resources :exam_applications
    resources :groups

    resources :student_exams do
      get '/start', to: 'student_exams#start'
    end
  end
end
