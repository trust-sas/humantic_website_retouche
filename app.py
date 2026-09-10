from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

# Configuration base de données
DB_CONFIG = {
    "host": "localhost",
    "user": "humantic",          # utilisateur MySQL dédié
    "password": "humantic2026",  # mot de passe MySQL
    "database": "humantic",
    "cursorclass": pymysql.cursors.DictCursor
}

def get_db_connection():
    return pymysql.connect(**DB_CONFIG)

# ============================
# ROUTES SITE GLOBAL
# ============================

@app.route("/api/content/<section>", methods=["GET"])
def get_content(section):
    """Lire une section du site"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT texte FROM contenu WHERE section=%s", (section,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    if result:
        return jsonify({section: result["texte"]})
    return jsonify({"error": "Section introuvable"}), 404

@app.route("/api/content", methods=["GET"])
def get_all_content():
    """Lire toutes les sections du site"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT section, texte FROM contenu")
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(results)

@app.route("/api/content", methods=["POST"])
def add_content():
    """Ajouter une nouvelle section"""
    data = request.get_json()
    section, texte = data.get("section"), data.get("texte")
    if not section or not texte:
        return jsonify({"error": "Section et texte requis"}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO contenu (section, texte) VALUES (%s, %s)", (section, texte))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": f"✅ Section '{section}' ajoutée"})

@app.route("/api/content", methods=["PUT"])
def update_content():
    """Mettre à jour une section"""
    data = request.get_json()
    section, texte = data.get("section"), data.get("texte")
    if not section or not texte:
        return jsonify({"error": "Section et texte requis"}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE contenu SET texte=%s WHERE section=%s", (texte, section))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": f"✅ Section '{section}' mise à jour"})

@app.route("/api/content/<section>", methods=["DELETE"])
def delete_content(section):
    """Supprimer une section"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM contenu WHERE section=%s", (section,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": f"✅ Section '{section}' supprimée"})


# ============================
# ROUTES ADMINISTRATION
# ============================

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    """Connexion administrateur"""
    data = request.get_json()
    username, password = data.get("username"), data.get("password")
    if not username or not password:
        return jsonify({"error": "Identifiants requis"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admins WHERE username=%s AND password=%s", (username, password))
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if result:
        return jsonify({"success": True, "message": "Accès autorisé"})
    return jsonify({"success": False, "message": "Accès refusé"}), 401


# ============================
# LANCEMENT DE L’APPLICATION
# ============================

if __name__ == "__main__":
    app.run(debug=True)
