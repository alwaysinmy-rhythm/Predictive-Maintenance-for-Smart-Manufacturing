from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask Server is Running!"

if __name__ == '_main_':
    app.run(debug=True)