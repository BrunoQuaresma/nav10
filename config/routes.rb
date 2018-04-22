Rails.application.routes.draw do
  devise_for :users

  get '/panel', to: 'panel#index'

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
  end

  root 'panel#index'
end
