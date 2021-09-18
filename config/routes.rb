Rails.application.routes.draw do
  resources :parties
  resources :videos
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "home", to: "home#index", :as => "home"
  get "get_chunk", to: "videos#data", :as => "get_chunk"
  post "pause_video", to: "videos#pause", :as => "pause_video"
  post "play_video", to: "videos#play", :as => "play_video"
  get "join_party", to: "parties#join", :as => "join_party"
  root "home#index"
end
