using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace wk_app.Models
{
    public static class Database
    {
        private static List<Game> _games = new List<Game>() {
            new Game { title="NED-FRA", description="blabla", date="1-1-2014"},
            new Game { title="BEL-FRA", description="blabla", date="1-1-2014"},
            new Game { title="BRA-FRA", description="blabla", date="1-1-2014"},
            new Game { title="NED-BRA", description="blabla", date="1-1-2014"}
        };


        public static IEnumerable<Game> GetAll() {
            return _games;
        }

        public static void AddGame(Game g) {
            _games.Add(g);
        }

        public static Game GetGame(string title) {
            return _games.FirstOrDefault(g => g.title == title);
        }

        public static void DeleteGame(string title) {
            Game g = GetGame(title);
            _games.Remove(g);
        }
    }

    public class Game {
        public string title { get; set; }
        public string description { get; set; }
        public string date { get; set; }
    }

}