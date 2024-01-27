// Define a Movie class with a constructor to initialize movie properties and rent/return methods
class Movie {
    constructor(title, genre, category, availableCopies) {
      this.title = title;
      this.genre = genre;
      this.category = category;
      this.availableCopies = availableCopies;
    }
  
    // Method to rent the movie
    rentMovie() {
      if (this.availableCopies > 0) {
        this.availableCopies--;
        console.log(`"${this.title}" has been rented. Enjoy your movie!`);
      } else {
        console.log(`Sorry, "${this.title}" is currently out of stock.`);
      }
    }
  
    
    // Method to return the movie 
    sendBackMovie() {
      this.availableCopies++;// Increment the available copies
      console.log(`"${this.title}" has been returned. Thank you for returning the movie.`);
    }
  }
  
  
  // Define a Customer class with a constructor to initialize customer properties and rent/return methods
  class Customer {
    constructor(name) {
      this.name = name;
      this.rentedMovies = [];
    }
  
    // Method to rent a movie for the customer
    rentMovie(movie) {
      if (movie instanceof Movie) { // Check if the movie is an instance of the Movie class
        movie.rentMovie();//then call the rentMovie method of the movie
        this.rentedMovies.push(movie);
        console.log(`${this.name} has rented "${movie.title}".`);
      } else {
        console.log("Invalid movie selection.");
      }
    }
  
    // Method to return a movie for the customer
    sendBackMovie(movie) {
      if (this.rentedMovies.includes(movie)) {// To check if the customer has rented the movie
        movie.sendBackMovie();//then call the sendBackMovie method of the movie
        this.rentedMovies = this.rentedMovies.filter((m) => m !== movie); // Remove the rented movie from the customer's rented movies
        
        console.log(`${this.name} has returned "${movie.title}".`);
      } else {
        console.log(`${this.name}, you haven't rented "${movie.title}".`);
      }
    }
  }
  
  // Define a MovieStore class with a constructor to initialize a colle//ction of movies
  class MovieStore {
    constructor() {
      this.movies = [];
    }
  
    // Method to add a movie to the movie store
    addMovie(movie) {
      if (movie instanceof Movie) {
        this.movies.push(movie);
        console.log(`"${movie.title}" has been added to the movie store.`);
      } else {
        console.log("Invalid movie.");
      }
    }
  
    // Method to list available movies in the movie store
   
  
    listAvailableMovies() {
      console.log("Here are the movies we have Available Now:");
      this.movies.forEach((movie) => {
        console.log(`- ${movie.title} (${movie.genre}, ${movie.category}) - Available Copies: ${movie.availableCopies}`);
      });
    }
  }
  
  // Example usage:
  
  // Create a MovieStore instance
  const movieStore = new MovieStore();
  
  // Create Movie instances with category
  const movie1 = new Movie("Inception", "Sci-Fi", "Action", 5);
  const movie2 = new Movie("The Shawshank Redemption", "Drama", "Adventure", 4);
  const movie3 = new Movie("Seduction", "Rommance", "Adventure", 3);
  const movie4 = new Movie("The Walking dead", "Horror", "Adventure", 6);
  const movie5 = new Movie("The High School Musical", "High School", "Adventure", 2);
  const movie6 = new Movie("Things fall apart", "Drama", "Adventure", 4);
  
  
  
  
  // Add movies to the movie store
  movieStore.addMovie(movie1);
  movieStore.addMovie(movie2);
  movieStore.addMovie(movie3);
  movieStore.addMovie(movie4);
  movieStore.addMovie(movie5);
  movieStore.addMovie(movie6);
  
  
  // Function to prompt user input using readline
  function promptUser(promptText) {
    return new Promise((resolve) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
  
      readline.question(promptText, (input) => {
        resolve(input);
        readline.close();
      });
    });
  }
  
  // Async function to run the main movie renting application
  async function main() {
    while (true) {
      console.log("\n1. List available movies");
      console.log("2. Rent a movie");
      console.log("3. Return a movie");
      console.log("4. Exit");
  
      // Prompt user for choice
      const choice = await promptUser("Enter your choice (1-4): ");
  
      switch (choice) { //switch statement to handle user choices
        case "1":
          // List available movies in the movie store
          movieStore.listAvailableMovies();
          break;
  
        case "2":
          // Prompt user for the title of the movie to rent
          const movieToRent = await promptUser("Enter the title of the movie you want to rent: ");
            const movieRenting= movieToRent.charAt(0).toUpperCase() + movieToRent.slice(1);
          // Find the selected movie in the movie store
          const selectedMovie = movieStore.movies.find((movie) => movie.title === movieRenting);
  
          if (selectedMovie) {
            // Prompt user for their name and create a Customer instance
            const customerName = await 
              promptUser("Enter your name please: ");
            const customerUpperCaseName = customerName.charAt(0).toUpperCase() + customerName.slice(1);
            const customer = new Customer(customerUpperCaseName);
            // Rent the selected movie for the customer
            customer.rentMovie(selectedMovie);
          } else {
            console.log("Movie not found.");
          }
          break;
  
        case "3":
          // Prompt user for the title of the movie to return
          const movieToReturn = await promptUser("Enter the title of the movie you want to return: ");
          // Find the selected movie in the movie store
          const selectedMovieToReturn = movieStore.movies.find((movie) => movie.title === movieToReturn); 
  
          if (selectedMovieToReturn) {
            // Prompt user for their name and create a Customer instance
            const customerName = await promptUser("Enter your name: ");
            const customers = customerName.charAt(0).toUpperCase() + customerName.slice(1);
            const customer = new Customer(customers);
            
            // Return the selected movie for the customer
            customer.sendBackMovie(selectedMovieToReturn); 
          } else {
            console.log("Movie not found.");
          }
          
          break;
  
        case "4":
          // Exit the movie renting application
          console.log("Exiting the Movie Renting App. Goodbye!");
          process.exit();
  
  
        default:
          console.log("Invalid choice. Please enter a number between 1 and 4.");
          break;
      }
    }
  }
  
  // Run the main movie renting application
  main();
  