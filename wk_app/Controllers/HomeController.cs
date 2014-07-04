using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace wk_app.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult GetManifest() {
            return File(Server.MapPath("~/cachemanifest.txt"),
                "text/cache-manifest");
        }

        public ActionResult About() {
            return View();
        }

        public ActionResult Fallback()
        {
            return View();
        }
	
    }
}