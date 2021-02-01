using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Utf8Json;
using Utf8Json.Resolvers;

namespace MP2021_LKLB.Helpers
{
    public static class SessionHelper
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            JsonSerializer.SetDefaultResolver(StandardResolver.AllowPrivateCamelCase);
            session.SetString(key, JsonSerializer.ToJsonString(value));
        }

        public static T Get<T>(this ISession session, string key)
        {
            string value = session.GetString(key);
            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }
    }
}
