using Pirsoft.Api.Interfaces;

namespace Pirsoft.Api.Factory;

public abstract class Creator
{
    public abstract IModel GetModel();
}