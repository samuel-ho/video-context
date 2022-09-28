using System.Text;
using Newtonsoft.Json.Linq;

namespace ThirtyFriends.API.Utilities
{
    public static class StringExtension
    {
        public static bool ValidateJSON(this string s)
        {
            try
            {
                JToken.Parse(s);
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static string ToLowerAndTrim(this string s) => s.ToLower().Trim();
         
        public static byte[] StringToBytes(string data) => Encoding.ASCII.GetBytes(data);
    } 
}
