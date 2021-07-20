import os

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

