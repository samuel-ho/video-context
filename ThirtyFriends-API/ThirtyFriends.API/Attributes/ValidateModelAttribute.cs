using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ThirtyFriends.API.Models;

namespace ThirtyFriends.API.Attributes
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(new EmptyModel(string.Join(",",context.ModelState.Values.SelectMany(e => e.Errors).Select(e => e.ErrorMessage))));
            }
        }
    }
}
