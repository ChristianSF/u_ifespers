import os
import pickle
import openai
import tiktoken
import numpy as np
from sklearn.cluster import KMeans
from flask import Flask, jsonify, request
from openai.embeddings_utils import get_embedding, cosine_similarity


app = Flask(__name__)

def get_credencials():
    pass

def instancia_kmeans():
    with open('model/models/kmeans_profissoes.pkl', 'rb') as arquivo:
        kmeans = pickle.load(arquivo)

    return kmeans

def define_modelo():
    embedding_model = "text-embedding-ada-002"
    embedding_encoding = "cl100k_base"
    max_tokens = 8000
    
    return embedding_model, embedding_encoding, max_tokens


def get_embedding(string):
    embedding_model, embedding_encoding, max_tokens = define_modelo()

    embedding = get_embedding(string, engine=embedding_model)
    
    return embedding

def get_matrix(embedding):
    matrix = np.array(embedding)
    matrix = matrix.reshape(1, -1)

    return matrix

def get_predict(matrix):

    kmeans = instancia_kmeans()

    predict = kmeans.predict(matrix)

    return predict


def recomenda():
    pass


@app.route("/")
def teste():
    return "Hello World!"


@app.route('/descricao', methods=['POST'])
def process_array():
    try:
        data = request.get_json()
        if not isinstance(data, list):
            return jsonify({'error': 'Invalid input. Expected an array.'}), 400
        
        
        return jsonify({'result': teste}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run()