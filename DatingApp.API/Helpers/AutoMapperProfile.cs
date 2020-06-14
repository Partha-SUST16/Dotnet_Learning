using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserForListDto>()
                   .ForMember(dest => dest.PhotoUrl, opt =>
                       opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                   .ForMember(dest => dest.Age, opt =>
                         opt.MapFrom(src => src.DateOfBrith.CalculateAge()));
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                            opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt =>
                                opt.MapFrom(src => src.DateOfBrith.CalculateAge())); ;
            CreateMap<Photo, PhotosForDetailedDto>();
        }
    }
}
