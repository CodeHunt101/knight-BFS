class Api::V1::GamesController < ApplicationController
  def new_game
    initial_and_target_positions = Game.define_initial_position_and_target
    next_possible_positions = Game.generate_next_possible_positions(initial_and_target_positions[:knight_position])
    render json: {
      initial_and_target_positions: initial_and_target_positions,
      next_possible_positions: next_possible_positions
    }
  end

  def shortest_path
    shortest_path = Game.find_shortest_path(params[:game][:initial_position], params[:game][:target_position])
    render json: {
      shortest_path: shortest_path
    }
  end

  def next_possible_positions
    next_possible_positions = Game.generate_next_possible_positions(params[:game][:current_position])
    render json: {
      next_possible_positions:  next_possible_positions
    }
  end
end