using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using wk_app.Models;


namespace wk_app.Controllers
{
    public class GameController : Controller
    {
        //
        // GET: /Game/
        public ActionResult Index()
        {
            return View(Database.GetAll());
        }

        public ActionResult Create() {
            return View(); 
        }

        [HttpPost]
        public ActionResult Create(Game newGame)
        {
            Database.AddGame(newGame);
            return RedirectToAction("Index");
        }

        public ActionResult GetGamesJSON() {
            return Json(Database.GetAll(), JsonRequestBehavior.AllowGet);
        }


        public ActionResult AddGamesJSON(Game g)
        {
            Database.AddGame(g);
            return Json(Database.GetAll(), JsonRequestBehavior.AllowGet);
        }
	}
}