
import React, { useState } from 'react';
import { Film, Star } from 'lucide-react';

// Local movie dataset
const moviesData = [
  {
    id: 1,
    title: "The Dark Knight",
    genres: ["Action", "Thriller", "Crime"],
    description: "Batman faces the Joker in a battle for Gotham's soul.",
    rating: 9.0
  },
  {
    id: 2,
    title: "Inception",
    genres: ["Action", "Sci-Fi", "Thriller"],
    description: "A thief enters dreams to plant ideas in people's minds.",
    rating: 8.8
  },
  {
    id: 3,
    title: "The Grand Budapest Hotel",
    genres: ["Comedy", "Drama"],
    description: "A concierge and lobby boy become friends amid war.",
    rating: 8.1
  },
  {
    id: 4,
    title: "Superbad",
    genres: ["Comedy"],
    description: "Two friends try to make the most of their last days before college.",
    rating: 7.6
  },
  {
    id: 5,
    title: "The Notebook",
    genres: ["Romance", "Drama"],
    description: "A poor yet passionate young man falls in love with a rich young woman.",
    rating: 7.8
  },
  {
    id: 6,
    title: "La La Land",
    genres: ["Romance", "Musical", "Drama"],
    description: "A jazz musician and an aspiring actress fall in love in LA.",
    rating: 8.0
  },
  {
    id: 7,
    title: "Interstellar",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    description: "Astronauts travel through a wormhole to save humanity.",
    rating: 8.6
  },
  {
    id: 8,
    title: "The Matrix",
    genres: ["Action", "Sci-Fi"],
    description: "A hacker discovers reality is a computer simulation.",
    rating: 8.7
  },
  {
    id: 9,
    title: "Crazy Rich Asians",
    genres: ["Romance", "Comedy"],
    description: "A woman discovers her boyfriend is from an extremely wealthy family.",
    rating: 6.9
  },
  {
    id: 10,
    title: "Mad Max: Fury Road",
    genres: ["Action", "Adventure"],
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrant.",
    rating: 8.1
  },
  {
    id: 11,
    title: "The Shawshank Redemption",
    genres: ["Drama", "Crime"],
    description: "Two imprisoned men bond over years and find redemption.",
    rating: 9.3
  },
  {
    id: 12,
    title: "Blade Runner 2049",
    genres: ["Sci-Fi", "Thriller"],
    description: "A blade runner discovers a secret that could plunge society into chaos.",
    rating: 8.0
  },
  {
    id: 13,
    title: "Bridesmaids",
    genres: ["Comedy", "Romance"],
    description: "Competition between bridesmaids leads to hilarious mishaps.",
    rating: 6.8
  },
  {
    id: 14,
    title: "John Wick",
    genres: ["Action", "Thriller"],
    description: "An ex-hitman comes out of retirement to track down the gangsters.",
    rating: 7.4
  },
  {
    id: 15,
    title: "Pride and Prejudice",
    genres: ["Romance", "Drama"],
    description: "Sparks fly when spirited Elizabeth Bennet meets Mr. Darcy.",
    rating: 7.8
  }
];

// Extract unique genres
const allGenres = [...new Set(moviesData.flatMap(movie => movie.genres))].sort();

// PreferenceSelector Component
const PreferenceSelector = ({ selectedGenres, onGenreToggle }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Your Preferred Genres</h2>
      <div className="flex flex-wrap gap-3">
        {allGenres.map(genre => (
          <button
            key={genre}
            onClick={() => onGenreToggle(genre)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedGenres.includes(genre)
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

// MovieCard Component
const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Film className="text-blue-600" size={24} />
          <h3 className="font-bold text-lg text-gray-800">{movie.title}</h3>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="font-semibold text-gray-800">{movie.rating}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3">{movie.description}</p>
      <div className="flex flex-wrap gap-2">
        {movie.genres.map(genre => (
          <span
            key={genre}
            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

// RecommendationList Component
const RecommendationList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <Film className="mx-auto text-gray-400 mb-4" size={64} />
        <p className="text-gray-500 text-lg">
          No recommendations yet. Select your preferred genres above!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Recommended for You ({movies.length} movies)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // Content-based filtering: find movies that match selected genres
  const getRecommendations = () => {
    if (selectedGenres.length === 0) {
      return [];
    }

    return moviesData
      .filter(movie => 
        movie.genres.some(genre => selectedGenres.includes(genre))
      )
      .sort((a, b) => {
        // Sort by number of matching genres (descending), then by rating
        const aMatches = a.genres.filter(g => selectedGenres.includes(g)).length;
        const bMatches = b.genres.filter(g => selectedGenres.includes(g)).length;
        if (aMatches !== bMatches) return bMatches - aMatches;
        return b.rating - a.rating;
      });
  };

  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Film className="text-blue-600" size={40} />
            <h1 className="text-4xl font-bold text-gray-900">MovieMatch</h1>
          </div>
          <p className="text-gray-600">Discover your next favorite movie</p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <PreferenceSelector
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <RecommendationList movies={recommendations} />
        </div>
      </div>
    </div>
  );
};

export default App;