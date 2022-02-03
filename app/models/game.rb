class Game < ApplicationRecord

  def self.generate_coordinates
    # Returns the coordinates of the Chess board
    x_coordinates = [1, 2, 3, 4, 5, 6, 7, 8]
    y_coordinates = [8, 7, 6, 5, 4, 3, 2, 1]

    all_positions = []

    x_coordinates.each do |x|
      y_coordinates.each do |y|
        all_positions << [x,y]
      end
    end
    all_positions
  end

  def self.generate_random_coordinate
    # Returns a random coordinate form the chess table
    self.generate_coordinates[rand(0..generate_coordinates.size - 1)]
  end

  def self.generate_next_possible_positions(current_position)
    # Return new possible positions of a Knight in a chess game
    min_position_coord = 1
    max_position_coord = 8

    # Possible positions without filtering impossible coordinates
    possible_positions = [
      [current_position[0] + 1, current_position[1] + 2],
      [current_position[0] + 1, current_position[1] - 2],
      [current_position[0] - 1, current_position[1] + 2],
      [current_position[0] - 1, current_position[1] - 2],
      [current_position[0] + 2, current_position[1] + 1],
      [current_position[0] + 2, current_position[1] - 1],
      [current_position[0] - 2, current_position[1] + 1],
      [current_position[0] - 2, current_position[1] - 1]
    ]

    # Filter to show only valid coordinates
    possible_positions.filter do |possible_position|
      possible_position.all? do |coord| 
        coord >= min_position_coord && 
        coord <= max_position_coord
      end
    end
  end

  def self.find_distance_between_two_positions(point_a, point_b)
    Math.sqrt((point_a[0] - point_b[0]) ** 2 + (point_a[1] - point_b[1]) ** 2)
  end
  
  def self.get_distances_from_target(new_next_possible_positions, target_position)
    next_possible_distances = new_next_possible_positions.map do |new_possible_position|
      self.find_distance_between_two_positions(new_possible_position, target_position)
    end
  
    next_possible_distances_not_adjacent_to_target = next_possible_distances.filter do |distance_from_target|
      distance_from_target > Math.sqrt(2)
    end
  
    if next_possible_distances_not_adjacent_to_target.size == 0
      next_possible_distances
    else
      next_possible_distances_not_adjacent_to_target
    end
  end

  def self.find_next_best_position(next_possible_positions, target_position, prev_positions)
=begin
    If the next possible position is the target position, the best position will be the target one. 
    Otherwise it'll look for new possible positions where the knight hasn't been on and go to the 
    one that is closest to the target until it finds it.
=end
    if next_possible_positions.find {|position| position == target_position}
      target_position
    else
      new_next_possible_positions = next_possible_positions.filter do |next_possible_position|
        prev_positions.all?{|prev_position| prev_position != next_possible_position}
      end


      best_distance_from_target = self.get_distances_from_target(new_next_possible_positions, target_position).min

      new_next_possible_positions.find do |new_possible_position|
        self.find_distance_between_two_positions(new_possible_position, target_position) == best_distance_from_target
      end
    end
  end

  def self.define_initial_position_and_target
    # Defines the initial position of the Knight and the target
    knight_position = self.generate_random_coordinate
    target_position = self.generate_random_coordinate

    # Makes sure the initial position and target are not the same
    while knight_position == target_position
      knight_position = self.generate_random_coordinate
      target_position = self.generate_random_coordinate
    end

    {
      knight_position: knight_position,
      target_position: target_position
    }
  end

end

