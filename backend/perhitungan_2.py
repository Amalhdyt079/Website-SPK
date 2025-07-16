import pymysql

# Inisialisasi variabel dictionary kriteria dan bobot (W)
kriteria = {}
w = {}

# Inisialisasi variabel dictionary alternatif
alternativ = {}

# Inisialisasi variabel matriks keputusan X, nilai minimum, dan maksimum per kriteria
X = {}
min_j = {}
max_j = {}

# Inisialisasi variabel preferensi P
P = {}

# Koneksi ke database
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='db_pjbl_1'
)

try:
    with connection.cursor() as cursor:
        # Menjalankan query SQL untuk kriteria
        sql_kriteria = 'SELECT * FROM criterias'
        cursor.execute(sql_kriteria)

        # Mengambil hasil query untuk kriteria
        for row in cursor.fetchall():
            id_kriteria = row[0]  # Indeks 0 untuk kolom pertama (id_criteria)
            name = row[1]         # Indeks 1 untuk kolom kedua (name)
            weight = row[2]       # Indeks 3 untuk kolom keempat (weight)
            attribute = row[3]    # Indeks 2 untuk kolom ketiga (attribute)

            # Cek apakah weight adalah numerik
            try:
                weight = float(weight)  # Pastikan bobot adalah float
            except ValueError:
                print(f"Warning: Bobot '{weight}' untuk kriteria '{name}' tidak dapat dikonversi ke float. Menggunakan bobot default 0.")
                weight = 0.0  # Atau Anda bisa mengatur nilai default lain sesuai kebutuhan

            kriteria[id_kriteria] = [name, attribute]
            w[id_kriteria] = weight

        # Menjalankan query SQL untuk alternatif
        sql_alternatives = 'SELECT * FROM alternatives'
        cursor.execute(sql_alternatives)

        # Mengambil hasil query untuk alternatif
        for row in cursor.fetchall():
            id_alternatif = row[0]  # Indeks 0 untuk kolom pertama (id_alternatif)
            name = row[1]           # Indeks 1 untuk kolom kedua (name)
            alternativ[id_alternatif] = name

        # Menjalankan query SQL untuk matriks keputusan
        sql_evaluations = 'SELECT * FROM evalutions'
        cursor.execute(sql_evaluations)

        # Mengambil hasil query untuk matriks keputusan
        for row in cursor.fetchall():
            id_alternative = row[0]  # Indeks 0 untuk kolom pertama (id_alternatif)
            id_criteria = row[1]     # Indeks 1 untuk kolom kedua (id_kriteria)
            value = row[2]           # Indeks 2 untuk kolom ketiga (value)

            if id_alternative not in X:
                X[id_alternative] = {}

            # Konversi nilai ke float
            try:
                value = float(value)  # Pastikan value adalah float
                X[id_alternative][id_criteria] = value

                # Menghitung nilai minimum per kriteria
                if id_criteria not in min_j or min_j[id_criteria] > value:
                    min_j[id_criteria] = value

                # Menghitung nilai maksimum per kriteria
                if id_criteria not in max_j or max_j[id_criteria] < value:
                    max_j[id_criteria] = value

            except ValueError:
                print(f"Warning: Nilai '{value}' tidak dapat dikonversi ke float untuk alternatif {id_alternative} dan kriteria {id_criteria}.")
                continue

    # Menghitung nilai preferensi P setelah semua data dimasukkan ke dalam X
    for i, r_i in X.items():
        P[i] = 0
        for j, r_ij in r_i.items():
            if j in w:  # Periksa apakah kriteria memiliki bobot
                try:
                    r_ij = float(r_ij)  # Konversi r_ij ke float jika belum
                    P[i] += w[j] * r_ij
                except ValueError:
                    print(f"Warning: Nilai '{r_ij}' untuk alternatif {i} dan kriteria {j} tidak dapat dikonversi ke float.")
            else:
                print(f"Warning: Kriteria dengan ID {j} tidak ditemukan dalam bobot (w).")

finally:
    connection.close()

# Print hasil untuk memverifikasi
print("Kriteria:", kriteria)
print("Bobot (w):", w)
print("Matriks Keputusan (X):", X)
print("Alternatif:", alternativ)
print("Nilai Minimum per Kriteria (min_j):", min_j)
print("Nilai Maksimum per Kriteria (max_j):", max_j)
print("Preferensi (P):", P)
