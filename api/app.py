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

app = Flask(__name__)

def get_credentials():
    os.environ['OPENAI_API_KEY'] = "aaa"

    openai.organization = 'bbbb'
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

    print("chegou aqui")
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
        data = request.get_json()
        
        print(data)

        result = recomenda(data)
    
        #string = chat_gpt(result)


        return result[0]
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/pergunta', methods=['POST'])
def pergunta():
    try:
        data = request.get_json()
        
        print(data)

        string = pergunta_chat_gpt(data)

        return f"<p>{string}</p>"
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
