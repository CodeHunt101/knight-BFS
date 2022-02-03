class Api::V1::GamesController < ApplicationController
  def new_game
    initial_position_and_target = Game.define_initial_position_and_target
    render json: {
      resp: initial_position_and_target
    }
  end
end