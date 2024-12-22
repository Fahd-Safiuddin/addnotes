from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# In-memory storage for simplicity
notes = {}

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "API is running!"}), 200

# Add a note for a transaction
@app.route('/add-note', methods=['POST'])
def add_note():
    data = request.get_json()
    tx_hash = data.get('txHash')
    note = data.get('note')

    if not tx_hash or not note:
        return jsonify({"error": "Both txHash and note are required"}), 400

    # Save the note
    notes[tx_hash] = note
    return jsonify({"message": "Note added successfully"}), 201

# Get a note for a transaction
@app.route('/get-note', methods=['GET'])
def get_note():
    tx_hash = request.args.get('txHash')

    if not tx_hash:
        return jsonify({"error": "txHash is required"}), 400

    note = notes.get(tx_hash)
    if not note:
        return jsonify({"error": "No note found for this transaction"}), 404

    return jsonify({"txHash": tx_hash, "note": note}), 200


@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Transaction Notes API!"})


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=8081)
