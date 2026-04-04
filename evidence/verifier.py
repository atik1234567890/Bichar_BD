from PIL import Image
import numpy as np
import io

def run_ela(image_path, quality=90):
    original = Image.open(image_path).convert('RGB')
    buffer = io.BytesIO()
    original.save(buffer, 'JPEG', quality=quality)
    buffer.seek(0)
    recompressed = Image.open(buffer).convert('RGB')
    ela_array = np.abs(
        np.array(original, dtype=float) - 
        np.array(recompressed, dtype=float)
    )
    mean_diff = ela_array.mean()
    is_tampered = mean_diff > 15.0
    confidence = min(100, int((mean_diff / 25.0) * 100))
    return {
        "is_tampered": is_tampered,
        "confidence_score": confidence,
        "mean_error": round(mean_diff, 2)
    }
