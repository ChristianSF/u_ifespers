from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def teste():
    return "Hello World!"


if __name__ == '__main__':
    app.run()