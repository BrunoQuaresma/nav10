Rails.application.routes.draw do
  devise_for :users

  namespace :panel do
    resources :students
    resources :exams
    resources :groups
    resources :exam_applications

    resources :student_exams do
      get '/start', to: 'student_exams#start'
      post '/history', to: 'student_exams#history'
      get '/history', to: 'student_exams#all_history'
    end
  end
end
