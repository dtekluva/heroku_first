import os, librosa
from pydub import AudioSegment
import tensorflow as tf
import librosa.display
import numpy as np
import joblib


class File_Manager():

    def delete_all_files(self,path):
        files = os.listdir(path)
        for f in files:
            os.remove(f'{path}/{f}')

    def get_avalable_track(self,path):
        files = os.listdir(path)
        
        return files[1] if files[1] != "genre" else files[0]

    def get_track_details(self, track_file_name):

        track_data = track_file_name.replace("_", " ").split("-")
        artist = track_data[0]
        track = track_data[-1]
        track_name = track.split(".")[0] # remove extensions

        with open(os.path.join("uploads/genre"), 'r') as genre_file:
            genre = genre_file.read()

        return dict(
            track = track_name,
            artist = artist,
            raw_name = track_file_name,
            genre = genre
        )

class Predictor():

    def __init__(self, model_path, label_encoder, track_path) -> None:
        
        self.model = tf.keras.models.load_model(model_path)
        self.labelencoder = joblib.load(label_encoder)
        self.track = track_path

    def cut_song(self, filepath):
        
        sound = AudioSegment.from_file(filepath)

        halfway_point = len(sound) // 2
        first_half = sound[halfway_point:halfway_point+30000]

        # create a new file "first_half.mp3":
        destination = r"temp.wav"
        first_half.export(destination, format="wav")
        
        return destination

    def predict_genre(self):

        file_name = self.cut_song(self.track)
        audio, sample_rate = librosa.load(file_name, res_type='kaiser_fast') 
        mfccs_features = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
        mfccs_scaled_features = np.mean(mfccs_features.T,axis=0)
        mfccs_scaled_features=mfccs_scaled_features.reshape(1,-1)
        predicted_label=self.model.predict_classes(mfccs_scaled_features)
        prediction_class = self.labelencoder.inverse_transform(predicted_label) 
        
        return prediction_class