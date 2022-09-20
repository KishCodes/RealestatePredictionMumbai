import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(Location,sqft,bhk,gym,lift,parking,clubhouse):
    try:
        loc_index = __data_columns.index(Location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bhk
    x[2] = gym
    x[3] = lift
    x[4] = parking
    x[5] = clubhouse
    if loc_index>=0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __locations

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[6:]  # first 6 columns are sqft, bhk, gym, lift, parking, clubhouse

    global __model
    if __model is None:
        with open('./artifacts/RealestatePredictionMumbai.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())