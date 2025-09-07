# routes/face_detection.py
# face_detection.py
# from fastapi import APIRouter, HTTPException 
# from pydantic import BaseModel
# import base64
# from io import BytesIO
# from PIL import Image
# import numpy as np
# import cv2
# from deepface import DeepFace

# # ⬇️ Add these two lines here
# # import tensorflow.compat.v1 as tf
# # tf.disable_v2_behavior()

# router = APIRouter()

# class ImageData(BaseModel):
#     image: str  # base64 encoded image string

# @router.post("/api/detect_emotion")
# async def detect_emotion(data: ImageData):
#     try:
#         # Decode the base64 image
#         header, encoded = data.image.split(",", 1)
#         image_bytes = base64.b64decode(encoded)

#         # Open the image and convert it to numpy array
#         image = Image.open(BytesIO(image_bytes)).convert('RGB')
#         frame = np.array(image)

#         # Analyze with DeepFace
#         analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
#         emotion = analysis[0]['dominant_emotion']

#         # Return the detected emotion
#         return {"emotion": emotion.capitalize()}

#     except Exception as e:
#         print(f"Detection Error: {e}")
#         raise HTTPException(status_code=500, detail="Error in emotion detection")


from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import cv2
from deepface import DeepFace

router = APIRouter()

class ImageData(BaseModel):
    image: str  # base64 encoded image string

@router.post("/api/detect_emotion")
async def detect_emotion(data: ImageData):
    try:
        # Decode the base64 image
        header, encoded = data.image.split(",", 1)
        image_bytes = base64.b64decode(encoded)

        # Open the image and convert it to numpy array
        image = Image.open(BytesIO(image_bytes)).convert('RGB')
        frame = np.array(image)

        # Analyze with DeepFace
        analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        emotion = analysis[0]['dominant_emotion']

        # Return the detected emotion
        return {"emotion": emotion.capitalize()}

    except Exception as e:
        print(f"Detection Error: {e}")
        raise HTTPException(status_code=500, detail="Error in emotion detection")

