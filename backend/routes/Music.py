# # # backend/routes/music.py
# # import os
# # import requests
# # from fastapi import APIRouter, Query
# # from dotenv import load_dotenv

# # load_dotenv()
# # router = APIRouter()

# # SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
# # SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# # # ✅ Get Spotify Access Token
# # def get_spotify_token():
# #     token_url = "https://accounts.spotify.com/api/token"
# #     if not SPOTIFY_CLIENT_ID or not SPOTIFY_CLIENT_SECRET:
# #         print("[❌ Spotify Token Error]: Missing client ID or secret")
# #         return None
# #     try:
# #         response = requests.post(
# #             token_url,
# #             data={"grant_type": "client_credentials"},
# #             auth=(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
# #             timeout=10
# #         )
# #         response.raise_for_status()
# #         return response.json().get("access_token")
# #     except Exception as e:
# #         print(f"[❌ Spotify Token Error]: {e}")
# #         return None

# # # ✅ GET /api/music
# # @router.get("/api/music")
# # def get_music_by_mood(emotion: str = "happy"):
# #     token = get_spotify_token()
# #     if not token:
# #         return []

# #     headers = {
# #         "Authorization": f"Bearer {token}"
# #     }

# #     # Search Spotify playlists by mood keyword
# #     search_url = "https://api.spotify.com/v1/search"
# #     params = {
# #         "q": f"{emotion} mood india",
# #         "type": "playlist",
# #         "limit": 10
# #     }

# #     try:
# #         res = requests.get(search_url, headers=headers, params=params, timeout=10)
# #         res.raise_for_status()
# #         playlists = res.json().get("playlists", {}).get("items", [])

# #         # Only return necessary info
# #         result = []
# #         for p in playlists:
# #             result.append({
# #                 "id": p.get("id"),
# #                 "name": p.get("name"),
# #                 "image": p.get("images", [{}])[0].get("url"),
# #                 "link": p.get("external_urls", {}).get("spotify")
# #             })

# #         return result

# #     except Exception as e:
# #         print(f"[❌ Spotify API Error]: {e}")
# #         return []




# import os
# import requests
# from fastapi import APIRouter, Query
# from dotenv import load_dotenv

# load_dotenv()
# router = APIRouter()

# SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
# SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# # 🔐 Get Spotify Access Token Safely
# def get_spotify_token():
#     try:
#         token_url = "https://accounts.spotify.com/api/token"
#         response = requests.post(
#             token_url,
#             data={"grant_type": "client_credentials"},
#             auth=(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
#             timeout=10
#         )
#         response.raise_for_status()
#         token_data = response.json()
#         return token_data.get("access_token")
#     except Exception as e:
#         print(f"[❌ Spotify Token Error]: {e}")
#         return None

# # 🎵 Route: /api/music
# @router.get("/api/music")
# def get_music_by_mood(emotion: str = "happy"):
#     token = get_spotify_token()
#     if not token:
#         return []

#     try:
#         headers = {"Authorization": f"Bearer {token}"}
#         search_url = "https://api.spotify.com/v1/search"
#         params = {
#             "q": f"{emotion} mood india",
#             "type": "playlist",
#             "limit": 10
#         }

#         response = requests.get(search_url, headers=headers, params=params, timeout=10)
#         response.raise_for_status()

#         data = response.json()
#         playlists = data.get("playlists", {}).get("items", [])
        
#         # Filter and sanitize playlist items
#         result = []
#         for p in playlists:
#             if not isinstance(p, dict):
#                 continue
#             result.append({
#                 "id": p.get("id", ""),
#                 "name": p.get("name", "Untitled"),
#                 "image": p.get("images", [{}])[0].get("url", ""),
#                 "link": p.get("external_urls", {}).get("spotify", "")
#             })

#         return result

#     except Exception as e:
#         print(f"[❌ Spotify API Error]: {e}")
#         return []



# backend/routes/music.py
import os
import requests
from fastapi import APIRouter, Query
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# ✅ Get Spotify Token
def get_spotify_token():
    try:
        token_url = "https://accounts.spotify.com/api/token"
        response = requests.post(
            token_url,
            data={"grant_type": "client_credentials"},
            auth=(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
            timeout=10
        )
        response.raise_for_status()
        return response.json().get("access_token")
    except Exception as e:
        print(f"[❌ Spotify Token Error]: {e}")
        return None

# ✅ GET /api/music?emotion=happy
@router.get("/api/music")
def get_music_by_emotion(emotion: str = "happy"):
    token = get_spotify_token()
    if not token:
        return []

    headers = {"Authorization": f"Bearer {token}"}
    query = f"{emotion} mood india"

    try:
        search_url = "https://api.spotify.com/v1/search"
        params = {
            "q": query,
            "type": "playlist",
            "limit": 10
        }
        response = requests.get(search_url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        playlists = response.json().get("playlists", {}).get("items", [])

        result = []
        for p in playlists:
            if not isinstance(p, dict):
                continue
            result.append({
                "id": p.get("id", ""),
                "name": p.get("name", "Untitled"),
                "image": p.get("images", [{}])[0].get("url", ""),
                "link": p.get("external_urls", {}).get("spotify", "")
            })

        return result

    except Exception as e:
        print(f"[❌ Spotify API Error]: {e}")
        return []
