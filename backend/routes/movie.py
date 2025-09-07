# import os
# import requests
# from fastapi import APIRouter, Query
# from dotenv import load_dotenv

# load_dotenv()
# router = APIRouter()

# TMDB_API_KEY = os.getenv("TMDB_API_KEY")
# SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
# SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# TMDB_GENRES = {
#     "action": 35, "adventure": 200, "animation": 800, "comedy": 100,
#     "crime": 80, "documentary": 99, "drama": 200, "family": 10751,
#     "fantasy": 14, "history": 36, "horror": 27, "music": 10402,
#     "mystery": 9648, "romance": 10749, "sci-fi": 878, "thriller": 53
# }

# @router.get("/api/movies")
# def get_movies_by_genre(genre: str = "comedy", language: str = "hi-IN"):
#     try:
#         genre_id = TMDB_GENRES.get(genre.lower(), 35)
#         url = f"https://api.themoviedb.org/3/discover/movie"
#         params = {
#             "api_key": TMDB_API_KEY,
#             "with_genres": genre_id,
#             "language": language,
#             "sort_by": "popularity.desc"
#         }
#         res = requests.get(url, params=params)
#         data = res.json()
#         return data.get("results", []) if isinstance(data.get("results"), list) else []
#     except Exception as e:
#         print(f"TMDB Error: {e}")
#         return []

# import os
# import requests
# from fastapi import APIRouter, Query
# from dotenv import load_dotenv

# load_dotenv()
# router = APIRouter()

# TMDB_API_KEY = os.getenv("TMDB_API_KEY")
# SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
# SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# # 🎯 Genre name to TMDB genre ID mapping
# TMDB_GENRES = {
#     "action": 28, "adventure": 12, "animation": 16, "comedy": 35,
#     "crime": 80, "documentary": 99, "drama": 18, "family": 10751,
#     "fantasy": 14, "history": 36, "horror": 27, "music": 10402,
#     "mystery": 9648, "romance": 10749, "sci-fi": 878, "thriller": 53
# }

# # ✅ Movie + OTT Watch Provider Endpoint
# @router.get("/api/movies")
# def get_movies_by_genre(genre: str = "comedy", language: str = "hi-IN"):
#     try:
#         genre_id = TMDB_GENRES.get(genre.lower(), 35)

#         # 1️⃣ Discover movies by genre
#         discover_url = "https://api.themoviedb.org/3/discover/movie"
#         discover_params = {
#             "api_key": TMDB_API_KEY,
#             "with_genres": genre_id,
#             "language": language,
#             "sort_by": "popularity.desc",
#             "region": "IN"
#         }

#         response = requests.get(discover_url, params=discover_params, timeout=10)
#         movies = response.json().get("results", [])[:8]  # limit results

#         enriched_movies = []

#         # 2️⃣ For each movie, get watch providers
#         for movie in movies:
#             movie_id = movie.get("id")
#             title = movie.get("title", "Untitled")

#             # Fetch watch providers
#             provider_url = f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers"
#             provider_res = requests.get(provider_url, params={"api_key": TMDB_API_KEY}, timeout=5)
#             provider_data = provider_res.json().get("results", {}).get("IN", {})

#             movie["watch_link"] = provider_data.get("link")
#             movie["providers"] = provider_data.get("flatrate", [])  # OTT logos & names
#             enriched_movies.append(movie)

#         return enriched_movies

#     except Exception as e:
#         print(f"[❌ TMDB Movie Error]: {e}")
#         return []




# @router.get("/api/music")
# def get_spotify_playlist(emotion: str = "happy", genre: str = "pop"):
#     token_url = "https://accounts.spotify.com/api/token"
#     auth = (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
#     token_res = requests.post(
#         token_url,
#         data={"grant_type": "client_credentials"},
#         auth=auth
#     )
#     token = token_res.json().get("access_token")

#     search_url = "https://api.spotify.com/v1/search"
#     query = f"{emotion} {genre} india"
#     search_params = {
#         "q": query,
#         "type": "playlist",
#         "limit": 5
#     }
#     headers = {
#         "Authorization": f"Bearer {token}"
#     }
#     res = requests.get(search_url, headers=headers, params=search_params)
#     return res.json().get("playlists", {}).get("items", [])  # ✅ Always return array

import os
import requests
from fastapi import APIRouter, Query
from dotenv import load_dotenv
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

load_dotenv()
router = APIRouter()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")


# Setup retryable session
session = requests.Session()
retries = Retry(total=3, backoff_factor=1, status_forcelist=[429, 502, 503, 504])
adapter = HTTPAdapter(max_retries=retries)
session.mount("https://", adapter)
session.mount("http://", adapter)

# Genre map
TMDB_GENRES = {
    "action": 28, "adventure": 12, "animation": 16, "comedy": 35,
    "crime": 80, "documentary": 99, "drama": 18, "family": 10751,
    "fantasy": 14, "history": 36, "horror": 27, "music": 10402,
    "mystery": 9648, "romance": 10749, "sci-fi": 878, "thriller": 53
}

# ✅ Movies + Watch Providers
@router.get("/api/movies")
def get_movies_by_genre(genre: str = "comedy", language: str = "hi-IN", limit: int = 100):
    try:
        genre_id = TMDB_GENRES.get(genre.lower(), 35)

        # Discover movies
        discover_url = "https://api.themoviedb.org/3/discover/movie"
        discover_params = {
            "api_key": TMDB_API_KEY,
            "with_genres": genre_id,
            "language": language,
            "region": "IN",
            "sort_by": "popularity.desc",
            "page": 1
        }

        response = session.get(discover_url, params=discover_params, timeout=10)
        movies = response.json().get("results", [])[:limit]

        enriched_movies = []
        for movie in movies:
            movie_id = movie.get("id")

            # Watch providers
            provider_url = f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers"
            provider_res = session.get(provider_url, params={"api_key": TMDB_API_KEY}, timeout=5)
            provider_data = provider_res.json().get("results", {}).get("IN", {})

            movie["watch_link"] = provider_data.get("link")
            movie["providers"] = provider_data.get("flatrate", [])
            enriched_movies.append(movie)

        return enriched_movies

    except Exception as e:
        print(f"[❌ TMDB Movie Error]: {e}")
        return []


