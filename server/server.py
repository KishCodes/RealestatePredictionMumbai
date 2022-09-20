from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'Locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    sqft_area = int(request.form['sqft_area'])
    Location = request.form['Location']
    bhk = int(request.form['bhk'])
    gym = int(request.form['gym'])
    lift = int(request.form['lift'])
    parking = int(request.form['parking'])
    clubhouse = int(request.form['clubhouse'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(Location,sqft_area,bhk,gym,lift,parking,clubhouse)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()