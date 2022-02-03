class Api::V1::GamesController < ApplicationController
  def new_game
    initial_position_and_target = Game.define_initial_position_and_target
    render json: {
      resp: initial_position_and_target
    }
  end

  def shortest_path
    shortest_path = Game.find_shortest_path(params[:game][:initial_position], params[:game][:target_position])
    render json: {
      resp: shortest_path
    }
  end
end