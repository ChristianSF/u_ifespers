import unittest
import pandas as pd
from sklearn.cluster import KMeans as SklearnKMeans  # Renaming to avoid conflict
import app

def verificar_tipo_kmeans(objeto):
    return isinstance(objeto, SklearnKMeans)  # Use the renamed class

class TesteTipoKMeans(unittest.TestCase):
    def test_verificar_tipo_kmeans(self):
        kmeans_objeto = app.instancia_kmeans()
        nao_kmeans_objeto = "Não sou um objeto KMeans"

        self.assertTrue(verificar_tipo_kmeans(kmeans_objeto))
        self.assertFalse(verificar_tipo_kmeans(nao_kmeans_objeto))

def verificar_tipo_df(objeto):
    return isinstance(objeto, pd.DataFrame)

class TesteTipoDF(unittest.TestCase):
    def test_verificar_tipo_df(self):
        df_objeto = app.get_data()
        nao_df_objeto = "Não sou um objeto DF"

        self.assertTrue(verificar_tipo_df(df_objeto))
        self.assertFalse(verificar_tipo_df(nao_df_objeto))

if __name__ == '__main__':
    unittest.main()




