import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportDto{
    
    @IsString()
    make:string;

    @IsString()
    model:string;

    @Min(1930)
    @Max(2023)
    year:number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage:number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price:number;

    @IsNumber()
    @IsLatitude()
    lat:number;

    @IsNumber()
    @IsLongitude()
    lng:number;
}