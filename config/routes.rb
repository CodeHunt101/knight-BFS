Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      #Games
      get "/new_game", to: "games#new_game"
      post "/shortest_path", to: "games#shortest_path"
      post "/next_possible_positions", to: "games#next_possible_positions"
    end
  end
end
