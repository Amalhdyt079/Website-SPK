import mysql.connector
from mysql.connector import Error

# Konfigurasi database
dbhost = 'localhost'
dbuser = 'root'
dbpass = ''
dbname = 'pjbl'

# Inisialisasi variabel array alternatif, kriteria, bobot (W), dan matriks keputusan X
alternatif = {}
kriteria = {}
w = {}
X = {}  # Matriks keputusan
min_j = {}  # Nilai minimum per kriteria
max_j = {}  # Nilai maksimum per kriteria
R = {}  # Matriks normalisasi
P = {}  # Preferensi

try:
    connection = mysql.connector.connect(
        host=dbhost,
        user=dbuser,
        password=dbpass,
        database=dbname
    )

    if connection.is_connected():

        cursor = connection.cursor()
        sql_alternatives = 'SELECT * FROM alternatives'
        cursor.execute(sql_alternatives)
        rows_alternatives = cursor.fetchall()

        for row in rows_alternatives:
            alternatif[row[0]] = row[1]  

        print("Alternatif:", alternatif)

        sql_criterias = 'SELECT * FROM criterias'
        cursor.execute(sql_criterias)
        rows_criterias = cursor.fetchall()

        for row in rows_criterias:
            kriteria[row[0]] = [row[1], row[2], row[3]]  
            w[row[0]] = row[2]  

        print("Kriteria yang ditemukan:", kriteria)
        print("Bobot yang ditemukan:", w)

        sql_evaluations = 'SELECT * FROM evaluations'
        cursor.execute(sql_evaluations)
        rows_evaluations = cursor.fetchall()

        for row in rows_evaluations:
            id = row[0]
            id_alternative = row[1]  
            id_criteria = row[2]    
            value = float(row[3])    

            if id_alternative not in X:
                X[id_alternative] = {}
            X[id_alternative][id_criteria] = value

            if id_criteria not in min_j:
                min_j[id_criteria] = value
            else:
                min_j[id_criteria] = min(min_j[id_criteria], value)

            if id_criteria not in max_j:
                max_j[id_criteria] = value
            else:
                max_j[id_criteria] = max(max_j[id_criteria], value)

        for i, x_i in X.items():
            R[i] = {}
            for j, x_ij in x_i.items():
                print(j)
                print(kriteria)
                print(i)

                if kriteria[j][1] == 'cost': 
                    R[i][j] = min_j[j] / x_ij  
                else:
                    R[i][j] = x_ij / max_j[j]  
        print("Matriks Normalisasi (R):", R)

        for i, r_i in R.items():
            P[i] = sum(w[j] * r_ij for j, r_ij in r_i.items())
        print("Preferensi (P):", P)

        sorted_P = dict(sorted(P.items(), key=lambda item: item[1], reverse=True))
        print("Ranking Alternatif berdasarkan Preferensi:")
        for rank, (alternative_id, preference_value) in enumerate(sorted_P.items(), start=1):
            print(f"{rank}. Alternatif ID: {alternative_id} - Nama: {alternatif[alternative_id]} - Preferensi: {preference_value:.4f}")


except Error as e:
    print("Error saat menghubungkan ke database:", e)

finally:
    connection.close()