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

  def self.find_shortest_path(initial_position, target_position)
    # Implemented Breath First Search Algorithm
    
    queue = []
    visited = []
    queue << initial_position
    visited << initial_position
    edge_to = {}

    #While queue is not empty, current_position will take the first position of the knight.
    #Then it will iterate the next possible positions, skipping those already visited, and
    #adding each possible position to the queue and keeping track of each parent (prev position) through 
    #the edge_to hash.

    while queue.any?
      current_position = queue.shift
      self.generate_next_possible_positions(current_position).each do |next_possible_position|
        next if visited.include?(next_possible_position)
        queue << next_possible_position
        visited << next_possible_position
        edge_to[next_possible_position] = current_position
      end
      
    end
    
    
    # The shortest distance is calculated here. 
    # The path will be adding all positions that comes from parents, starting from the target position until the initial position (parent of all).
    
    path = []

    while target_position != initial_position
      path.unshift(target_position)
      target_position = edge_to[target_position]
    end

    path
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

