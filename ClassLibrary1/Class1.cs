using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ClassLibrary1
{
    public class class2 : IHttpHandler {

        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.Write("ok dan!");
            context.Response.End();
        }
    }


    public class Class1 : IHttpModule
    {
        private HttpApplication ctx;

        public void Dispose()
        {
            
        }

        public void Init(HttpApplication context)
        {
            ctx = context;
            context.BeginRequest += context_BeginRequest;
            context.EndRequest += context_EndRequest;
        }

        void context_EndRequest(object sender, EventArgs e)
        {
            Debug.WriteLine("Heeeeey een request vertrekt.." + ctx.Request.Url);
            
            
        }

        void context_BeginRequest(object sender, EventArgs e)
        {
            Debug.WriteLine("Heeeeey een request komt er binnen..");
        }
    }
}
