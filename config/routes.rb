Rails.application.routes.draw do
  devise_for :users

  namespace :panel do
    resources :students
    resources :exams
    resources :groups
    resources :exam_applications do
      get 'start'
      get 'question_analysis'

      resources :user_answers
    end

    resources :student_exams do
      post '/history', to: 'student_exams#history'
      get '/history', to: 'student_exams#all_history'
    end

    root 'exam_applications#index'
  end

  root 'panel/exam_applications#index'
end
