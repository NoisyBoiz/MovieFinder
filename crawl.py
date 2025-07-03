import requests
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
myDB = myclient["Movies"]

moviesDetailEnTB = myDB["movies_detail_ens"]
moviesDetailViTB = myDB["movies_detail_vis"]
moviesDetailJaTB = myDB["movies_detail_jas"]
moviesDetailRuTB = myDB["movies_detail_rus"]
movieTB = myDB["movies"]
castTB = myDB["casts"]
genresTB = myDB["genres"]

upcomingTB = myDB["upcomings"]
popularTB = myDB["populars"]
trendingDayTB = myDB["trending_days"]
trendingWeekTB = myDB["trending_weeks"]
theatresTB = myDB["theatres"]

key = "dee9abb4ea6e2eed872d9951aa2a0cc3"

listGenres = [
    {"_id": 1, "name": "Action", "preId": 28},
    {"_id": 2, "name": "Adventure", "preId": 12},
    {"_id": 3, "name": "Animation", "preId": 16},
    {"_id": 4, "name": "Comedy", "preId": 35},
    {"_id": 5, "name": "Crime", "preId": 80},
    {"_id": 6, "name": "Documentary", "preId": 99},
    {"_id": 7, "name": "Drama", "preId": 18},
    {"_id": 8, "name": "Family", "preId": 10751},
    {"_id": 9, "name": "Fantasy", "preId": 14},
    {"_id": 10, "name": "History", "preId": 36},
    {"_id": 11, "name": "Horror", "preId": 27},
    {"_id": 12, "name": "Music", "preId": 10402},
    {"_id": 13, "name": "Mystery", "preId": 9648},
    {"_id": 14, "name": "Romance", "preId": 10749},
    {"_id": 15, "name": "Thriller", "preId": 53},
    {"_id": 16, "name": "War", "preId": 10752},
    {"_id": 17, "name": "Western", "preId": 37},
    {"_id": 18, "name": "Science Fiction", "preId": 878}
]

def insertGenres():
    for genre in listGenres:
        if genresTB.find_one({"_id": genre["_id"]}) is None:
            genresTB.insert_one({"_id": genre["_id"], "name": genre["name"]})

def formatGenres(genres):
    listId = []
    for preGen in genres:
        for newGen in listGenres:
            if preGen["id"] == newGen["preId"]:
                listId.append(newGen["_id"])
                break
    return listId

def formatVideo(videos):
    listVideo = []
    listType = ["featurette", "Trailer", "Teaser"]
    for video in videos:
        if video["type"] in listType:
            listVideo.append(video["key"])
    return listVideo

def formatCast(cast):
    return {
        "_id": cast["id"],
        "name": cast["name"],
        "avatar": cast["profile_path"]
    }

def getCast(movie):
    listCast = []
    for cast in movie["credits"]["cast"]:
        if castTB.find_one({"_id": cast["id"]}) is None:
            castTB.insert_one(formatCast(cast))
        listCast.append({
            "id": cast["id"],
            "character": cast["character"]
        })
    return listCast

def formatMovie(movie):
    return {
        "_id": movie["id"],
        "release_date": movie.get("release_date"),
        "poster_path": movie.get("poster_path"),
        "backdrop_path": movie.get("backdrop_path"),
        "vote_average": movie.get("vote_average"),
        "vote_count": movie.get("vote_count"),
        "genre_ids": formatGenres(movie.get("genres", [])),
        "runtime": movie.get("runtime"),
        "listCast": getCast(movie),
        "original_title": movie.get("original_title") or movie.get("original_name"),
    }

def formatMovieDetail(movie):
    return {
        "_id": movie["id"],
        "title": movie.get("title") or movie.get("name"),
        "overview": movie.get("overview"),
        "video": formatVideo(movie.get("videos", {}).get("results", []))
    }

def fetch_json(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

def get_movie_details(movie_id):
    for lang, col in {
        "en": moviesDetailEnTB,
        "vi": moviesDetailViTB,
        "ja": moviesDetailJaTB,
        "ru": moviesDetailRuTB,
    }.items():
        detail_url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={key}&language={lang}&append_to_response=videos,credits"
        movieDetail = fetch_json(detail_url)
        if movieDetail and "status_code" not in movieDetail:
            col.insert_one(formatMovieDetail(movieDetail))
            if lang == "en":
                movieTB.insert_one(formatMovie(movieDetail))

def crawl_movies():
    listUrls = [
        {"url": f"https://api.themoviedb.org/3/movie/upcoming?api_key={key}&language=en&page=1", "collection": upcomingTB},
        {"url": f"https://api.themoviedb.org/3/movie/popular?api_key={key}&language=en&page=1", "collection": popularTB},
        {"url": f"https://api.themoviedb.org/3/movie/popular?api_key={key}&language=en&page=2", "collection": popularTB},
        {"url": f"https://api.themoviedb.org/3/trending/movie/day?api_key={key}", "collection": trendingDayTB},
        {"url": f"https://api.themoviedb.org/3/trending/movie/week?api_key={key}", "collection": trendingWeekTB},
        {"url": f"https://api.themoviedb.org/3/movie/now_playing?api_key={key}&language=en&page=1", "collection": theatresTB},
        {"url": f"https://api.themoviedb.org/3/movie/now_playing?api_key={key}&language=en&page=2", "collection": theatresTB}
    ]

    for item in listUrls:
        result = fetch_json(item["url"])
        if result and "results" in result:
            for movie in result["results"]:
                movie_id = movie["id"]
                if movieTB.find_one({"_id": movie_id}) is None:
                    get_movie_details(movie_id)
                if item["collection"].find_one({"id_movie": movie_id}) is None:
                    item["collection"].insert_one({"id_movie": movie_id})

if __name__ == "__main__":
    insertGenres()
    crawl_movies()
