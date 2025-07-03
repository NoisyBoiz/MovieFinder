import moviesService from "../Services/movies.js";
import usersService from "../Services/users.js";
import upcomingsService from "../Services/upcomings.js"
import trendingDaysService from "../Services/trendingDays.js"
import trendingWeeksService from "../Services/trendingWeeks.js"
import popularsService from "../Services/populars.js"
import theatresService from "../Services/theatres.js"
import ResponseObj from "../ResponseObj/index.js";
import { Types } from "mongoose";

const moviesController = {
    getAllMovies: async (language) => {
        let result = await moviesService.getAllMovies(language);
        return ResponseObj(200,"success", result);
    },
    
    getMovieById: async (language,id) => {
        let result = await moviesService.getMovieById(id,language);
        return ResponseObj(200,"success", result);
    },
    
    getMoviesByTitle: async (language,title) => {
        let result = await moviesService.getMovieByTitle(title,language);
        return ResponseObj(200,"success",result);
    },

    getMoviesByGenres: async (language,genres) => {
        let listGenres = genres.split(',').map(genre => parseInt(genre));
        let result = await moviesService.getMovieByGenre(listGenres,language);
        return ResponseObj(200,"success", result);
    },

    filterMovies: async (language,genres,sort_by) => {  
        let listGenres = [];
        if(genres !== undefined && genres !== "") listGenres = genres.split(',').map(genre => parseInt(genre));
        let result = await moviesService.filterMovies(language,listGenres,sort_by);
        return ResponseObj(200,"success", result);
    },

    getMovieByType: async (language, type) => {
        let ls = [];
        if(type === "trendingDays") ls = await trendingDaysService.getAllTrendingDay();
        else if(type === "trendingWeeks") ls = await trendingWeeksService.getAllTrendingWeek();
        else if(type === "populars") ls = await popularsService.getAllPopular();
        else if(type === "theatres") ls = await theatresService.getAllTheatres();
        else if(type === "upcomings") ls = await upcomingsService.getAllUpcoming();
        let listId = [];
        ls.forEach(element => {
            listId.push(element.id_movie);
        });
        try{
            let result = await moviesService.getMovieByListId(listId,language);
            return ResponseObj(200,"success", result);
        }
        catch(e){
            console.log(e);
            return ResponseObj(500,"Internal Server Error",null);
        }
    },

    getMovieByUser: async (language, userId) => {
        let user = await usersService.getUserById(userId);
        if(user === null) return ResponseObj(404,"User not found",null);
        let result = await moviesService.getMovieByListId(user.favorite,language);
        return ResponseObj(200,"success", result);
    }
}

export default moviesController;