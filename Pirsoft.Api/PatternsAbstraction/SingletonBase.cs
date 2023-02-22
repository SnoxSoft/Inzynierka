namespace Pirsoft.Api.PatternsAbstraction
{
    public abstract class SingletonBase<T> : ISingleton<T>
        where T : SingletonBase<T>, new()
    {
        private static T _instance = null!;

        protected SingletonBase() { }

        private static bool _initialised => _instance != null;

        public static T Instance => _initialised
            ? (_instance = InstanceCache.cachedInstance)
            : _instance = new T();

        class InstanceCache
        {
            internal static readonly T cachedInstance = _instance;
            static InstanceCache() { }
        }
    }

    public interface ISingleton<T>
    {
        static T Instance { get; } = default!;
    }
}
