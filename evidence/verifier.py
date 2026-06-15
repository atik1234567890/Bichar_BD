from PIL import Image
import numpy as np
import io

# Make these optional imports
try:
    import exifread
except ImportError:
    exifread = None

try:
    from stegano import lsb
except ImportError:
    lsb = None

try:
    import magic
except ImportError:
    magic = None

def extract_metadata(file_path):
    """
    Extracts metadata from Image/PDF files.
    """
    metadata = {}
    if not exifread:
        return {"error": "exifread not available"}
        
    try:
        with open(file_path, 'rb') as f:
            tags = exifread.process_file(f)
            for tag in tags.keys():
                if tag not in ('JPEGThumbnail', 'TIFFThumbnail', 'Filename', 'EXIF MakerNote'):
                    metadata[tag] = str(tags[tag])
    except Exception as e:
        metadata['error'] = str(e)
    return metadata

def check_steganography(file_path):
    """
    Detects if hidden messages exist using LSB steganography.
    """
    if not lsb:
        return {"hidden_data_detected": "N/A"}
        
    try:
        # This is a basic check. Real steganography detection is hard.
        # We try to reveal and if it doesn't fail, there's something there.
        message = lsb.reveal(file_path)
        return {"hidden_data_detected": True, "message_preview": message[:50] if message else ""}
    except:
        return {"hidden_data_detected": False}

def get_file_type(file_path):
    if magic:
        try:
            return magic.from_file(file_path)
        except:
            return "Unknown"
    return "Unknown (libmagic missing)"

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
