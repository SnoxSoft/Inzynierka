using Pirsoft.Api.PatternsAbstraction;

namespace Pirsoft.Api.Configurators
{
    public class AppRunner : SingletonBase<AppRunner>
    {
        private WebApplication _app = null!;

        public bool CanRun { get; private set; } = false;

        public void Init(WebApplicationBuilder builder)
        {
            _app = builder.Build();

            configureAppBuild();
        }

        public void Run()
        {
            if (CanRun == false)
            {
                throw new InvalidOperationException("App build failed or was not configured properly.");
            }

            _app.Run();
        }

        private void configureAppBuild()
        {
            // Configure the HTTP request pipeline.
            if (_app.Environment.IsDevelopment())
            {
                _app.UseSwagger();
                _app.UseSwaggerUI();
            }
            _app.UseCors();
            _app.UseHttpsRedirection();
            _app.UseAuthentication();
            _app.UseAuthorization();
            _app.MapControllers();

            CanRun = true;
        }
    }
}
