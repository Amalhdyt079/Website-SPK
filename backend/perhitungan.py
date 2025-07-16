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
    # Koneksi ke database server
    connection = mysql.connector.connect(
        host=dbhost,
        user=dbuser,
        password=dbpass,
        database=dbname
    )

    if connection.is_connected():

        # Membuat cursor untuk mengeksekusi query
        cursor = connection.cursor()

        # Eksekusi SQL query untuk mengambil data dari tabel alternatives
        sql_alternatives = 'SELECT * FROM alternatives'
        cursor.execute(sql_alternatives)

        # Fetch all rows from the executed query for alternatives
        rows_alternatives = cursor.fetchall()

        # Iterasi melalui baris dan populasi dictionary alternatif
        for row in rows_alternatives:
            alternatif[row[0]] = row[1]  # Asumsi id_alternative ada di index 0 dan name di index 1

        # Menampilkan hasil alternatif
        print("Alternatif:", alternatif)

        # Eksekusi SQL query untuk mengambil data dari tabel saw_criterias
        sql_criterias = 'SELECT * FROM criterias'
        cursor.execute(sql_criterias)

        # Fetch all rows from the executed query for criterias
        rows_criterias = cursor.fetchall()

        # Iterasi melalui baris dan populasi dictionary kriteria dan bobot
        for row in rows_criterias:
            kriteria[row[0]] = [row[1], row[2], row[3]]  # Asumsi id_criteria ada di index 0, name di index 1, attribute di index 2, weight di index 3
            w[row[0]] = row[2]  # Asumsi weight ada di index 3

        # Menampilkan hasil kriteria dan bobot
        print("Kriteria yang ditemukan:", kriteria)
        print("Bobot yang ditemukan:", w)

        # Eksekusi SQL query untuk mengambil data dari tabel saw_evalutions
        sql_evalutions = 'SELECT * FROM evaluations'
        cursor.execute(sql_evalutions)

        # Fetch all rows from the executed query for evaluations
        rows_evalutions = cursor.fetchall()

        # Iterasi melalui baris dan populasi matriks keputusan X serta nilai minimum/maksimum per kriteria
        for row in rows_evalutions:
            id_alternative = row[0]  # Asumsi id_alternative ada di index 0
            id_criteria = row[1]      # Asumsi id_criteria ada di index 1
            value = float(row[2])     # Asumsi value ada di index 2

            # Populasi matriks keputusan X
            if id_alternative not in X:
                X[id_alternative] = {}
            X[id_alternative][id_criteria] = value

            # Hitung nilai minimum per kriteria
            if id_criteria not in min_j:
                min_j[id_criteria] = value
            else:
                min_j[id_criteria] = min(min_j[id_criteria], value)

            # Hitung nilai maksimum per kriteria
            if id_criteria not in max_j:
                max_j[id_criteria] = value
            else:
                max_j[id_criteria] = max(max_j[id_criteria], value)

        # Normalisasi matriks keputusan X menjadi R
        for i, x_i in X.items():
            R[i] = {}
            for j, x_ij in x_i.items():
                if kriteria[j][1] == 'cost':
                    R[i][j] = min_j[j] / x_ij  # Normalisasi untuk cost (biaya)
                else:
                    R[i][j] = x_ij / max_j[j]   # Normalisasi untuk benefit (manfaat)

        # Menampilkan hasil matriks normalisasi R
        print("Matriks Normalisasi (R):", R)

        # Menghitung preferensi P berdasarkan matriks normalisasi R dan bobot w
        for i, r_i in R.items():
            P[i] = sum(w[j] * r_ij for j, r_ij in r_i.items())

        # Menampilkan hasil preferensi P
        print("Preferensi (P):", P)

       # Mengurutkan preferensi P dari yang tertinggi ke terendah
        sorted_P = dict(sorted(P.items(), key=lambda item: item[1], reverse=True))

        # Menampilkan semua alternatif dengan preferensi mereka
        print("Ranking Alternatif berdasarkan Preferensi:")
        for rank, (alternative_id, preference_value) in enumerate(sorted_P.items(), start=1):
            print(f"{rank}. Alternatif ID: {alternative_id} - Nama: {alternatif[alternative_id]} - Preferensi: {preference_value:.4f}")


except Error as e:
    print("Error saat menghubungkan ke database:", e)

finally:
    connection.close()