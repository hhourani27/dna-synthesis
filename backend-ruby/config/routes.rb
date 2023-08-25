Rails.application.routes.draw do
  resources :machines, only: %i[index show update] do
    member do
      post 'actions/synthetize', to: 'machines#synthetize'
    end
  end
  resources :models, only: %i[index show]

  # Setup websocket route
  mount ActionCable.server => '/cable'
end
