namespace WebAPI.Extensions
{
    public static class StringExtensions
    {
        public static bool IsEmpty(this string s) {
            return string.IsNullOrEmpty(s.Trim());
        }
        
    }
}