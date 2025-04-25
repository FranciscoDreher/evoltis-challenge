using AutoMapper;
using Dto;
using Persistence.Entities;

namespace Mapper
{
    public class DtoMapper : Profile
    {
        public DtoMapper()
        {
            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}
