import os
import pickle
import openai
import tiktoken
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from flask import Flask, jsonify, request
from openai.embeddings_utils import get_embedding

app = Flask(__name__)

def get_credentials():
    os.environ['OPENAI_API_KEY'] = "aaaa"

    openai.organization = 'bbbbb'
    openai.api_key = os.getenv("OPENAI_API_KEY")

def instancia_kmeans():
    with open('../model/models/kmeans_profissoes.pkl', 'rb') as arquivo:
        kmeans = pickle.load(arquivo)

    return kmeans

def define_modelo():
    embedding_model = "text-embedding-ada-002"

    return embedding_model

def get_custom_embedding(string):
    
    embedding = openai.embeddings_utils.get_embedding(string, engine="text-embedding-ada-002")
 
    return embedding

def get_matrix(embedding):
    matrix = np.array(embedding)
    matrix = matrix.reshape(1, -1)

    return matrix

def get_predict(matrix, kmeans):
    predict = kmeans.predict(matrix)
    return int(predict[0])

def get_data():
    df = pd.read_csv("../data/Model_embedding_Profissoes.csv")
    df = df[['nome_curso', 'descricao', 'cursos', 'Cluster']]

    return df

def recomenda(string):
    get_credentials()

    kmeans = instancia_kmeans()

    print('antes do embedding: ', string)
    embedding = get_custom_embedding(string[0])
    print('depois do embedding')

    matrix = get_matrix(embedding)

    predict = get_predict(matrix, kmeans)

    df = get_data()

    new_df = df[df['Cluster'] == predict]

    return new_df

@app.route('/descricao', methods=['POST'])
def process_array():
    try:
        data = request.get_json()
        
        print(data)

        result = recomenda(data)

        return jsonify({'result': result.to_dict(orient='records')}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
