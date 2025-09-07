# models/game.py

from database import db

# Connect to the 'games' collection
games_collection = db['games']

def create_game(game_data):
    """
    Inserts a new game document into the collection.
    :param game_data: Dictionary containing game information.
    :return: Insertion result.
    """
    return games_collection.insert_one(game_data)

def get_game(query):
    """
    Finds a game document based on a query.
    :param query: Dictionary to filter games (e.g., {"game_id": "12345"}).
    :return: Game document if found.
    """
    return games_collection.find_one(query)

def update_game(query, new_values):
    """
    Updates a game document.
    :param query: Filter to find the game.
    :param new_values: Dictionary of new values to update.
    :return: Update result.
    """
    return games_collection.update_one(query, {"$set": new_values})

def delete_game(query):
    """
    Deletes a game document.
    :param query: Filter to find the game.
    :return: Deletion result.
    """
    return games_collection.delete_one(query)
