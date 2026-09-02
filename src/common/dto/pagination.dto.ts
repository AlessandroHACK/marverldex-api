import { IsInt, IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {
    @IsOptional()
    @IsNumber({}, { message: 'Limit number' })
    @IsInt()
    @IsPositive({ message: 'Limit must be positive' })
    @Min(1, { message: 'Limit must be greater than 1' })
    limit?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Offset number' })
    @IsPositive({ message: 'Offset must be positive' })
    offset?: number;
}