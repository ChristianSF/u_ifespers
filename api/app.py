import os
import json
import pickle
import openai
import tiktoken
import numpy as np
import pandas as pd
import requests as re
from sklearn.cluster import KMeans
from flask import Flask, jsonify, request
from openai.embeddings_utils import get_embedding
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:4200")


def get_credentials():
    os.environ['OPENAI_API_KEY'] = "apikey"
    openai.organization = 'org'
    openai.api_key = os.getenv("OPENAI_API_KEY")

def instancia_kmeans():
    with open('../model/models/kmeans_profissoes.pkl', 'rb') as arquivo:
        kmeans = pickle.load(arquivo)

    return kmeans

def pergunta_chat_gpt(pergunta):

    get_credentials()

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"{pergunta}"}
        ]
    )


    return completion.choices[0].message.content

def chat_gpt(descricao):

    get_credentials()

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"Baseado nessa profissao: {descricao}, retorne nomes de cursos e/ou graducacoes para poder alcancar isso."}
        ]
    )

    return completion.choices[0].message.content

def get_custom_embedding(string):
    
    embedding_model = "text-embedding-ada-002"

    embedding = openai.embeddings_utils.get_embedding(string, engine=embedding_model)
 
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

    embedding = get_custom_embedding(string[0])

    matrix = get_matrix(embedding)

    predict = get_predict(matrix, kmeans)

    df = get_data()

    new_df = df[df['Cluster'] == predict]

    return new_df['nome_curso'].values

@app.route('/profession', methods=['POST'])
def process_array():
    try:
        description = request.get_json()
        profession = recomenda(description)[0]

        return jsonify(profession)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/courses', methods=['GET'])
def getCourses():
    professionName = request.args.get('profession')
    try:
        dataFrame = get_data()
        coursesArrayRow = dataFrame[dataFrame['nome_curso'] == professionName]
        coursesArray = coursesArrayRow['cursos'].values
        return jsonify(list(coursesArray))
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/pergunta', methods=['POST'])
def pergunta():
    try:
        data = request.get_json()
        
        string = pergunta_chat_gpt(data)

        return f"<p>{string}</p>"
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
