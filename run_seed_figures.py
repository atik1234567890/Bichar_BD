from app import app
from database.seed import seed_figures

def run_seed():
    with app.app_context():
        seed_figures()

if __name__ == "__main__":
    run_seed()
