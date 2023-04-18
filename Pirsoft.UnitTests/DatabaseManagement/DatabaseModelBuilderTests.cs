using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Pirsoft.Api.Models;
using System.Collections.Generic;
using System;
using System.Linq;
using FluentAssertions;
using Pirsoft.Api.DatabaseManagement;

namespace Pirsoft.UnitTests.DatabaseManagement
{
    public class DatabaseModelBuilderTests
    {
        private readonly string _modelsNamespace = $"{typeof(IApiModel).Namespace}.";

        private DatabaseModelBuilder _sut = null!;

        [SetUp]
        public void SetUp() => _sut = new();

        [Test]
        public void BuildModel_ShouldBuildModelFromEntityBuilders()
        {
            //Arrange
            IEnumerable<string> expectedNames = prepareExpectedModelNames();
            ModelBuilder fakeModelBuilder = new();

            //Act
            ModelBuilder result = _sut.BuildModel(fakeModelBuilder);

            //Assert
            result.Model.GetEntityTypes()
                .Where(t => t.Name.Contains(_modelsNamespace))
                .Select(t => t.Name).Should().BeEquivalentTo(expectedNames);
        }

        private IEnumerable<string> prepareExpectedModelNames()
        {
            Type[] expectedModels = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(assembly => assembly.GetTypes())
                .Where(type => typeof(IApiModel).IsAssignableFrom(type) && type.IsClass)
                .ToArray();

            foreach (Type modelType in expectedModels)
            {
                yield return $"{_modelsNamespace}{modelType.Name}";
            }
        }
    }
}
