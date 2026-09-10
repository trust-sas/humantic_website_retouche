# app.py
from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

# Connexion MySQL
db = pymysql.connect(
    host="localhost",
    user="root",
    password="disraeli190",
    database="humantic_db"
)

@app.route("/login_admin", methods=["POST"])
def login_admin():
    data = request.get_json()
    password = data.get("password")

    cursor = db.cursor()
    cursor.execute("SELECT * FROM admins WHERE password=%s", (password,))
    admin = cursor.fetchone()

    if admin:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

if __name__ == "__main__":
    app.run(debug=True)


