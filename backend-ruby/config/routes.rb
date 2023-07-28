Rails.application.routes.draw do
  resources :machines, only: %i[index show update]
  resources :models, only: %i[index show]

  # Setup websocket route
  mount ActionCable.server => '/cable'
end
