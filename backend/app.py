from flask import Flask
from flask_cors import CORS

from routes.tasksbp import tasks_bp

class FlaskApp():
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)

        self.app.register_blueprint(tasks_bp)
    

    def run(self, **kwargs):
        self.app.run(**kwargs)
        

app = FlaskApp().app

if __name__ == "__main__":
    app.run(debug=True)